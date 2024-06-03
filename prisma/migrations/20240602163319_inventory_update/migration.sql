/*
  Warnings:

  - You are about to alter the column `name` on the `Admin` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - The `role` column on the `Admin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `name` on the `Customer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - The `role` column on the `Customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `transferStatus` on the `Transfer` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `Units` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to drop the `_CustomerToDelivery` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nid]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Provider` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Provider` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nid]` on the table `Provider` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `blocked` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blocked` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accepted` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blocked` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transferStatusId` to the `Transfer` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Units` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('SUPERADMIN', 'ADMIN', 'USER', 'RIDER');

-- DropForeignKey
ALTER TABLE "_CustomerToDelivery" DROP CONSTRAINT "_CustomerToDelivery_A_fkey";

-- DropForeignKey
ALTER TABLE "_CustomerToDelivery" DROP CONSTRAINT "_CustomerToDelivery_B_fkey";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "blocked" BOOLEAN NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
DROP COLUMN "role",
ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'SUPERADMIN';

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "blocked" BOOLEAN NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
DROP COLUMN "role",
ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "manufacturedDate" DROP NOT NULL,
ALTER COLUMN "expriredDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Provider" ADD COLUMN     "accepted" BOOLEAN NOT NULL,
ADD COLUMN     "blocked" BOOLEAN NOT NULL,
ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'RIDER';

-- AlterTable
ALTER TABLE "Transfer" DROP COLUMN "transferStatus",
ADD COLUMN     "transferStatusId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Units" ALTER COLUMN "name" SET DATA TYPE VARCHAR(20),
DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "_CustomerToDelivery";

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "update_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_phone_key" ON "Admin"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_nid_key" ON "Admin"("nid");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phone_key" ON "Customer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_phone_key" ON "Provider"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_email_key" ON "Provider"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_nid_key" ON "Provider"("nid");

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_transferStatusId_fkey" FOREIGN KEY ("transferStatusId") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
