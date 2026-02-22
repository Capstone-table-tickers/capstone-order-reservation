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
          name: "Strawberry Cake",
          description: "Fresh strawberry cream cake",
          price: 25.5,
          stockQuantity: 20,
        },
        {
          name: "Chocolate Cupcake",
          description: "Rich chocolate cupcake",
          price: 4.99,
          stockQuantity: 50,
        },
        {
          name: "Blueberry Smoothie",
          description: "Healthy blueberry smoothie",
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