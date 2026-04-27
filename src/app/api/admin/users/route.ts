import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin";

export async function GET(req: Request) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim() ?? "";
    const role = searchParams.get("role")?.trim() ?? "ALL";

    const users = await prisma.user.findMany({
      where: {
        ...(q
          ? {
              OR: [
                {
                  name: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
                {
                  email: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {}),
        ...(role !== "ALL"
          ? {
              role: role as "STUDENT" | "MENTOR",
            }
          : {}),
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(
      users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        institution: user.institution,
        course: user.course,
        period: user.period,
      }))
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }
}