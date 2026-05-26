import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const namesParam = searchParams.get("names");

    if (!namesParam) {
      return Response.json(
        { error: "No college names provided" },
        { status: 400 }
      );
    }

    const names = namesParam
      .split(",")
      .map((name) => name.trim());

    const colleges = await prisma.college.findMany({
  where: {
    OR: names.map((name) => ({
      name: {
        contains: name,
        mode: "insensitive",
      },
    })),
  },
});

    const comparison = colleges.map((college) => ({
      ...college,
      roi: Number(
        (
          college.averagePackage / college.fees
        ).toFixed(2)
      ),
    }));

    const bestROI = comparison.reduce((best, current) =>
      current.roi > best.roi ? current : best
    );

    return Response.json({
      colleges: comparison,
      bestCollegeByROI: bestROI.name,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to compare colleges" },
      { status: 500 }
    );
  }
}