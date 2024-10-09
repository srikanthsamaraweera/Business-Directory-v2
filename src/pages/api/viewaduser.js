// src/pages/api/viewaduser.js
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export default async function handler(req, res) {
    const page = parseInt(req.query.page) || 1; // Current page number, defaults to 1
    const limit = parseInt(req.query.limit) || 4; // Number of records per page, defaults to 4
    const skip = (page - 1) * limit; // Calculate how many records to skip

    try {
        const totalRecords = await db.post.count(); // Get the total number of records
        const records = await db.post.findMany({
            skip,
            take: limit,
        });

        res.status(200).json({
            totalRecords,
            totalPages: Math.ceil(totalRecords / limit),
            currentPage: page,
            records,
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching posts" });
    } finally {
        await db.$disconnect();
    }
}
