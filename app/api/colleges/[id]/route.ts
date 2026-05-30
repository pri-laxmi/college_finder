import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const collegeId = parseInt(id);

    if (isNaN(collegeId)) {
      return Response.json(
        { error: "Invalid college ID" },
        { status: 400 }
      );
    }

    const college = await prisma.college.findUnique({
      where: {
        id: collegeId,
      },
    });

    if (!college) {
      return Response.json(
        { error: "College not found" },
        { status: 404 }
      );
    }

    return Response.json(college);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to fetch college" },
      { status: 500 }
    );
  }
}