/*
  Warnings:

  - Added the required column `guild_id` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "category_name" TEXT NOT NULL,
    "category_id" TEXT NOT NULL PRIMARY KEY,
    "guild_id" TEXT NOT NULL,
    CONSTRAINT "Category_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "Guild" ("guild_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Category" ("category_id", "category_name") SELECT "category_id", "category_name" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
