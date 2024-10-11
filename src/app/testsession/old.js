"use client"
// import { auth } from 'auth';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default async function page() {
    try {
        const { data: session, status } = useSession();
        //const session = await auth();
        if (!session) {
            redirect("/");
        }
    } catch (e) {
        console.log(e)
    }




    return (
        <div>
            <h1>Session only page </h1>
        </div>
    )
}
