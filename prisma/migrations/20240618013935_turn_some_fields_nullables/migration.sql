-- AlterTable
ALTER TABLE `services` MODIFY `conclusion_comments` VARCHAR(191) NULL,
    MODIFY `fixed_at` DATETIME(3) NULL,
    MODIFY `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `updated_at` DATETIME(3) NULL;
