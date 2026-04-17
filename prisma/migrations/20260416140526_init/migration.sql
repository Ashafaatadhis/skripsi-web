/*
  Warnings:

  - You are about to drop the column `image_urls` on the `kosan` table. All the data in the column will be lost.
  - You are about to drop the column `booking_id` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `due_date` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `proof_image_urls` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `image_urls` on the `rooms` table. All the data in the column will be lost.
  - You are about to drop the `bookings` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[human_id]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `human_id` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `months_paid` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period_end` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period_start` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rental_id` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RentalStatus" AS ENUM ('active', 'cancelled', 'checked_out');

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_room_id_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_tenant_id_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_booking_id_fkey";

-- AlterTable
ALTER TABLE "kosan" DROP COLUMN "image_urls",
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "owners" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "booking_id",
DROP COLUMN "due_date",
DROP COLUMN "proof_image_urls",
ADD COLUMN     "human_id" TEXT NOT NULL,
ADD COLUMN     "months_paid" INTEGER NOT NULL,
ADD COLUMN     "period_end" DATE NOT NULL,
ADD COLUMN     "period_start" DATE NOT NULL,
ADD COLUMN     "rental_id" UUID NOT NULL,
ALTER COLUMN "paid_at" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "image_urls",
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "tenants" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(3);

-- DropTable
DROP TABLE "bookings";

-- DropEnum
DROP TYPE "BookingStatus";

-- CreateTable
CREATE TABLE "rentals" (
    "id" UUID NOT NULL,
    "human_id" TEXT NOT NULL,
    "room_id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "start_date" DATE NOT NULL,
    "monthly_price_snapshot" INTEGER NOT NULL,
    "paid_until" DATE,
    "checkout_date" DATE,
    "status" "RentalStatus" NOT NULL DEFAULT 'active',
    "note" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "rentals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "kosan_id" UUID,
    "room_id" UUID,
    "payment_id" UUID,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rentals_human_id_key" ON "rentals"("human_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_human_id_key" ON "payments"("human_id");

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_rental_id_fkey" FOREIGN KEY ("rental_id") REFERENCES "rentals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_kosan_id_fkey" FOREIGN KEY ("kosan_id") REFERENCES "kosan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
