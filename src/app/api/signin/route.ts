import { db } from "@/lib/db";
import { SignInFormSchema } from "@/schema/SignInFormSchema";
import { NextResponse } from "next/server"
import { compareSync } from "bcrypt"
import {  encrypt } from "@/lib/session";


export async function POST(req: Request) {

    try {

        //get data from the body
        const body = await req.json()


        //validate the data
        const validData = SignInFormSchema.safeParse(body);

        if (!validData.success) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 400 })
        }

        const { email, password } = validData.data;

        //lookup the user
        //check if user with email exist
        const user = await db.user.findFirst({
            where: { email: email }
        })

        if (!user) {
            return NextResponse.json({ error: "Email does not exist" }, { status: 400 })
        }

        //compare pswd
        const isCorrectPassword = compareSync(password, user.password)
        if (!isCorrectPassword) {
            return NextResponse.json({ error: "Incorrect Password" }, { status: 400 })
        }

        //create jwt token
        const jwt = await encrypt(String(user.id));

        //respond with jwt token
        return NextResponse.json({ token: jwt }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: "Something Went Wrong" }, { status: 500 })
    }

}