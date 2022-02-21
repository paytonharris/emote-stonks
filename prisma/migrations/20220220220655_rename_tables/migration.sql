/*
  Warnings:

  - You are about to drop the `Emotes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Investments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Investments` DROP FOREIGN KEY `Investments_creatorId_fkey`;

-- DropTable
DROP TABLE `Emotes`;

-- DropTable
DROP TABLE `Investments`;

-- CreateTable
CREATE TABLE `Investment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `boughtAt` DATETIME(3) NOT NULL,
    `emote` VARCHAR(255) NOT NULL,
    `price` INTEGER NOT NULL,
    `creatorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Emote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emote` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `uses` INTEGER NOT NULL,

    UNIQUE INDEX `Emote_emote_key`(`emote`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Investment` ADD CONSTRAINT `Investment_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
