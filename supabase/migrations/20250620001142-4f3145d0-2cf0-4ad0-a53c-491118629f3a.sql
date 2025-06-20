
-- Add a column to track if this is the user's first project setup
ALTER TABLE public.users 
ADD COLUMN has_completed_initial_setup BOOLEAN NOT NULL DEFAULT false;

-- Add project selection tracking
ALTER TABLE public.projects 
ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true;

-- Create an index for better performance when finding active projects
CREATE INDEX idx_projects_user_active ON public.projects(user_id, is_active);
