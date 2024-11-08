// pages/api/getPosts.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { page = 1, limit = 20 } = req.query;

        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        try {
            const totalPosts = await prisma.post.count(); // Get total count for pagination

            const posts = await prisma.post.findMany({
                skip: (pageNumber - 1) * limitNumber,
                take: limitNumber,
                select: {
                    id: true,
                    title: true,
                    enabled: true,
                    description: true,
                    email: true,
                    user_email: true,
                    category: true,
                    phone: true,
                    map: true,
                    date: true,
                    image1: true,
                    image2: true
                }
            });

            res.status(200).json({
                posts,
                totalPosts,
                totalPages: Math.ceil(totalPosts / limitNumber),
                currentPage: pageNumber,
            });
        } catch (error) {
            console.error("Error fetching posts:", error);
            res.status(500).json({ error: "Failed to fetch posts" });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
