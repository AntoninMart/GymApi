-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pseudo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Seances" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nom" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Seances_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Exercices" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "groupeMusculaireId" INTEGER NOT NULL,
    CONSTRAINT "Exercices_groupeMusculaireId_fkey" FOREIGN KEY ("groupeMusculaireId") REFERENCES "GroupeMusculaire" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SeanceExercice" (
    "exercicesId" INTEGER NOT NULL,
    "seancesId" INTEGER NOT NULL,
    "nbSerie" INTEGER NOT NULL,

    PRIMARY KEY ("exercicesId", "seancesId"),
    CONSTRAINT "SeanceExercice_exercicesId_fkey" FOREIGN KEY ("exercicesId") REFERENCES "Exercices" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SeanceExercice_seancesId_fkey" FOREIGN KEY ("seancesId") REFERENCES "Seances" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GroupeMusculaire" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_pseudo_key" ON "User"("pseudo");
