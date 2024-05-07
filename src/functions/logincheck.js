"use server"
import { PrismaClient } from "@prisma/client";
import { DecPass } from "./hashpassword";



export default async function LoginCheck(email, plainpassword) {
    const db = new PrismaClient();
    const hashquery = await db.$queryRaw`SELECT password FROM users inner join user_validation on user_validation.email=users.email where users.email=${email} && validated="1"`
    const hashpass = hashquery.map((r) => r.password).toString()
    // console.log("hashquery result ", hashpass, " plainpass ", plainpassword)

    const logincheck = await DecPass(hashpass, plainpassword)
    console.log("login check", logincheck)
    return logincheck;

}

