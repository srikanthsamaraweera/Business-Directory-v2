"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";


export default async function EditAd(formData, im1, im2, file1, file2, id) {
    const db = new PrismaClient();
    const session = await getServerSession(authOptions);
    console.log("imageurl: ", file1)

    try {
        await db.post.update({
            where: {
                id: id, // ID of the record you want to update
            },
            data: {
                user_email: session.user.email, // Ensure this email exists in the users table
                email: formData.get('ad_email'),
                title: formData.get('ad_title'),
                description: formData.get('ad_description'),
                category: formData.get('ad_type'),
                phone: formData.get('ad_telephone'),
                image1: im1,
                image2: im2,
                image3: im2,
                map: formData.get('ad_map'),
                district: formData.get('ad_district'),
                city: formData.get("ad_city"),
                date: new Date(),
                filename1: file1,
                filename2: file2,


            },
        })
    } catch (error) {
        console.log("error: " + error.toString())
        // return { saveError: "Saving Error: " + error.toString() }
    }

}