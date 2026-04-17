/*
  Warnings:

  - The primary key for the `bookings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `kosan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `owners` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `payments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `rooms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tenants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `bookings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `room_id` on the `bookings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tenant_id` on the `bookings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `kosan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `owner_id` on the `kosan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `owners` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `payments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `booking_id` on the `payments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `rooms` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `kosan_id` on the `rooms` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `tenants` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_room_id_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_tenant_id_fkey";

-- DropForeignKey
ALTER TABLE "kosan" DROP CONSTRAINT "kosan_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_booking_id_fkey";

-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_kosan_id_fkey";

-- AlterTable
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "room_id",
ADD COLUMN     "room_id" UUID NOT NULL,
DROP COLUMN "tenant_id",
ADD COLUMN     "tenant_id" UUID NOT NULL,
ADD CONSTRAINT "bookings_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "kosan" DROP CONSTRAINT "kosan_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "owner_id",
ADD COLUMN     "owner_id" UUID NOT NULL,
ADD CONSTRAINT "kosan_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "owners" DROP CONSTRAINT "owners_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "owners_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "payments" DROP CONSTRAINT "payments_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "booking_id",
ADD COLUMN     "booking_id" UUID NOT NULL,
ADD CONSTRAINT "payments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_pkey",
ADD COLUMN     "facilities" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "kosan_id",
ADD COLUMN     "kosan_id" UUID NOT NULL,
ADD CONSTRAINT "rooms_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tenants" DROP CONSTRAINT "tenants_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "telegram_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "tenants_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "kosan" ADD CONSTRAINT "kosan_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_kosan_id_fkey" FOREIGN KEY ("kosan_id") REFERENCES "kosan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
