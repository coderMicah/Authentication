import { db } from "@/lib/db";
import { NextResponse } from "next/server"
import { hash } from "bcrypt";
import { SignUpFormSchema } from "@/schema/SignUpFormSchema";

export async function POST(req: Request) {

    try {

        //get data from the body
        const body = await req.json()


        //validate the data
        const validData = SignUpFormSchema.safeParse(body);

        if (!validData.success) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 400 })
        }

        const { username, email, password } = validData.data;



        //check if user with email exist
        const userByEmail = await db.user.findUnique({
            where: { email: email }
        })

        if (userByEmail) {
            return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
        }

        //check if user with username exist
        const userByName = await db.user.findUnique({
            where: { username: username }
        })

        if (userByName) {
            return NextResponse.json({ error: "User with this name already exists" }, { status: 409 })
        }

        //hash password
        const hashedPassword = await hash(password, 10)

        //store data in db
        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

        const { password: newPassword, ...rest } = newUser

        //return something
        return NextResponse.json({ user: rest, message: "User created Succesfuly" }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ error: "Something Went Wrong" }, { status: 500 })
    }

}