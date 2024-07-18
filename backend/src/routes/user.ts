import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt'
import { signupSchema, signinSchema } from '@chirag-11/types-common';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: any
    }
}>();

async function hashPassword(password: string) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const saltString = btoa(String.fromCharCode(...salt));

    const encoder = new TextEncoder();
    const passwordData = encoder.encode(password);
    const saltedPassword = new Uint8Array([...salt, ...passwordData]);

    const hashBuffer = await crypto.subtle.digest('SHA-256', saltedPassword);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashString = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return { salt: saltString, hash: hashString }
}

async function hashPasswordWithSalt(password: string, salt: string) {
    const encoder = new TextEncoder();
    const passwordData = encoder.encode(password);
    const saltData = atob(salt).split('').map(c => c.charCodeAt(0));
    const saltedPassword = new Uint8Array([...saltData, ...passwordData]);

    const hashBuffer = await crypto.subtle.digest('SHA-256', saltedPassword);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashString = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return { hash: hashString }
}

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const result = signupSchema.safeParse(body)
    if (!result.success) {
        c.status(411)
        return c.json(result.error.errors.map(err => ({ message: err.message, path: err.path })))
    }
    try {
        const { salt, hash } = await hashPassword(body.password);
        const user = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                password: hash,
                salt: salt
            }
        })

        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
        return c.json({ jwt })

    } catch (err) {
        c.status(403)
        return c.json({ error: "Error while signing up" })
    } finally {
        await prisma.$disconnect();
    }
})

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const result = signinSchema.safeParse(body)
    if (!result.success) {
        c.status(411)
        return c.json(result.error.errors.map(err => ({ message: err.message, path: err.path })))
    }
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })

        if (!existingUser) {
            c.status(403)
            return c.json({ error: "User not found" })
        }

        const { hash: hashedPassword } = await hashPasswordWithSalt(body.password, existingUser.salt);
        if (hashedPassword !== existingUser.password) {
            c.status(403);
            return c.json({ error: "Incorrect password" })
        }

        const jwt = await sign({ id: existingUser.id }, c.env.JWT_SECRET)
        return c.json({ jwt })

    } catch (err) {
        c.status(403)
        return c.json({ error: "Error while signing in" })
    } finally {
        await prisma.$disconnect()
    }
})


//middleware for user profile
userRouter.use('/profile', async (c, next)=> {
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

userRouter.get('/profile', async(c,)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userId = c.get('userId');
    try{
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                email: true,
                name: true,
                posts: {
                    select :{
                        id: true,
                        title: true,
                        content: true,
                        published: true,
                        publishedAt: true
                    }
                }
            }
        })
        return c.json(user);
    } catch(err) {
        c.status(411)
        return c.json({ error: "Erorr while getting your profile" })
    } finally {
        await prisma.$disconnect();
    }
})