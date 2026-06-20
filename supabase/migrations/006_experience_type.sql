-- Add type column to experience table
ALTER TABLE experience ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'role' CHECK (type IN ('role', 'certification', 'milestone', 'future'));
