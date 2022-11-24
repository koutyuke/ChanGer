/*
  Warnings:

  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Member" (
    "member_id" TEXT NOT NULL,
    "nick_name" TEXT,
    "guild_id" TEXT NOT NULL,
    "channel_id" TEXT,
    "team_id" TEXT,
    "use" BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY ("guild_id", "member_id"),
    CONSTRAINT "Member_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "User" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Member_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild" ("guild_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Member_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel" ("channel_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Member_team_id_guild_id_fkey" FOREIGN KEY ("team_id", "guild_id") REFERENCES "Team" ("connect_channel_id", "guild_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Member" ("channel_id", "guild_id", "member_id", "nick_name", "team_id", "use") SELECT "channel_id", "guild_id", "member_id", "nick_name", "team_id", "use" FROM "Member";
DROP TABLE "Member";
ALTER TABLE "new_Member" RENAME TO "Member";
CREATE TABLE "new_Team" (
    "team_name" TEXT,
    "guild_id" TEXT NOT NULL,
    "connect_channel_id" TEXT NOT NULL,

    PRIMARY KEY ("guild_id", "connect_channel_id"),
    CONSTRAINT "Team_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild" ("guild_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Team_connect_channel_id_fkey" FOREIGN KEY ("connect_channel_id") REFERENCES "Channel" ("channel_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Team" ("connect_channel_id", "guild_id", "team_name") SELECT "connect_channel_id", "guild_id", "team_name" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
CREATE UNIQUE INDEX "Team_connect_channel_id_key" ON "Team"("connect_channel_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
