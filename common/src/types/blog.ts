import z from 'zod'

export const createPostSchema = z.object({
    title: z.string().trim().max(100, {message: "title must be 100 or fewer characters long"}),
    content: z.string().trim().max(5000, {message: "content must be 5000 or fewer characters long"})
})

export const updatePostSchema = z.object({
    title: z.string().trim().max(50, {message: "title must be 100 or fewer characters long"}),
    content: z.string().trim().max(200, {message: "content must be 5000 or fewer characters long"})
})

//type inference
export type createPostType = z.infer<typeof createPostSchema>
export type updatePostType = z.infer<typeof updatePostSchema>