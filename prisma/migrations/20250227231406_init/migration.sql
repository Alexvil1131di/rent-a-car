BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [lastName] NVARCHAR(1000) NOT NULL,
    [role] VARCHAR(50) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Client] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [lastName] NVARCHAR(1000) NOT NULL,
    [documentId] NVARCHAR(1000) NOT NULL,
    [phone] NVARCHAR(1000) NOT NULL,
    [address] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Client_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Client_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Client_documentId_key] UNIQUE NONCLUSTERED ([documentId]),
    CONSTRAINT [Client_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Vehicle] (
    [id] INT NOT NULL IDENTITY(1,1),
    [brand] NVARCHAR(1000) NOT NULL,
    [model] NVARCHAR(1000) NOT NULL,
    [year] INT NOT NULL,
    [licensePlate] NVARCHAR(1000) NOT NULL,
    [status] VARCHAR(50) NOT NULL,
    [dailyPrice] DECIMAL(32,16) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Vehicle_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Vehicle_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Vehicle_licensePlate_key] UNIQUE NONCLUSTERED ([licensePlate])
);

-- CreateTable
CREATE TABLE [dbo].[Reservation] (
    [id] INT NOT NULL IDENTITY(1,1),
    [clientId] INT NOT NULL,
    [vehicleId] INT NOT NULL,
    [startDate] DATETIME2 NOT NULL,
    [endDate] DATETIME2 NOT NULL,
    [totalCost] DECIMAL(32,16) NOT NULL,
    [status] VARCHAR(50) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Reservation_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Reservation_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Vehicle_brand_idx] ON [dbo].[Vehicle]([brand]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Vehicle_model_idx] ON [dbo].[Vehicle]([model]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Vehicle_year_idx] ON [dbo].[Vehicle]([year]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Vehicle_status_idx] ON [dbo].[Vehicle]([status]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Reservation_clientId_idx] ON [dbo].[Reservation]([clientId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Reservation_vehicleId_idx] ON [dbo].[Reservation]([vehicleId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Reservation_status_idx] ON [dbo].[Reservation]([status]);

-- AddForeignKey
ALTER TABLE [dbo].[Reservation] ADD CONSTRAINT [Reservation_clientId_fkey] FOREIGN KEY ([clientId]) REFERENCES [dbo].[Client]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Reservation] ADD CONSTRAINT [Reservation_vehicleId_fkey] FOREIGN KEY ([vehicleId]) REFERENCES [dbo].[Vehicle]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
