import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const adminEmail = "admin@tabletickers.com";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash: hashedPassword,
        role: UserRole.ADMIN,
      },
    });

    console.log("Admin user created.");
  } else {
    console.log("Admin already exists.");
  }

  const productCount = await prisma.product.count();

  if (productCount === 0) {
    await prisma.product.createMany({
      data: [
        {
          name: "Honeoye Strawberries",
          description: "Sweet and juicy early-season strawberries, perfect for fresh eating and desserts. Grown in Kokkola's fertile soil.",
          price: 4.50,
          stockQuantity: 50,
        },
        {
          name: "Polka Strawberries",
          description: "Large, firm berries with excellent flavor. Great for preserves and fresh consumption. A local favorite in Finland.",
          price: 5.25,
          stockQuantity: 40,
        },
        {
          name: "Jonsok Strawberries",
          description: "Premium late-season strawberries with intense sweetness and aroma. Perfect for special occasions and fresh eating.",
          price: 6.75,
          stockQuantity: 30,
        },
      ],
    });

    console.log("Sample products created.");
  } else {
    console.log("Products already exist.");
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });