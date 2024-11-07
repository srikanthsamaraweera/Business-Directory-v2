"use server"
// utils/fetchDatabaseFiles.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchDatabaseFiles() {
    try {
        // Fetch all file URLs from the database
        const files = await prisma.post.findMany({
            select: { image1: true, image2: true }
        });

        // Extract URLs from the fetched files
        const urls = files.map(file => [file.image1, file.image2]);

        return urls;
    } catch (error) {
        console.error("Error fetching database files:", error);
        return [];
    } finally {
        await prisma.$disconnect();
    }
}
