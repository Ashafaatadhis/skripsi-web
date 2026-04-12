/*
  Warnings:

  - You are about to drop the column `room_id` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `tenant_id` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `rooms` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[human_id]` on the table `kosan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[human_id]` on the table `rooms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `human_id` to the `kosan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `booking_id` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `human_id` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('active', 'completed', 'cancelled');

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_room_id_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_tenant_id_fkey";

-- AlterTable
ALTER TABLE "kosan" ADD COLUMN     "human_id" TEXT NOT NULL,
ADD COLUMN     "image_urls" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "room_id",
DROP COLUMN "tenant_id",
ADD COLUMN     "booking_id" TEXT NOT NULL,
ADD COLUMN     "proof_image_urls" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "status",
ADD COLUMN     "human_id" TEXT NOT NULL,
ADD COLUMN     "image_urls" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;

-- DropEnum
DROP TYPE "RoomStatus";

-- CreateTable
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "status" "BookingStatus" NOT NULL DEFAULT 'active',
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "kosan_human_id_key" ON "kosan"("human_id");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_human_id_key" ON "rooms"("human_id");

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
