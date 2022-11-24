-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Team" (
    "team_name" TEXT,
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
