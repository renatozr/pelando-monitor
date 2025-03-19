-- CreateTable
CREATE TABLE "Monitor" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "searchSlug" TEXT NOT NULL,
    "targetTemperature" INTEGER NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Monitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonitorRecipient" (
    "monitorId" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,

    CONSTRAINT "MonitorRecipient_pkey" PRIMARY KEY ("monitorId","recipient")
);

-- CreateIndex
CREATE UNIQUE INDEX "Monitor_searchSlug_key" ON "Monitor"("searchSlug");

-- AddForeignKey
ALTER TABLE "MonitorRecipient" ADD CONSTRAINT "MonitorRecipient_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "Monitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
