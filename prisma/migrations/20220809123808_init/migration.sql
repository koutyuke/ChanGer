/*
  Warnings:

  - You are about to drop the `Setting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Setting";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guild" (
    "guild_id" TEXT NOT NULL PRIMARY KEY,
    "guild_name" TEXT NOT NULL,
    "icon_url" TEXT NOT NULL,
    "all_member" BOOLEAN NOT NULL DEFAULT true,
    "all_channel" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Guild" ("guild_id", "guild_name", "icon_url") SELECT "guild_id", "guild_name", "icon_url" FROM "Guild";
DROP TABLE "Guild";
ALTER TABLE "new_Guild" RENAME TO "Guild";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
