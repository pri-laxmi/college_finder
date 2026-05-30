import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader =
      req.headers.get("authorization");

    if (!authHeader) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { userId: number };

    const { id } = await context.params;

    await prisma.savedCollege.delete({
      where: {
        id: parseInt(id),
      },
    });

    return Response.json({
      message: "College removed",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to remove college" },
      { status: 500 }
    );
  }
}