import { auth } from 'auth';
import { redirect } from 'next/navigation';

export default async function page() {

    const session = await auth();
    if (!session) {
        redirect("/");
    }



    return (
        <div>
            <h1>Session only page</h1>
        </div>
    )
}
