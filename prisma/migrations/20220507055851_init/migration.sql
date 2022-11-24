/*
  Warnings:

  - You are about to drop the column `team_name` on the `Team` table. All the data in the column will be lost.
  - Added the required column `guild_id` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Team" (
    "team_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guild_id" TEXT NOT NULL,
    "channel_id" TEXT NOT NULL,
    CONSTRAINT "Team_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild" ("guild_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Team_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel" ("channel_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Team" ("channel_id", "team_id") SELECT "channel_id", "team_id" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
CREATE UNIQUE INDEX "Team_channel_id_key" ON "Team"("channel_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
