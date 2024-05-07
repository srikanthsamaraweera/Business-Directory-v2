"use server"
import GetCookie from "@/functions/getcookie";
import SetCookie from "@/functions/setcookie";


export default async function page() {
    const handlesubmit = async (event) => {
        "use server"
        const setcookie = await SetCookie("passreset", "kkkkll", 15);
    };
    return (
        <div>
            <form action={handlesubmit} method="post">

                <button type="submit">Set Cookie</button>
            </form>

            <form action={async () => {
                "use server"

                const getcookie = await GetCookie("passreset");
                try {
                    console.log("getcookie", getcookie.value);
                } catch (error) {
                    console.log("Error retrieving cookie:", error);
                }


            }} >
                <button type="submit">get Cookie</button>
            </form>

        </div>
    )
}
