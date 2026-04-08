const { PrismaClient } = require('./node_modules/.prisma/client/index.js');
const prisma = new PrismaClient();

prisma.reservationItem.count()
  .then((count) => {
    console.log('reservationItem count:', count);
  })
  .catch((error) => {
    console.error('reservationItem count error:', error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
