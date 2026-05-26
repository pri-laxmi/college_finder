import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import bycrypt from "bcryptjs";

export async function POST(req: NextRequest){
    try{
        const {email, password, name} = await req.json();
        if(!email || !password || !name){
          return Response.json({error: "Name, email and password are required"}, {status: 400});
        }
        const existingUser=await prisma.user.findUnique({
            where:{email},
        });
        if(existingUser){
            return Response.json({error: "User already exists"}, {status: 400});
        }

        const hashedPassword=await bycrypt.hash(password,10);
        const user = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        });

    return Response.json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Signup failed" },
      { status: 500 }
    );
        
}}