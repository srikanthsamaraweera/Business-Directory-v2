// pages/api/deletePost.js
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    // Check if the request method is DELETE
    if (req.method !== 'DELETE') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const session = await getServerSession(req, res, authOptions);

    // Check if the user is authenticated
    if (!session) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    // Check if the user is an admin
    const { user } = session;
    const userRecord = await prisma.users.findUnique({
        where: { email: user.email },
        select: { user_type: true },
    });

    if (!userRecord || userRecord.user_type !== 'admin') {
        // return res.status(403).json({ error: 'Access denied' });
    }

    // Extract the post ID from the request body
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Post ID is required' });
    }

    try {
        // Delete the post where ID matches
        await prisma.post.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ error: "Failed to delete post" });
    } finally {
        await prisma.$disconnect();
    }
}
