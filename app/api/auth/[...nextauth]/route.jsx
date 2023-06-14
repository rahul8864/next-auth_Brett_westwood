import NextAuth from "next-auth/next";
import prisma from '@/app/libs/prismadb';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from 'bcrypt'

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'rahul@gmail.com' },
                password: { label: 'Password', type: 'password' },
                username: { label: 'Username', type: 'text', placeholder: 'Rahul Kumar' },
            },
            async authorize(credentials) {
                // const user = { id: 1, name: "Rahul", email: 'rahulkumar@gmail.com' }
                // return user
                if (!credentials.email || credentials.password) {
                    throw new Error('Please enter an email and password')
                }
                // check to see if user exists
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                // if no user was found
                if(!user || !user?.hashedPassword) {
                    throw new Error('NO user found')
                }
                // check to see if password matches
                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);
                // if password does not match
                if (!passwordMatch) {
                    throw new Error('Incorrect password');
                }

                return user
            },
        })
    ],
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, handler as PUT, handler as DELETE }