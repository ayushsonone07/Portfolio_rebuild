import { get } from "mongoose";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { signIn } from "next-auth/react";
import { connectDB } from "../../../../utils/databse";
import User from "@models/user";

const handeler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }) 
    ],
    callbacks: {
        async session({ session }){
            const sessionUser = await User.findOne({
                email: session.user.email
            })

            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({ profile }){
            try {
                // this is Serverless -> LAMBDA -> DynmoDB
                await connectDB();
    
                //^ WE NEED TWO CHECKS HERE :
    
                // check if user already exists
                const userExists = await User.findOne({
                    email: profile.email
                })
    
                // if not, create new user
                if(!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ","").toLowerCase(),
                        image: profile.picture
                    })
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }   
    }
})

export {handeler as GET, handeler as POST };