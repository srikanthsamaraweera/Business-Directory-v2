"use server"
import { PrismaClient } from "@prisma/client";
import CheckPasswordRequirment from "./checkpasswordrequirment";
import { EncPass } from "./hashpassword";


export default async function updatepassword(email, password, confirmpass) {
    const db = new PrismaClient();
    const hashedpass = await EncPass(password);

    //const querystring = `SELECT count(users.email) as x  FROM users inner join user_validation on users.email=user_validation.email where users.email=${email} && user_validation.validated='1'`
    const query = await db.$queryRaw`SELECT count(users.email) as x  FROM users inner join user_validation on users.email=user_validation.email where users.email=${email} && user_validation.validated='1'`
    const queryresult = query.map((r) => r.x).toString();
    // console.log("query result ", querystring);



    if (queryresult == 0) {
        return { message: "Error: Email not registered or not validated" }
    }

    if (password !== confirmpass) {
        return { message: "Error: Passwords do not match" }
    }
    const passwordcheck = await CheckPasswordRequirment(password);
    if (!passwordcheck) {
        return { message: "Error: Password should contain atleast one number and one special character. Password lenth should be minimum 6 characters and less than 16 characters" }
    }
    if (queryresult == 1) {

        const updateUsers = await db.users.updateMany({
            where: {
                email: {
                    contains: email,
                },
            },
            data: {
                password: hashedpass,
            },
        });

        return { message: "Password updated successfully" }
    }

}
