/*
  Warnings:

  - Added the required column `input_type` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `services` ADD COLUMN `input_type` VARCHAR(191) NOT NULL;
