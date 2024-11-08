// pages/api/getPosts.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { page = 1, limit = 20, search = "", sortKey = "date", sortDirection = "asc" } = req.query;
    const offset = (page - 1) * limit;

    try {
        const whereClause = search
            ? {
                OR: [
                    { title: { contains: search.toLowerCase() } },
                    { description: { contains: search.toLowerCase() } },
                ],
            }
            : {};

        // Construct order clause for sorting

        const orderByClause = sortKey && sortDirection ? { [sortKey]: sortDirection } : {};

        const posts = await prisma.post.findMany({
            where: whereClause,
            orderBy: orderByClause,
            skip: parseInt(offset),
            take: parseInt(limit),
        });

        const totalPosts = await prisma.post.count({ where: whereClause });
        const totalPages = Math.ceil(totalPosts / limit);

        res.status(200).json({ posts, totalPages });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await prisma.$disconnect();
    }
}
