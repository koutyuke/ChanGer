-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Channel" (
    "channel_id" TEXT NOT NULL PRIMARY KEY,
    "channel_name" TEXT NOT NULL,
    "HOME" BOOLEAN NOT NULL,
    "guild_id" TEXT NOT NULL,
    CONSTRAINT "Channel_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild" ("guild_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Channel" ("HOME", "channel_id", "channel_name", "guild_id") SELECT "HOME", "channel_id", "channel_name", "guild_id" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new_Channel" RENAME TO "Channel";
CREATE TABLE "new_Member" (
    "member_id" TEXT NOT NULL,
    "nick_name" TEXT,
    "guild_id" TEXT NOT NULL,
    "channel_id" TEXT,
    "team_id" TEXT,

    PRIMARY KEY ("guild_id", "member_id"),
    CONSTRAINT "Member_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild" ("guild_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Member_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel" ("channel_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Member_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team" ("channel_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Member_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "User" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Member" ("channel_id", "guild_id", "member_id", "nick_name", "team_id") SELECT "channel_id", "guild_id", "member_id", "nick_name", "team_id" FROM "Member";
DROP TABLE "Member";
ALTER TABLE "new_Member" RENAME TO "Member";
CREATE TABLE "new_Team" (
    "team_name" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    "channel_id" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "Team_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild" ("guild_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Team_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel" ("channel_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Team" ("channel_id", "guild_id", "team_name") SELECT "channel_id", "guild_id", "team_name" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
CREATE UNIQUE INDEX "Team_channel_id_key" ON "Team"("channel_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
