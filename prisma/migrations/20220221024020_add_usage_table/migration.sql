/*
  Warnings:

  - You are about to drop the column `date` on the `Emote` table. All the data in the column will be lost.
  - You are about to drop the column `uses` on the `Emote` table. All the data in the column will be lost.
  - Added the required column `picture` to the `Emote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Emote` DROP COLUMN `date`,
    DROP COLUMN `uses`,
    ADD COLUMN `picture` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `EmoteUsage` (
    `date` DATETIME(3) NOT NULL,
    `emoteId` INTEGER NOT NULL,
    `uses` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`date`, `emoteId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EmoteUsage` ADD CONSTRAINT `EmoteUsage_emoteId_fkey` FOREIGN KEY (`emoteId`) REFERENCES `Emote`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
