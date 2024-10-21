// src/app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import LoginCheck from "@/functions/logincheck";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: "email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            authorize: async (credentials) => {
                const logincheck = await LoginCheck(credentials.email, credentials.password);
                // console.log("logincheck ", logincheck)
                if (logincheck == true) return { email: credentials.email }
                else return null;
            },
        }),
    ],
    callbacks: {
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
    secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
