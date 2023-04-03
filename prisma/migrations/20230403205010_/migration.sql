/*
  Warnings:

  - You are about to drop the column `userId` on the `Note` table. All the data in the column will be lost.
  - Added the required column `name` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "picture" TEXT;

-- CreateTable
CREATE TABLE "Present" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "image" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "body" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profilePicture" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Note" ("body", "createdAt", "id", "title", "updatedAt") SELECT "body", "createdAt", "id", "title", "updatedAt" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
