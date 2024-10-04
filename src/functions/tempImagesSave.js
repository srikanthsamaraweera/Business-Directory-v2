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

export async function SetUSedInPost(file1, file2) {
    const db2 = new PrismaClient()
    await db2.temp_image.updateMany(
        {
            where: {
                filename1: {
                    in: [file1, file2],
                },
            },
            data: {
                posted: 1,
            },
        }
    )
}