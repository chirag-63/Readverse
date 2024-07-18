import { Hono } from "hono"
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { verify } from 'hono/jwt'
import { createPostSchema, updatePostSchema } from '@chirag-11/types-common';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: any
    }
}>();

//middleware
blogRouter.use('/*', async (c, next) => {
    const jwt = c.req.header('Authorization') || "";
    if (!jwt) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }

    const token = jwt.split(' ')[1]
    try {
        let payload = await verify(token, c.env.JWT_SECRET);
        if (!payload) {
            c.status(401);
            return c.json({ message: "You are not logged in" });
        }
        c.set('userId', payload.id);
        await next()
    } catch(err){
        c.status(403);
        return c.json({ message: "You are not logged in" });
    }
})

//creating a blog post
blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userId = c.get('userId');
    const body = await c.req.json();
    const result = createPostSchema.safeParse(body)
    if(!result.success){
        c.status(411)
        return c.json(result.error.errors.map(err => ({ message: err.message, path: err.path })));
    }
    try {
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        })
        c.status(200)
        return c.json({
            id: post.id
        })
    } catch (err) {
        c.status(411)
        return c.json({ error: "Error while creating post" })
    } finally {
        await prisma.$disconnect();
    }
})

//editing a blog post - only by author
blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userId = c.get('userId');
    const body = await c.req.json();
    const result = updatePostSchema.safeParse(body)
    if(!result.success){
        c.status(411)
        return c.json(result.error.errors.map(err => ({ message: err.message, path: err.path })));
    }
    try {
        const post = await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        return c.json({ message: 'Post updated' })
    } catch (err) {
        c.status(411)
        return c.json({ error: "Erorr while editing post" })
    } finally {
        await prisma.$disconnect();
    }
})

//getting a blog post with particular id - by every authenticated user
blogRouter.get('/get/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = c.req.param('id')
    try {
        const post = await prisma.post.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                title: true,
                content: true,
                publishedAt: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json(post);
    } catch (err) {
        c.status(411)
        return c.json({ error: "Erorr while getting post" })
    } finally {
        await prisma.$disconnect();
    }
})

//hint - should add paggination
//getting all blog post - by every authenticated user
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userId = c.get('userId');
    try {
        const posts = await prisma.post.findMany({
            select: {
                title: true,
                content: true,
                id: true,
                publishedAt: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json(posts)

    } catch (err) {
        c.status(411)
        return c.json({ message: "Error while getting ALL posts" })
    } finally {
        await prisma.$disconnect();
    }
})

//deleting a post with particular id - only by the author
blogRouter.delete('/delete/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userId = c.get('userId');
    const id = c.req.param('id')
    try {
        //only the user who has written post can delete it
        const post = await prisma.post.delete({
            where: {
                id,
                authorId: userId
            }
        })
        return c.json({
            message: 'Post was deleted'
        })
    } catch (err) {
        c.status(403)
        return c.json({ message: "Error while deleting posts" })
    } finally {
        await prisma.$disconnect();
    }
})

//get all posts of a particular user - will be used in profile section
blogRouter.get('/myposts', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userId = c.get('userId');
    try{
        //only the user who has written post can see this list of posts
        const posts = await prisma.post.findMany({
            where: {
                authorId: userId
            },
            select: {
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json(posts)

    } catch(err){
        c.status(403)
        return c.json({ message: `Error while getting all posts of ${userId}` })
    } finally {
        await prisma.$disconnect();
    }
})