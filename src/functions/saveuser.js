'use server'
import SaveUserDB from "@/lib/saveuserDB"
import { Prisma, PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import nodemailer from 'nodemailer';
import { randomUUID } from "crypto"
import { env } from "process"
import { EncPass } from "./hashpassword"
import CheckPasswordRequirment from "./checkpasswordrequirment"


export default async function SaveUser(formData) {
    const randomuuid = randomUUID();
    const db = new PrismaClient()
    const siteurl = process.env.SiteURL
    const passwordrule = await CheckPasswordRequirment(formData.get("password"));

    //hash password

    const hashedpass = await EncPass(formData.get("password"))
    console.log("hashed in ui ", hashedpass)

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
                <a href='http://${siteurl}/activate/${randomuuid}'> http://${siteurl}/activate/${randomuuid}</a>
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



    try {
        console.log("password match", formData.get('password') == formData.get('confirm_password'))
    } catch (e) {

    }

    if (!formData.get('email')) {
        console.log('email required')
    } else if (!formData.get('password')) {
        console.log('password required')
    } else if (passwordrule == false) {
        return { iserror: true, passreqerror: "Password should contain atleast one number and one special character. Password lenth should be minimum 6 characters and less than 16 characters" }
        // console.log('Error: Password should contain atleast one number and one special character. Password lenth should be minimum 6 characters and less than 16 characters')
    }

    else if (!formData.get('confirm_password')) {
        console.log('confirm the password')
    } else if (formData.get('password') != formData.get('confirm_password')) {
        return { isError: true, confirmerror: "Passwords mismatch" }
    } else {
        console.log('data ok')


        try {

            await db.users.create({
                data: {
                    email: formData.get('email'),
                    password: hashedpass,
                }

            }
            )
            await db.user_validation.create({
                data: {
                    email: formData.get('email'),
                    validationtoken: randomuuid
                }
            })

            await sendEmail();



            //  transporter.sendMail(mailData, function (err, info) {
            //     if (err)
            //         console.log(err)
            //     else
            //         console.log(info)
            // })

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return { isError: true, emailerror: "Account already exists for this email" }
                }
            } else {
                return { isError: true, emailerror: error.toString() }
            }

        }




        revalidatePath('/register/success');
        redirect('/register/success')
    }



}