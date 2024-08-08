"use server"
import { PrismaClient } from "@prisma/client"

export default async function saveTempImage(file1) {
    console.log("savetempimage: ", file1)
    const db = new PrismaClient()

    await db.temp_image.create({
        data: {
            filename1: file1,

        }
    })
}