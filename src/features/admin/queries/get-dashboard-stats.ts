import { prisma } from "@/lib/prisma";

export type DashboardStats = {
  totalProducts: number;
  activeProducts: number;
  totalReservations: number;
  pendingReservations: number;
  confirmedReservations: number;
  completedReservations: number;
  cancelledReservations: number;
  lowStockProducts: Array<{
    id: string;
    name: string;
    stockQuantity: number;
    price: string;
    imageUrl: string | null;
  }>;
  recentReservations: Array<{
    id: string;
    customerName: string;
    reservationDate: Date;
    reservationTime: string;
    reservationType: "PICKUP" | "DELIVERY";
    status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
    createdAt: Date;
  }>;
};

const LOW_STOCK_THRESHOLD = 5;

export async function getDashboardStats(): Promise<DashboardStats> {
  const [
    totalProducts,
    activeProducts,
    reservationCounts,
    lowStockProducts,
    recentReservations,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { isActive: true } }),
    prisma.reservation.groupBy({
      by: ["status"],
      _count: { id: true },
    }),
    prisma.product.findMany({
      where: {
        isActive: true,
        stockQuantity: { lte: LOW_STOCK_THRESHOLD },
      },
      orderBy: { stockQuantity: "asc" },
      take: 5,
      select: {
        id: true,
        name: true,
        stockQuantity: true,
        price: true,
        images: { select: { url: true }, take: 1 },
      },
    }),
    prisma.reservation.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        customerName: true,
        reservationDate: true,
        reservationTime: true,
        reservationType: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  const statusMap = Object.fromEntries(
    reservationCounts.map((r) => [r.status, r._count.id])
  );

  const totalReservations = reservationCounts.reduce((sum, r) => sum + r._count.id, 0);

  return {
    totalProducts,
    activeProducts,
    totalReservations,
    pendingReservations: statusMap["PENDING"] ?? 0,
    confirmedReservations: statusMap["CONFIRMED"] ?? 0,
    completedReservations: statusMap["COMPLETED"] ?? 0,
    cancelledReservations: statusMap["CANCELLED"] ?? 0,
    lowStockProducts: lowStockProducts.map((p) => ({
      id: p.id,
      name: p.name,
      stockQuantity: p.stockQuantity,
      price: p.price.toString(),
      imageUrl: p.images[0]?.url ?? null,
    })),
    recentReservations: recentReservations.map((r) => ({
      id: r.id,
      customerName: r.customerName,
      reservationDate: r.reservationDate,
      reservationTime: r.reservationTime,
      reservationType: r.reservationType as "PICKUP" | "DELIVERY",
      status: r.status as "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED",
      createdAt: r.createdAt,
    })),
  };
}
