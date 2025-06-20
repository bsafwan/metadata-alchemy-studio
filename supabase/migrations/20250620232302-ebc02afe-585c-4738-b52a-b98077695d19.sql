
-- Add RLS policies for delivery_items table
CREATE POLICY "Admins can insert delivery items" ON public.delivery_items
    FOR INSERT WITH CHECK (true); -- This allows database functions/triggers to insert

CREATE POLICY "Admins can update delivery items" ON public.delivery_items
    FOR UPDATE USING (true);

CREATE POLICY "Admins can delete delivery items" ON public.delivery_items
    FOR DELETE USING (true);

-- Add RLS policies for project_deliveries table
CREATE POLICY "System can insert project deliveries" ON public.project_deliveries
    FOR INSERT WITH CHECK (true); -- This allows database triggers to insert

CREATE POLICY "Admins can update project deliveries" ON public.project_deliveries
    FOR UPDATE USING (true);

CREATE POLICY "Admins can delete project deliveries" ON public.project_deliveries
    FOR DELETE USING (true);

-- Add RLS policies for project_api_keys table
CREATE POLICY "Users can insert their project api keys" ON public.project_api_keys
    FOR INSERT WITH CHECK (
        project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())
    );

CREATE POLICY "Admins can insert any project api keys" ON public.project_api_keys
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their project api keys" ON public.project_api_keys
    FOR UPDATE USING (
        project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())
    );

CREATE POLICY "Admins can update any project api keys" ON public.project_api_keys
    FOR UPDATE USING (true);

CREATE POLICY "Users can delete their project api keys" ON public.project_api_keys
    FOR DELETE USING (
        project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())
    );

CREATE POLICY "Admins can delete any project api keys" ON public.project_api_keys
    FOR DELETE USING (true);
