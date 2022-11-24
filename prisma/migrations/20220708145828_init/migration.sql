/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Channel" (
    "channel_id" TEXT NOT NULL PRIMARY KEY,
    "channel_name" TEXT NOT NULL,
    "HOME" BOOLEAN NOT NULL,
    "guild_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    CONSTRAINT "Channel_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild" ("guild_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Channel_category_id_guild_id_fkey" FOREIGN KEY ("category_id", "guild_id") REFERENCES "Category" ("category_id", "guild_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Channel" ("HOME", "category_id", "channel_id", "channel_name", "guild_id") SELECT "HOME", "category_id", "channel_id", "channel_name", "guild_id" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new_Channel" RENAME TO "Channel";
CREATE TABLE "new_Category" (
    "category_name" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,

    PRIMARY KEY ("category_id", "guild_id"),
    CONSTRAINT "Category_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild" ("guild_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Category" ("category_id", "category_name", "guild_id") SELECT "category_id", "category_name", "guild_id" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
