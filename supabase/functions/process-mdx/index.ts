import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { filePath } = await req.json();
    
    if (!filePath) {
      return new Response(
        JSON.stringify({ error: 'File path is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse the file path to extract metadata
    const pathParts = filePath.split('/');
    if (pathParts.length < 4) {
      return new Response(
        JSON.stringify({ error: 'Invalid file path format. Expected format: YYYY/MM/DD/slug.mdx' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const year = pathParts[0];
    const month = pathParts[1];
    const day = pathParts[2];
    const slugWithExt = pathParts[3];
    const slug = slugWithExt.replace('.mdx', '');
    
    // Fetch file content from storage (assuming files are stored in storage)
    const { data, error } = await supabaseClient
      .storage
      .from('blog-content')
      .download(`${year}/${month}/${day}/${slugWithExt}`);
      
    if (error || !data) {
      return new Response(
        JSON.stringify({ error: 'File not found or inaccessible' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const content = await data.text();
    
    // Process the content (here we'd do MDX parsing, but we're keeping it simple)
    // In a real implementation, you might want to parse frontmatter, etc.
    
    return new Response(
      JSON.stringify({ content, slug, published_at: `${year}-${month}-${day}` }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
