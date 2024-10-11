// src/app/dashboard/ClientDashboard.js
'use client';

import { useSession } from 'next-auth/react';

export default function ClientDashboard() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (!session) {
        return <p>You are not logged in</p>;
    }

    return (
        <div>
            <h2>Client-Side Data</h2>
            <p>Hello, {session.user.name}. This data is fetched on the client.</p>
        </div>
    );
}
