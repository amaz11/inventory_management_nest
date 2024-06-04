/*
  Warnings:

  - You are about to drop the column `productId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `categoyId` on the `SubCategory` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `SubCategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "SubCategory" DROP COLUMN "categoyId",
DROP COLUMN "productId";
