import { z } from "zod"

export const SignInFormSchema = z.object({

  email: z.string().min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),

  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be 100 or fewer characters long" }),
})


