-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_productId_fkey";

-- DropForeignKey
ALTER TABLE "Delivery" DROP CONSTRAINT "Delivery_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_unitsId_fkey";

-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_categoyId_fkey";

-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_productId_fkey";

-- DropForeignKey
ALTER TABLE "Support" DROP CONSTRAINT "Support_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Support" DROP CONSTRAINT "Support_customerId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "unitsId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_AdminToSupport" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CustomerToDelivery" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CustomerToSupport" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToSubCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToSubCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AdminToSupport_AB_unique" ON "_AdminToSupport"("A", "B");

-- CreateIndex
CREATE INDEX "_AdminToSupport_B_index" ON "_AdminToSupport"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CustomerToDelivery_AB_unique" ON "_CustomerToDelivery"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomerToDelivery_B_index" ON "_CustomerToDelivery"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CustomerToSupport_AB_unique" ON "_CustomerToSupport"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomerToSupport_B_index" ON "_CustomerToSupport"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToSubCategory_AB_unique" ON "_ProductToSubCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToSubCategory_B_index" ON "_ProductToSubCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToProduct_AB_unique" ON "_CategoryToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToProduct_B_index" ON "_CategoryToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToSubCategory_AB_unique" ON "_CategoryToSubCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToSubCategory_B_index" ON "_CategoryToSubCategory"("B");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_unitsId_fkey" FOREIGN KEY ("unitsId") REFERENCES "Units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminToSupport" ADD CONSTRAINT "_AdminToSupport_A_fkey" FOREIGN KEY ("A") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminToSupport" ADD CONSTRAINT "_AdminToSupport_B_fkey" FOREIGN KEY ("B") REFERENCES "Support"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToDelivery" ADD CONSTRAINT "_CustomerToDelivery_A_fkey" FOREIGN KEY ("A") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToDelivery" ADD CONSTRAINT "_CustomerToDelivery_B_fkey" FOREIGN KEY ("B") REFERENCES "Delivery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToSupport" ADD CONSTRAINT "_CustomerToSupport_A_fkey" FOREIGN KEY ("A") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToSupport" ADD CONSTRAINT "_CustomerToSupport_B_fkey" FOREIGN KEY ("B") REFERENCES "Support"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSubCategory" ADD CONSTRAINT "_ProductToSubCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSubCategory" ADD CONSTRAINT "_ProductToSubCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "SubCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToSubCategory" ADD CONSTRAINT "_CategoryToSubCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToSubCategory" ADD CONSTRAINT "_CategoryToSubCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "SubCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
