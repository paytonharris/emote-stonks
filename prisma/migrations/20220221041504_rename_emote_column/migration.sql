/*
  Warnings:

  - You are about to drop the column `emote` on the `Emote` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Emote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Emote` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Emote_emote_key` ON `Emote`;

-- AlterTable
ALTER TABLE `Emote` DROP COLUMN `emote`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Emote_name_key` ON `Emote`(`name`);
