-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "category_name" TEXT NOT NULL,
    "category_id" TEXT NOT NULL PRIMARY KEY,
    "guild_id" TEXT NOT NULL,
    CONSTRAINT "Category_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild" ("guild_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Category" ("category_id", "category_name", "guild_id") SELECT "category_id", "category_name", "guild_id" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
