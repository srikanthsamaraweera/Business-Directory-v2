// src/app/dashboard/page.js
import { getServerSession } from "next-auth/next";

import { authOptions } from '../api/auth/[...nextauth]/route';
import ClientDashboard from './ClientDashboard';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return <p>You are not logged in</p>;
    }

    return (
        <div>
            <h1>Welcome, {session.user.name}</h1>
            <p>This is a server-side component reading the session.</p>
            <ClientDashboard />
        </div>
    );
}
