-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "dataNasc" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Profile" (
    "profileId" TEXT NOT NULL PRIMARY KEY,
    "createdAtProfile" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bio" TEXT NOT NULL,
    "metaEstudos" TEXT NOT NULL,
    "qtdExp" INTEGER NOT NULL,
    CONSTRAINT "Profile_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cursos" (
    "cursoId" TEXT NOT NULL PRIMARY KEY,
    "createdAtCursos" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numAulas" INTEGER NOT NULL,
    "numProvas" TEXT NOT NULL,
    "temCertificado" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Cursos_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CursosAcao" (
    "acaoId" TEXT NOT NULL PRIMARY KEY,
    "createdAtCursos" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "titulo" TEXT NOT NULL,
    "nivelCurso" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "CursosAcao_acaoId_fkey" FOREIGN KEY ("acaoId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");
