import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const idsParam = searchParams.get("ids");

    if (!idsParam) {
      return Response.json(
        { error: "No college IDs provided" },
        { status: 400 }
      );
    }

    const ids = idsParam
      .split(",")
      .map((id) => parseInt(id))
      .filter((id) => !isNaN(id));

    const colleges = await prisma.college.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    const comparison = colleges.map((college) => {
      const avgPackage = (college as any).averagePackage ?? 0;
      const roiValue = college.fees ? Number(((avgPackage / college.fees) || 0).toFixed(2)) : 0;

      return {
        ...college,
        roi: roiValue,
      };
    });

    const bestROI = comparison.reduce((best, current) =>
      current.roi > best.roi ? current : best,
      comparison[0] ?? { roi: -Infinity }
    );


    return Response.json({ colleges: comparison, bestCollegeByROI: bestROI.name, });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to compare colleges" },
      { status: 500 }
    );
  }
}