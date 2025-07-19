-- Enable pg_cron and pg_net extensions if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule the ICS file cleanup to run daily at 3 AM
SELECT cron.schedule(
  'cleanup-ics-files-daily',
  '0 3 * * *', -- Daily at 3 AM UTC
  $$
  SELECT
    net.http_post(
        url:='https://gemhywggtdryovqmalqh.supabase.co/functions/v1/cleanup-ics-files',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlbWh5d2dndGRyeW92cW1hbHFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNjQ4MzEsImV4cCI6MjA2NTk0MDgzMX0.PjNg5nqMq7qdPdw-PWNj-b0NtRYxgx9zpJSFdtL8Gig"}'::jsonb,
        body:=concat('{"time": "', now(), '"}')::jsonb
    ) as request_id;
  $$
);