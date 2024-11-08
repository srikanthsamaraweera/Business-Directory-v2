// pages/api/toggleEnabled.js
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);

    // Check if the user is authenticated
    if (!session) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    const { email } = session.user;

    try {
        // Fetch user type directly from the database
        const user = await prisma.users.findUnique({
            where: { email: email },
            select: { user_type: true },
        });

        // If the user does not exist or is not an admin, deny access
        if (!user || user.user_type !== 'admin') {
            return res.status(403).json({ error: 'Forbidden: Admin access only' });
        }

        // Handle POST request to toggle status if user is an admin
        if (req.method === 'POST') {
            const { postId, currentStatus } = req.body;

            // Determine the next status in the cycle
            let newStatus;
            if (currentStatus === 'YES') {
                newStatus = 'NO';
            } else if (currentStatus === 'NO') {
                newStatus = 'PENDING';
            } else {
                newStatus = 'YES';
            }

            // Update the post's enabled status in the database
            await prisma.post.update({
                where: { id: postId },
                data: { enabled: newStatus }
            });

            res.status(200).json({ success: true, newStatus });
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Error toggling status:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        await prisma.$disconnect();
    }
}
