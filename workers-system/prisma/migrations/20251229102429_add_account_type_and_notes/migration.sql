-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('Outlier', 'Handshake');

-- AlterTable
ALTER TABLE "WorkAccount" ADD COLUMN     "accountType" "AccountType" NOT NULL DEFAULT 'Outlier',
ADD COLUMN     "notes" TEXT;
