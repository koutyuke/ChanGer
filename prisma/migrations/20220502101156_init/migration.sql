/*
  Warnings:

  - The primary key for the `Channel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `guildId` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Channel` table. All the data in the column will be lost.
  - The primary key for the `Guild` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Guild` table. All the data in the column will be lost.
  - Added the required column `channel_id` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guild_id` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guild_id` to the `Guild` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Channel" (
    "channel_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    CONSTRAINT "Channel_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild" ("guild_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Channel" ("name") SELECT "name" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new_Channel" RENAME TO "Channel";
CREATE TABLE "new_Guild" (
    "guild_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "icon_url" TEXT NOT NULL
);
INSERT INTO "new_Guild" ("icon_url", "name") SELECT "icon_url", "name" FROM "Guild";
DROP TABLE "Guild";
ALTER TABLE "new_Guild" RENAME TO "Guild";
CREATE TABLE "new_Member_Id" (
    "member_id" TEXT NOT NULL PRIMARY KEY,
    "guild_id" TEXT NOT NULL,
    "channel_id" TEXT,
    CONSTRAINT "Member_Id_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild" ("guild_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Member_Id_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel" ("channel_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Member_Id" ("channel_id", "guild_id", "member_id") SELECT "channel_id", "guild_id", "member_id" FROM "Member_Id";
DROP TABLE "Member_Id";
ALTER TABLE "new_Member_Id" RENAME TO "Member_Id";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
