/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Crud` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Crud_name_key" ON "Crud"("name");
