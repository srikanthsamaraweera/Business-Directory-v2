"use server"
import { PrismaClient } from "@prisma/client";
import { auth } from "auth";


export default async function SaveAd(formData, im1, im2) {
    const db = new PrismaClient();
    const session = await auth();
    console.log("imagevals: ", im1, " ", im2)

    try {
        await db.post.create({
            data: {
                user_email: session.user.email,
                email: formData.get('ad_email'),
                title: formData.get('ad_title'),
                description: formData.get('ad_description'),
                category: formData.get('ad_type'),
                phone: formData.get('ad_telephone'),
                image1: im1,
                image2: im2,
                image3: im2,
                map: formData.get('ad_map'),
                // address: formData.get('ad_address'),

            }
        })
    } catch (error) {
        console.log("error: " + error.toString())
        // return { saveError: "Saving Error: " + error.toString() }
    }

}