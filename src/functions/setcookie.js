import { cookies } from "next/headers";

export default async function SetCookie(name, value, expires) {
    const cookieStore = cookies();
    cookieStore.set(name, value, { maxAge: expires });
    console.log("cookie set", name, value);

}


