// pages/api/toggleEnabled.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { postId, currentStatus } = req.body;

        try {
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
        } catch (error) {
            console.error('Error toggling status:', error);
            res.status(500).json({ success: false, error: 'Failed to toggle status' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
