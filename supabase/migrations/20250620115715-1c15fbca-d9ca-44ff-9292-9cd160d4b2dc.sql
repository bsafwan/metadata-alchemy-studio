
-- First, let's update any existing conversations that have null project_id
-- We'll associate them with the user's first project (or most recent project)
UPDATE conversations 
SET project_id = (
  SELECT p.id 
  FROM projects p 
  WHERE p.user_id = conversations.user_id 
  ORDER BY p.created_at DESC 
  LIMIT 1
)
WHERE project_id IS NULL;

-- Make project_id required for all future conversations
ALTER TABLE conversations 
ALTER COLUMN project_id SET NOT NULL;

-- Add a constraint to ensure project_id always references a valid project
ALTER TABLE conversations 
ADD CONSTRAINT fk_conversations_project_id 
FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;

-- Add an index for better performance when querying conversations by project
CREATE INDEX IF NOT EXISTS idx_conversations_project_id 
ON conversations(project_id);

-- Add an index for better performance when querying conversations by user and project
CREATE INDEX IF NOT EXISTS idx_conversations_user_project 
ON conversations(user_id, project_id);
