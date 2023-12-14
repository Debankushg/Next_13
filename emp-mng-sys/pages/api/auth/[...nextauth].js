import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../database/conn";
import Registration from "../../../model/registration";
import { compare } from 'bcryptjs'

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
        }),
        GithubProvider({
            clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? "",
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET ?? ""
        }),
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                connectMongo().catch(error => { error: "Connection Failed" })

                //check user exsistance
                const result = await Registration.findOne({ email: credentials.email })
                if (!result) {
                    throw new Error('No user Found with Email Please signUp..!!')
                }

                //compare()
                const checkPassword = await compare(credentials.password, result.password);
                // incorrect password
                if (!checkPassword || result.email !== credentials.email) {
                    throw new Error("Username or Password doesn't match")
                }
                return result
            }
        })

    ],
    secret: "XH6bp/TkLvnUkQiPDEZNyHc0CV+VV5RL/n+HdVHoHN0=",
    session: {
        strategy: 'jwt',
    },
    csrf: true,
}

export default NextAuth(authOptions)