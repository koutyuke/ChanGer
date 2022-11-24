-- CreateTable
CREATE TABLE "Team" (
    "team_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "team_name" TEXT NOT NULL,
    "channel_id" TEXT NOT NULL,
    CONSTRAINT "Team_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel" ("channel_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Member_Id" (
    "member_id" TEXT NOT NULL PRIMARY KEY,
    "guild_id" TEXT NOT NULL,
    "channel_id" TEXT,
    "team_id" INTEGER,
    CONSTRAINT "Member_Id_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild" ("guild_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Member_Id_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel" ("channel_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Member_Id_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team" ("team_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Member_Id" ("channel_id", "guild_id", "member_id") SELECT "channel_id", "guild_id", "member_id" FROM "Member_Id";
DROP TABLE "Member_Id";
ALTER TABLE "new_Member_Id" RENAME TO "Member_Id";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Team_channel_id_key" ON "Team"("channel_id");
