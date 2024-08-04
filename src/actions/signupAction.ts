"use server"

import { SignUpFormSchema } from "@/schema/SignUpFormSchema"
import { FormState } from "@/types/definitions";
import { redirect } from "next/navigation";

export const signupAction = async (action: FormState, formData: FormData) => {

    const fields = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password")
    }

    const validatedFields = SignUpFormSchema.safeParse(fields);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const res = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(validatedFields.data)
    })
    const user = await res.json()
    console.log(user);
    
    //create and store a session cookie
   


    if (!res.ok) {
        return {
            error: user.error
        }
    }

    //redirect user
    if (res.ok) {
        redirect("/signin")
    }


}