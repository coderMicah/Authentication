"use server"


import { createSession } from "@/lib/session";
import { SignInFormSchema } from "@/schema/SignInFormSchema";
import { FormState } from "@/types/definitions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signinAction = async (action: FormState, formData: FormData) => {

    const fields = {
        email: formData.get("email"),
        password: formData.get("password")
    }

    const validatedFields = SignInFormSchema.safeParse(fields);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const res = await fetch("http://localhost:3000/api/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(validatedFields.data)
    })
    
    const user = await res.json()
    

    if (!res.ok) {
        return {
            error: user.error
        }
    }
    
    //store user data in a cookie
     await createSession(user.token)


    //redirect user
    if (res.ok) {
        redirect("/dashboard")
    }


}