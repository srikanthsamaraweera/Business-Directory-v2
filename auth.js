import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import LoginCheck from "@/functions/logincheck";

//credentials provider
const credentialsConfig = CredentialsProvider({
    name: "Credentials",
    credentials: {
        email: {
            label: "email",
        },
        password: {
            label: "Password",
            type: "password",
        },
    },
    async authorize(credentials) {
        // if (credentials.email === "sk" && credentials.password === "123")
        //     return {
        //         email: "credentialemail@email.com",
        //     };
        const logincheck = await LoginCheck(credentials.email, credentials.password);
        // console.log("logincheck ", logincheck)
        if (logincheck == true) return { email: credentials.email }
        else return null;
    },
});

const config = {
    trustHost: true,
    providers: [
        Google({
            // clientId: "623082667288-529j522dcshdm86ukbk3ctqtekacvd8p.apps.googleusercontent.com",
            clientId: process.env.AUTH_GOOGLE_ID,
            // clientSecret: "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"
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        }), credentialsConfig,
    ], secret: process.env.NEXT_PUBLIC_SECRET,
    callbacks: {

        // async signIn({ user, account, profile, email, credentials }) {


        //     if (account.provider === "google") {
        //         console.log("User logged in with Google");
        //         console.log(user);
        //     }

        //     if (account.provider === "credentials") {
        //         // Code to execute if the provider is "credentials"
        //         console.log("User logged in with Credentials");
        //         console.log(user);

        //     }
        //     return true
        // },

        async session({ session, token }) {
            // Attach the user name to the session
            session.user.email = token.email;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
            }
            return token;
        },

    },
    pages: {
        signIn: "/signin",
        error: '/signin'
    }
}

export const providerMap = config.providers.map((provider) => {

    if (typeof provider === "function") {
        const providerData = provider()
        return { id: providerData.id, name: providerData.name }
    } else {
        return { id: provider.id, name: provider.name }
    }
})

export const { handlers, auth, signIn, signOut } = NextAuth(config)
