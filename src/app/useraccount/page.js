import UserAccountFullPage from "@/components/useraccountfullpage";
import { auth } from "auth";
import { redirect } from "next/navigation";



export default async function Page() {
    const session = await auth();
    if (!session) {
        redirect("/api/auth/signin");
    }

    return (
        <div>

            <UserAccountFullPage />
        </div>
    )
}
