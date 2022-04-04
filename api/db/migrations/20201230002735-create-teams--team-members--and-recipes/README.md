# Migration `20201230002735-create-teams--team-members--and-recipes`

This migration has been generated by Brandon Noad at 12/29/2020, 8:27:35 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
)

CREATE TABLE "TeamMember" (
    "teamId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY ("teamId","userId")
)

CREATE TABLE "Recipe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teamId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "items" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201230002735-create-teams--team-members--and-recipes
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,39 @@
+datasource DS {
+  // optionally set multiple providers
+  // example: provider = ["sqlite", "postgresql"]
+  provider = "sqlite"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+  binaryTargets = "native"
+}
+
+model Team {
+  id Int @id @default(autoincrement())
+  name String
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+}
+
+model TeamMember {
+  team Team @relation(fields: [teamId], references: [id])
+  teamId Int
+  userId String
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  @@id([teamId, userId])
+}
+
+model Recipe {
+  id Int @id @default(autoincrement())
+  team Team @relation(fields: [teamId], references: [id])
+  teamId Int
+  name String
+  url String
+  // sqlite doesn't support Json yet so will need to parse/stringify manually.
+  items String
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+}
```

