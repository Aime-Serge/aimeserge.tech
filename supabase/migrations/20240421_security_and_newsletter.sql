-- Migration: Security Logs and Newsletter Opt-in
-- Date: 2026-04-21

-- 1. Add missing newsletter column to contacts table if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contacts' AND column_name='newsletter_opt_in') THEN
        ALTER TABLE contacts ADD COLUMN newsletter_opt_in BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- 2. Create Security Logs table for Audit Shield
CREATE TABLE IF NOT EXISTS security_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL, 
  user_email TEXT,
  ip_address TEXT,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}',
  severity TEXT DEFAULT 'INFO',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable RLS and setup Policies
ALTER TABLE security_logs ENABLE ROW LEVEL SECURITY;

-- Only allow authenticated admin to view logs
-- Note: Replace 'admin@example.com' with your actual admin email or use an environment check
CREATE POLICY "Admin Read Access" ON security_logs
FOR SELECT USING (
  auth.role() = 'service_role' OR auth.jwt()->>'email' = current_setting('app.admin_email', true)
);

-- 4. Knowledge Table for RAG (Ensure it exists for Phase 2)
CREATE TABLE IF NOT EXISTS knowledge (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  metadata JSONB,
  embedding VECTOR(1536) -- Requires pgvector extension
);

-- Enable Realtime for feature parity
ALTER PUBLICATION supabase_realtime ADD TABLE security_logs;
