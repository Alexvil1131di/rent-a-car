BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Client] ADD [deletedAt] DATETIME2;

-- AlterTable
ALTER TABLE [dbo].[Reservation] ADD [deletedAt] DATETIME2;

-- AlterTable
ALTER TABLE [dbo].[User] ADD [deletedAt] DATETIME2;

-- AlterTable
ALTER TABLE [dbo].[Vehicle] ADD [deletedAt] DATETIME2;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
