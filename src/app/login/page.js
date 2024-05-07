import LogForm from "@/components/login";
import Head from "next/head";

export const metadata = {
    title: "Login",
    description: "User Login",
};
export default function Login() {
    return (
        <div>

            <LogForm />
        </div>
    )
}