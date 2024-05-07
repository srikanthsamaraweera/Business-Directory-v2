"use server"
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import nodemailer from 'nodemailer';


export default async function Revalidate(formData) {
    const db = new PrismaClient();
    const randno = randomUUID()
    const siteurl = process.env.SiteURL
    const query = `select count(id) from user_validation where email='${formData.get("email")}'`
    const email_in_db = await db.$queryRaw`select count(id) as countemails from user_validation where email=${formData.get("email")}`;
    const email_in_db_count = email_in_db.map((r) => r.countemails).toString();
    // console.log(email_in_db_count)
    // console.log(email_in_db_count == 0 ? "0" : "1")

    const transporter = nodemailer.createTransport({
        port: 465,
        host: "designx.solutions",
        auth: {
            user: 'confirm@designx.solutions',
            pass: 'Robinhood456',
        },
        secure: true,
    })

    const mailData = {
        from: 'confirm@designx.solutions',
        to: 'samaraweeraster@gmail.com',
        subject: `Confirm your account`,
        text: formData.get("email"),
        html: `<div>Hi ${formData.get("email")}, <p>Please click below link to confirm your email, or copy and paste the url in the address bar of a web browser to confirm </p>
                <a href='http://${siteurl}/activate/${randno}'> http://${siteurl}/activate/${randno}</a>
        </div>`
    }

    async function sendEmail() {
        transporter.sendMail(mailData, function (err, info) {
            if (err)
                console.log(err)
            else
                console.log(info)
        })
    }

    if (email_in_db_count == 0) {

        try {
            await db.user_validation.create({
                data: {
                    email: formData.get('email'),
                    validationtoken: randno,
                }

            }
            )
        } catch (error) {
            return { error: 'no' }
        }


        await sendEmail()
        return { error: 'ok' }

    } else {
        console.log('else works')
    }
}