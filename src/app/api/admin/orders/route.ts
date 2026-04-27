import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin";
import { mapOrderStatus } from "@/lib/mappers/order-status";

export async function GET(req: Request) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim() ?? "";
    const status = searchParams.get("status")?.trim() ?? "ALL";

    const orders = await prisma.order.findMany({
      include: {
        student: true,
        mentor: true,
        subject: true,
      },
      where: {
        ...(status !== "ALL" ? { status: status as any } : {}),
        ...(q
          ? {
              OR: [
                {
                  student: {
                    name: {
                      contains: q,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  mentor: {
                    name: {
                      contains: q,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  subject: {
                    name: {
                      contains: q,
                      mode: "insensitive",
                    },
                  },
                },
              ],
            }
          : {}),
      },
      orderBy: {
        scheduledAt: "desc",
      },
    });

    return NextResponse.json(
      orders.map((order) => ({
        id: order.id,
        studentName: order.student.name,
        mentorName: order.mentor.name,
        subject: order.subject.name,
        status: mapOrderStatus(order.status),
        rawStatus: order.status,
        scheduledAt: order.scheduledAt,
      }))
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar pedidos" },
      { status: 500 }
    );
  }
}