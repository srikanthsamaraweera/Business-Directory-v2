"use server"
import { signIn } from 'auth'
import { AuthError } from 'next-auth';


export default async function AuthSignIn(email, password) {
    // console.log("Authfunc ", email, " ", password);

    try {
        await signIn("credentials", {
            email: email,
            password: password,
            redirectTo: "/",
        },

        );
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin": return { error: "Invalid credentials." }
                default: return { error: error.name }
            }

        }
        throw error;

    }

}








