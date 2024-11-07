
import { PrismaClient } from '@prisma/client';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();


export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        return res.status(401).json({ error: 'Not authenticated' }); // Use res.status().json()
    }
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Only GET requests are allowed' });
    }

    const { email } = req.query;

    if (typeof email !== 'string') {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        const user = await prisma.users.findUnique({
            where: {
                email: email,
            },
            select: {
                user_type: true,
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user_type: user.user_type });
    } catch (error) {
        console.error('Error fetching user type:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await prisma.$disconnect();
    }
}
