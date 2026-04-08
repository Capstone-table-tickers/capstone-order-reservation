import { PrismaClient, UserRole, ReservationType, ReservationStatus } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// ─── Products with realistic Unsplash images ────────────────────────────────

const PRODUCTS = [
  {
    name: "Honeoye Strawberries",
    description:
      "Sweet and juicy early-season strawberries, perfect for fresh eating and desserts. Grown in Kokkola's fertile soil. Available in 500 g punnets.",
    price: 4.5,
    stockQuantity: 48,
    images: [
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543528176-61b239494933?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    name: "Polka Strawberries",
    description:
      "Large, firm berries with excellent flavour, great for preserves and fresh consumption. A local favourite in Finland. Sold per kilogram.",
    price: 5.25,
    stockQuantity: 35,
    images: [
      "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    name: "Jonsok Strawberries",
    description:
      "Premium late-season strawberries with intense sweetness and aroma. Perfect for special occasions. Limited seasonal availability.",
    price: 6.75,
    stockQuantity: 20,
    images: [
      "https://images.unsplash.com/photo-1543528176-61b239494933?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    name: "Garden Tomatoes",
    description:
      "Vine-ripened tomatoes grown in our local greenhouse. Perfect for salads, sauces, and everyday cooking. Sold per kilogram.",
    price: 3.8,
    stockQuantity: 60,
    images: [
      "https://images.unsplash.com/photo-1546094096-0df4bcabd337?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    name: "Cherry Tomatoes (Mixed)",
    description:
      "A colourful mix of red, yellow, and orange cherry tomatoes. Sweet, firm, and great for snacking or garnish. Sold in 250 g boxes.",
    price: 2.9,
    stockQuantity: 5,
    images: [
      "https://images.unsplash.com/photo-1558818498-28c1e002b655?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    name: "Baby Cucumbers",
    description:
      "Crisp, flavourful baby cucumbers ideal for snacking, salads, and pickling. Freshly harvested from our farm. Sold per 500 g bag.",
    price: 2.5,
    stockQuantity: 40,
    images: [
      "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    name: "Fresh Dill Bunch",
    description:
      "Fragrant fresh dill from our herb garden. Essential for Finnish cooking — perfect with fish, potatoes, and pickled vegetables. Sold as a 50 g bunch.",
    price: 1.5,
    stockQuantity: 30,
    images: [
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    name: "New Potatoes (1 kg)",
    description:
      "Tender new potatoes freshly dug from our fields. Thin-skinned and buttery — best boiled or roasted. Sold in 1 kg bags.",
    price: 2.2,
    stockQuantity: 80,
    images: [
      "https://images.unsplash.com/photo-1585278572513-3b1fef15d580?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    name: "Leafy Salad Mix",
    description:
      "A fresh blend of baby leaves — arugula, spinach, and mixed lettuce. Washed and ready to eat. Sold in 100 g bags.",
    price: 3.2,
    stockQuantity: 3,
    images: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    name: "Farm Vegetable Box",
    description:
      "A seasonal assortment of 5–6 different vegetables from our farm. Contents vary by week based on availability. Great for families.",
    price: 14.5,
    stockQuantity: 10,
    images: [
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    name: "Blueberries (500 g)",
    description:
      "Wild-foraged Finnish blueberries. Antioxidant-rich and delicious. Perfect for smoothies, baking, or eating fresh. Seasonal availability only.",
    price: 7.5,
    stockQuantity: 0,
    images: [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    name: "Kohlrabi (2-pack)",
    description:
      "Two crisp kohlrabi bulbs — mild, sweet, and great for slicing raw or adding to stir-fries. Unusual and delicious. Grown locally.",
    price: 2.8,
    stockQuantity: 22,
    images: [
      "https://images.unsplash.com/photo-1585997405009-c6fada50aacd?auto=format&fit=crop&w=800&q=80",
    ],
  },
];

// ─── Demo reservations ───────────────────────────────────────────────────────

const RESERVATIONS = [
  {
    customerName: "Anna Koskinen",
    customerEmail: "anna.koskinen@example.fi",
    customerPhone: "+358 40 123 4567",
    reservationType: ReservationType.PICKUP,
    reservationDate: new Date("2026-04-15"),
    reservationTime: "10:00",
    status: ReservationStatus.CONFIRMED,
    notes: "Please put aside the freshest batch of strawberries.",
    products: [
      { name: "Honeoye Strawberries", quantity: 2 },
      { name: "Garden Tomatoes", quantity: 1 },
    ],
  },
  {
    customerName: "Mikael Lindqvist",
    customerEmail: "mikael.lindqvist@example.fi",
    customerPhone: "+358 44 987 6543",
    reservationType: ReservationType.DELIVERY,
    reservationDate: new Date("2026-04-16"),
    reservationTime: "14:00",
    deliveryAddress: "Rantakatu 5, 67100 Kokkola",
    status: ReservationStatus.PENDING,
    notes: null,
    products: [
      { name: "Farm Vegetable Box", quantity: 1 },
      { name: "Fresh Dill Bunch", quantity: 2 },
    ],
  },
  {
    customerName: "Sofia Mäkinen",
    customerEmail: "sofia.makinen@example.fi",
    customerPhone: "+358 50 555 1234",
    reservationType: ReservationType.PICKUP,
    reservationDate: new Date("2026-04-10"),
    reservationTime: "09:00",
    status: ReservationStatus.COMPLETED,
    notes: "Picking up on behalf of my elderly neighbour too.",
    products: [
      { name: "Polka Strawberries", quantity: 3 },
      { name: "New Potatoes (1 kg)", quantity: 2 },
    ],
  },
  {
    customerName: "Erkki Virtanen",
    customerEmail: "erkki.virtanen@example.fi",
    customerPhone: "+358 45 222 3344",
    reservationType: ReservationType.DELIVERY,
    reservationDate: new Date("2026-04-18"),
    reservationTime: "11:30",
    deliveryAddress: "Pitkäkatu 22, 67100 Kokkola",
    status: ReservationStatus.PENDING,
    notes: "Please ring the doorbell, not the intercom.",
    products: [
      { name: "Cherry Tomatoes (Mixed)", quantity: 4 },
      { name: "Baby Cucumbers", quantity: 2 },
      { name: "Leafy Salad Mix", quantity: 3 },
    ],
  },
  {
    customerName: "Hanna Järvinen",
    customerEmail: "hanna.jarvinen@example.fi",
    customerPhone: "+358 40 777 8899",
    reservationType: ReservationType.PICKUP,
    reservationDate: new Date("2026-03-28"),
    reservationTime: "16:00",
    status: ReservationStatus.CANCELLED,
    notes: null,
    products: [
      { name: "Honeoye Strawberries", quantity: 1 },
    ],
  },
  {
    customerName: "Janne Heikkinen",
    customerEmail: "janne.heikkinen@example.fi",
    customerPhone: "+358 40 333 5566",
    reservationType: ReservationType.PICKUP,
    reservationDate: new Date("2026-04-20"),
    reservationTime: "13:00",
    status: ReservationStatus.CONFIRMED,
    notes: "Can I also get extra dill if available?",
    products: [
      { name: "New Potatoes (1 kg)", quantity: 3 },
      { name: "Fresh Dill Bunch", quantity: 1 },
      { name: "Garden Tomatoes", quantity: 2 },
    ],
  },
  {
    customerName: "Maria Leinonen",
    customerEmail: "maria.leinonen@example.fi",
    customerPhone: "+358 50 111 2233",
    reservationType: ReservationType.DELIVERY,
    reservationDate: new Date("2026-04-22"),
    reservationTime: "10:00",
    deliveryAddress: "Kauppatori 1, 67100 Kokkola",
    status: ReservationStatus.PENDING,
    notes: null,
    products: [
      { name: "Farm Vegetable Box", quantity: 2 },
    ],
  },
];

// ─── Seed main ───────────────────────────────────────────────────────────────

async function main() {
  console.log("🌱 Seeding database…");

  // Admin user
  const adminEmail = "admin@tabletickers.com";
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash: hashedPassword,
        role: UserRole.ADMIN,
      },
    });
    console.log("  ✓ Admin user created: admin@tabletickers.com / admin123");
  } else {
    console.log("  ✓ Admin user already exists");
  }

  // Products
  const productCount = await prisma.product.count();
  if (productCount > 0) {
    console.log(`  ✓ Products already seeded (${productCount} found)`);
  } else {
    for (const p of PRODUCTS) {
      const { images, ...productData } = p;
      await prisma.product.create({
        data: {
          ...productData,
          images: {
            create: images.map((url, index) => ({ url, isPrimary: index === 0 })),
          },
        },
      });
    }
    console.log(`  ✓ ${PRODUCTS.length} products created with images`);
  }

  // Reservations
  const reservationCount = await prisma.reservation.count();
  if (reservationCount > 0) {
    console.log(`  ✓ Reservations already seeded (${reservationCount} found)`);
  } else {
    for (const r of RESERVATIONS) {
      const { products, ...reservationData } = r;

      const createdReservation = await prisma.reservation.create({
        data: reservationData,
      });

      for (const item of products) {
        const product = await prisma.product.findFirst({
          where: { name: item.name },
          select: { id: true },
        });
        if (product) {
          await prisma.reservationItem.create({
            data: {
              reservationId: createdReservation.id,
              productId: product.id,
              quantity: item.quantity,
            },
          });
        }
      }
    }
    console.log(`  ✓ ${RESERVATIONS.length} reservations created with items`);
  }

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
