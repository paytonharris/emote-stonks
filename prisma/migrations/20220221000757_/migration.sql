/*
  Warnings:

  - You are about to drop the column `emote` on the `Investment` table. All the data in the column will be lost.
  - Added the required column `emoteId` to the `Investment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Investment` DROP COLUMN `emote`,
    ADD COLUMN `emoteId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Investment` ADD CONSTRAINT `Investment_emoteId_fkey` FOREIGN KEY (`emoteId`) REFERENCES `Emote`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
