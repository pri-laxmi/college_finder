import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const location = searchParams.get("location") || "";

    const minFees = Number(searchParams.get("minFees")) || 0;
    const maxFees = Number(searchParams.get("maxFees")) || 10000000;

    const page = Number(searchParams.get("page")) || 1;
    const limit = 5;

    const colleges = await prisma.college.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
        location: {
          contains: location,
          mode: "insensitive",
        },
        fees: {
          gte: minFees,
          lte: maxFees,
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return Response.json(colleges);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to fetch colleges" },
      { status: 500 }
    );
  }
}