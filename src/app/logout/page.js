

import { signOut } from "auth"
import { redirect } from "next/navigation";
import { auth } from "auth";

export default async function page() {
    const session = await auth();
    return (
        <div>
            {
                session ? <form action={async () => {
                    "use server";
                    await signOut()

                }}>
                    <button>Logout</button>
                </form> :

                    <div style={{
                        border: '1px solid #000',
                        borderRadius: '5px',
                        padding: '10px',
                        textAlign: 'center',
                        backgroundColor: '#f0f0f0',
                        color: '#000',
                        width: '200px',
                        margin: '0 auto'
                    }}>
                        <a href="/" style={{
                            textDecoration: 'none',
                            color: '#000',
                            fontWeight: 'bold'
                        }}>
                            Back to Home
                        </a>
                    </div>
            }



        </div>
    )
}
