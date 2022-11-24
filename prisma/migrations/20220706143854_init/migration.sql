/*
  Warnings:

  - You are about to drop the column `master` on the `Team` table. All the data in the column will be lost.
  - Added the required column `HOME` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Channel" (
    "channel_id" TEXT NOT NULL PRIMARY KEY,
    "channel_name" TEXT NOT NULL,
    "HOME" BOOLEAN NOT NULL,
    "guild_id" TEXT NOT NULL,
    CONSTRAINT "Channel_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild" ("guild_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Channel" ("channel_id", "channel_name", "guild_id") SELECT "channel_id", "channel_name", "guild_id" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new_Channel" RENAME TO "Channel";
CREATE TABLE "new_Team" (
    "team_name" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    "channel_id" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "Team_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild" ("guild_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Team_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel" ("channel_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Team" ("channel_id", "guild_id", "team_name") SELECT "channel_id", "guild_id", "team_name" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
CREATE UNIQUE INDEX "Team_channel_id_key" ON "Team"("channel_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
