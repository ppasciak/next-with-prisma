/*
  Warnings:

  - Added the required column `content` to the `PostComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PostComment` ADD COLUMN `content` VARCHAR(191) NOT NULL;
