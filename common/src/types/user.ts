import z from 'zod'

export const signupSchema = z.object({
    name: z.string(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, {message: "password must be 6 to 12 characters long"})
})

export const signinSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, {message: "password must be 6 to 12 characters long"})
})

//type inference
export type signupType = z.infer<typeof signupSchema>
export type signinType = z.infer<typeof signinSchema>