/*
  Warnings:

  - You are about to drop the column `channee_name` on the `Channel` table. All the data in the column will be lost.
  - Added the required column `channel_name` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Channel" (
    "channel_id" TEXT NOT NULL PRIMARY KEY,
    "channel_name" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    CONSTRAINT "Channel_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild" ("guild_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Channel" ("channel_id", "guild_id") SELECT "channel_id", "guild_id" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new_Channel" RENAME TO "Channel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
