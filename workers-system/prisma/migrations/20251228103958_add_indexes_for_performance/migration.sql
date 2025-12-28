-- CreateIndex
CREATE INDEX "TaskClaim_status_idx" ON "TaskClaim"("status");

-- CreateIndex
CREATE INDEX "TaskClaim_employeeId_idx" ON "TaskClaim"("employeeId");

-- CreateIndex
CREATE INDEX "TaskClaim_submittedAt_idx" ON "TaskClaim"("submittedAt");

-- CreateIndex
CREATE INDEX "WorkAccount_employeeId_idx" ON "WorkAccount"("employeeId");

-- CreateIndex
CREATE INDEX "WorkAccount_status_idx" ON "WorkAccount"("status");

-- CreateIndex
CREATE INDEX "WorkAccount_assignedAt_idx" ON "WorkAccount"("assignedAt");
