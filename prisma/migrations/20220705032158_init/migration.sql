/*
  Warnings:

  - You are about to drop the `Nick_Name` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `team_id` on the `Team` table. All the data in the column will be lost.
  - Added the required column `master` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_name` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Nick_Name";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Member_Id" (
    "member_id" TEXT NOT NULL PRIMARY KEY,
    "nick_name" TEXT,
    "guild_id" TEXT NOT NULL,
    "channel_id" TEXT,
    "team_id" TEXT,
    CONSTRAINT "Member_Id_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild" ("guild_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Member_Id_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel" ("channel_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Member_Id_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team" ("channel_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Member_Id" ("channel_id", "guild_id", "member_id", "team_id") SELECT "channel_id", "guild_id", "member_id", "team_id" FROM "Member_Id";
DROP TABLE "Member_Id";
ALTER TABLE "new_Member_Id" RENAME TO "Member_Id";
CREATE TABLE "new_Team" (
    "team_name" TEXT NOT NULL,
    "master" BOOLEAN NOT NULL,
    "guild_id" TEXT NOT NULL,
    "channel_id" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "Team_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild" ("guild_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Team_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel" ("channel_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Team" ("channel_id", "guild_id") SELECT "channel_id", "guild_id" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
CREATE UNIQUE INDEX "Team_channel_id_key" ON "Team"("channel_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
