import { PrismaClient } from "@prisma/client"

export default async function SaveUserDB(email, password) {
    const db = new PrismaClient()
    console.log('save comment function:', email, password)

    await db.users.create({
        data: {
            email: email,
            password: password
        }
    })
}