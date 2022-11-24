/*
  Warnings:

  - Added the required column `user_discriminator` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "user_id" TEXT NOT NULL PRIMARY KEY,
    "user_name" TEXT NOT NULL,
    "user_discriminator" TEXT NOT NULL,
    "icon_url" TEXT
);
INSERT INTO "new_User" ("icon_url", "user_id", "user_name") SELECT "icon_url", "user_id", "user_name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
