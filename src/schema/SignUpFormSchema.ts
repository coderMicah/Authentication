import { z } from "zod"

export const SignUpFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),

  email: z.string().min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),

  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be 100 or fewer characters long" }),
})


