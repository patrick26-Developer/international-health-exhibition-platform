/*
  Warnings:

  - You are about to drop the column `maxBenevoles` on the `editions` table. All the data in the column will be lost.
  - You are about to drop the column `maxExposants` on the `editions` table. All the data in the column will be lost.
  - You are about to drop the column `maxVisiteurs` on the `editions` table. All the data in the column will be lost.
  - You are about to drop the column `estPaye` on the `exposants` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "StatutEdition" ADD VALUE 'BROUILLON';
ALTER TYPE "StatutEdition" ADD VALUE 'INSCRIPTIONS_OUVERTES';
ALTER TYPE "StatutEdition" ADD VALUE 'INSCRIPTIONS_FERMEES';

-- AlterTable
ALTER TABLE "benevoles" ADD COLUMN     "experience" TEXT,
ADD COLUMN     "motivation" TEXT;

-- AlterTable
ALTER TABLE "editions" DROP COLUMN "maxBenevoles",
DROP COLUMN "maxExposants",
DROP COLUMN "maxVisiteurs",
ADD COLUMN     "capaciteEstimeeBenevoles" INTEGER,
ADD COLUMN     "capaciteEstimeeExposants" INTEGER,
ADD COLUMN     "capaciteEstimeeVisiteurs" INTEGER,
ADD COLUMN     "dateFinInscriptions" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "exposants" DROP COLUMN "estPaye",
ADD COLUMN     "motifRefus" TEXT;
