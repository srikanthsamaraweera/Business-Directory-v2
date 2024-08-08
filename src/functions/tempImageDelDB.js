"use server"
import { PrismaClient } from "@prisma/client";

export default async function DelTempImageFromDB(file) {
    console.log("Delete DB: ", file)
    const prisma = new PrismaClient();

    try {
        await prisma.temp_image.deleteMany({
            where: {
                filename1: file,
            },
        });
    } catch (error) {
        console.log("DBError: ", error.toString())
    }

}