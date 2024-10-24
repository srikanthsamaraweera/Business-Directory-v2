// src/pages/api/viewaduser.js
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const db = new PrismaClient();


export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);

    const page = parseInt(req.query.page) || 1; // Current page number, defaults to 1
    const limit = parseInt(req.query.limit) || 4; // Number of records per page, defaults to 4
    const skip = (page - 1) * limit; // Calculate how many records to skip
    const userEmail = req.query.user_email;
    const titleValue = req.query.titleval;


    if (!session) {
        return res.status(401).json({ error: 'Not authenticated' }); // Use res.status().json()
    }

    try {
        const totalRecords = await db.post.count({
            where: {
                user_email: userEmail, // Exact match for user_email
                title: {
                    contains: titleValue,  // Partial match for title (LIKE '%titleValue%')
                }
            },
        }); // Get the total number of records
        const records = await db.post.findMany({
            where: {
                user_email: userEmail, // Exact match for user_email
                title: {
                    contains: titleValue,  // Partial match for title (LIKE '%titleValue%')
                }
            },
            skip,
            take: limit,
            orderBy: {
                date: 'desc', // Replace 'createdAt' with the desired field to sort by
            },
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
