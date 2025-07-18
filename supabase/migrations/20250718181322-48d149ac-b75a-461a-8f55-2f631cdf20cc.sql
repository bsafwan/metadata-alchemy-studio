-- Enable required extensions for cron jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Schedule cron job to run every minute to check for meetings needing reminders
-- This will invoke the meeting-reminder-cron edge function
SELECT cron.schedule(
  'meeting-reminder-check',
  '* * * * *', -- every minute
  $$
  SELECT net.http_post(
    url := 'https://gemhywggtdryovqmalqh.supabase.co/functions/v1/meeting-reminder-cron',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlbWh5d2dndGRyeW92cW1hbHFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNjQ4MzEsImV4cCI6MjA2NTk0MDgzMX0.PjNg5nqMq7qdPdw-PWNj-b0NtRYxgx9zpJSFdtL8Gig"}'::jsonb,
    body := jsonb_build_object('timestamp', now())
  ) as request_id;
  $$
);