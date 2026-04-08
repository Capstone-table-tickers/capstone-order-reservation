/*
  Warnings:

  - You are about to drop the column `date` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `partySize` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `reservationDate` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reservationTime` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReservationType" AS ENUM ('PICKUP', 'DELIVERY');

-- AlterEnum
ALTER TYPE "ReservationStatus" ADD VALUE 'COMPLETED';

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "date",
DROP COLUMN "partySize",
ADD COLUMN     "deliveryAddress" TEXT,
ADD COLUMN     "reservationDate" DATE NOT NULL,
ADD COLUMN     "reservationTime" TEXT NOT NULL,
ADD COLUMN     "reservationType" "ReservationType" NOT NULL DEFAULT 'PICKUP',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
