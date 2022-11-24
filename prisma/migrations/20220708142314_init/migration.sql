/*
  Warnings:

  - Added the required column `category_id` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Category" (
    "category_name" TEXT NOT NULL,
    "category_id" TEXT NOT NULL PRIMARY KEY
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Channel" (
    "channel_id" TEXT NOT NULL PRIMARY KEY,
    "channel_name" TEXT NOT NULL,
    "HOME" BOOLEAN NOT NULL,
    "guild_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    CONSTRAINT "Channel_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild" ("guild_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Channel_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("category_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Channel" ("HOME", "channel_id", "channel_name", "guild_id") SELECT "HOME", "channel_id", "channel_name", "guild_id" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new_Channel" RENAME TO "Channel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
