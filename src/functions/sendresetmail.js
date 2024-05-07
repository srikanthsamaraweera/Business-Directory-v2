"use server"
import nodemailer from 'nodemailer';
import { randomUUID } from "crypto"
import SetCookie from './setcookie';
import GetCookie from './getcookie';

export default async function SendResetEmail(emailaddress) {
    const randomuuid = randomUUID();
    await SetCookie("passreset", randomuuid, 60 * 60)
    const siteurl = process.env.SiteURL;
    var getcookie = "notset"
    try {
        getcookie = (await GetCookie("passreset")).value;

    } catch (e) {
        getcookie = "notset";
    }



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
        to: emailaddress,
        subject: `Reset Password`,
        text: emailaddress,
        html: `<div>Hi ${emailaddress}, <p>Please click below link to reset the password, or copy and paste the url in the address bar of a web browser to reset. </p>
        <p><bold>Do not use this link in Incognito mode or the Private mode of the browser.</bold></p>
        <p><bold>Use this link in the same browser which you used to send the reset email.</bold></p>
                <a href='http://${siteurl}/resetresponse?email=${emailaddress}&cookie=${getcookie}'> http://${siteurl}/resetresponse?email=${emailaddress}&cookie=${getcookie}</a>
        </div>`
    }

    async function sendEmail() {
        transporter.sendMail(mailData, function (err, info) {
            if (err)
                return { message: "Error sending email", error: err }
            else
                return { message: "Email sent! Please check your email" }
        })
    }

    await sendEmail();
    return { message: "Email sent! Please check your email" }
}
