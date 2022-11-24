/*
  Warnings:

  - You are about to drop the `Member_Id` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Member_Id";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Member" (
    "member_id" TEXT NOT NULL,
    "nick_name" TEXT,
    "guild_id" TEXT NOT NULL,
    "channel_id" TEXT,
    "team_id" TEXT,

    PRIMARY KEY ("guild_id", "member_id"),
    CONSTRAINT "Member_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild" ("guild_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Member_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel" ("channel_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Member_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team" ("channel_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Member_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
