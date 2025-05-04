
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
// Remove direct imports of remark-gfm and rehype-highlight
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { BlogPost } from "@/types/blog";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .single();
          
        if (error) throw error;
        setPost(data as BlogPost);
      } catch (error) {
        console.error('Error fetching post:', error);
        toast({
          title: "Post not found",
          description: "The blog post you're looking for doesn't exist or has been removed",
          variant: "destructive",
        });
        navigate('/blog');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (slug) {
      fetchPost();
    }
  }, [slug, navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container py-12">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse">
              <div className="h-10 bg-muted rounded-md w-3/4 mb-6"></div>
              <div className="h-6 bg-muted rounded-md w-1/4 mb-12"></div>
              <div className="h-4 bg-muted rounded-md w-full mb-4"></div>
              <div className="h-4 bg-muted rounded-md w-full mb-4"></div>
              <div className="h-4 bg-muted rounded-md w-3/4 mb-4"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-12">
        <article className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
          <Link to="/blog">
            <Button variant="ghost" size="sm" className="mb-8">
              ← Back to Blog
            </Button>
          </Link>
          
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <time dateTime={post.published_at} className="text-muted-foreground text-sm">
                {format(new Date(post.published_at), 'MMMM d, yyyy')}
              </time>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground text-sm">
                {post.read_time} min read
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground text-sm">
                By {post.author}
              </span>
            </div>
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">{tag}</Badge>
              ))}
            </div>
          )}
          
          <Separator className="mb-8" />
          
          <div className="blog-content">
            <ReactMarkdown>
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
