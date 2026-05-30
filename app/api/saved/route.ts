import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = req.headers
      .get("authorization")
      ?.split(" ")[1];

    if (!token) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return Response.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { collegeId } = body;

    if (!collegeId || typeof collegeId !== "number" || isNaN(collegeId)) {
      return Response.json(
        { error: "Invalid or missing collegeId" },
        { status: 400 }
      );
    }

    const savedCollege = await prisma.savedCollege.create({
      data: {
        userId: decoded.userId,
        collegeId,
      },
    });

    return Response.json(savedCollege);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to save college" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.headers
      .get("authorization")
      ?.split(" ")[1];

    if (!token) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return Response.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    const savedColleges = await prisma.savedCollege.findMany({
      where: {
        userId: decoded.userId,
      },
      include: {
        college: true,
      },
    });

    return Response.json(savedColleges);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to fetch saved colleges" },
      { status: 500 }
    );
  }
}