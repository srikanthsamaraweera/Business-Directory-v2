import { cookies } from "next/headers";

export default async function GetCookie(name) {
    const cookieStore = cookies();

    return cookieStore.get(name);
}