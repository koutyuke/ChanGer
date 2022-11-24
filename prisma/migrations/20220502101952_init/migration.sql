/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Guild` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Channel` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guild_name` to the `Guild` table without a default value. This is not possible if the table is not empty.
  - Added the required column `channee_name` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "user_id" TEXT NOT NULL PRIMARY KEY,
    "user_name" TEXT NOT NULL,
    "icon_url" TEXT NOT NULL
);
INSERT INTO "new_User" ("icon_url") SELECT "icon_url" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE TABLE "new_Nick_Name" (
    "user_id" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    "nick_name" TEXT,

    PRIMARY KEY ("user_id", "guild_id"),
    CONSTRAINT "Nick_Name_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Nick_Name" ("guild_id", "nick_name", "user_id") SELECT "guild_id", "nick_name", "user_id" FROM "Nick_Name";
DROP TABLE "Nick_Name";
ALTER TABLE "new_Nick_Name" RENAME TO "Nick_Name";
CREATE TABLE "new_Guild" (
    "guild_id" TEXT NOT NULL PRIMARY KEY,
    "guild_name" TEXT NOT NULL,
    "icon_url" TEXT NOT NULL
);
INSERT INTO "new_Guild" ("guild_id", "icon_url") SELECT "guild_id", "icon_url" FROM "Guild";
DROP TABLE "Guild";
ALTER TABLE "new_Guild" RENAME TO "Guild";
CREATE TABLE "new_Channel" (
    "channel_id" TEXT NOT NULL PRIMARY KEY,
    "channee_name" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    CONSTRAINT "Channel_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild" ("guild_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Channel" ("channel_id", "guild_id") SELECT "channel_id", "guild_id" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new_Channel" RENAME TO "Channel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
