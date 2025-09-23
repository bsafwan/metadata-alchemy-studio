import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const CustomAuditPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAuditPage = async () => {
      if (!slug) {
        setError("Invalid page URL");
        setLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from('custom_audit_pages')
          .select('html_content, client_name, expires_at')
          .eq('url_slug', slug)
          .gt('expires_at', new Date().toISOString())
          .maybeSingle();

        if (fetchError) {
          console.error('Error fetching audit page:', fetchError);
          setError("Failed to load audit page");
          return;
        }

        if (!data) {
          setError("Audit page not found or has expired");
          return;
        }

        setHtmlContent(data.html_content);
      } catch (err) {
        console.error('Error:', err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAuditPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading audit page...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-foreground mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <a 
            href="/" 
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Return to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-background"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default CustomAuditPage;