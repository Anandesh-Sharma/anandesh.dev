
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { BlogPost } from "@/types/blog";
import { Card } from "@/components/ui/card";

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

  // Custom components for React Markdown
  const components = {
    code({node, inline, className, children, ...props}: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={nord}
          language={match[1]}
          PreTag="div"
          className="rounded-md my-4"
          showLineNumbers={true}
          wrapLines={true}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      );
    },
    img({node, ...props}: any) {
      // Skip rendering if src is empty or a placeholder
      if (!props.src || props.src.includes('placeholder.svg')) {
        return null;
      }
      return (
        <div className="my-8">
          <img 
            {...props} 
            className="rounded-lg mx-auto max-w-full shadow-md" 
            alt={props.alt || 'Blog image'} 
          />
        </div>
      );
    },
    h1({node, ...props}: any) {
      return <h2 className="text-3xl font-bold mt-12 mb-4" {...props} />;
    },
    h2({node, ...props}: any) {
      return <h3 className="text-2xl font-bold mt-8 mb-4" {...props} />;
    },
    p({node, ...props}: any) {
      return <p className="my-4 leading-7 text-muted-foreground" {...props} />;
    }
  };

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
        <Card className="max-w-3xl mx-auto p-8 shadow-lg">
          <article className="prose prose-lg dark:prose-invert">
            <Link to="/blog">
              <Button variant="ghost" size="sm" className="mb-4">
                ← Back to Blog
              </Button>
            </Link>
            
            <h1 className="text-4xl font-bold mb-6 leading-tight">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <time dateTime={post.published_at} className="text-muted-foreground">
                  {format(new Date(post.published_at), 'MMMM d, yyyy')}
                </time>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {post.read_time} min read
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  By {post.author}
                </span>
              </div>
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-primary/10">{tag}</Badge>
                ))}
              </div>
            )}
            
            <Separator className="mb-8" />
            
            <div className="blog-content">
              <ReactMarkdown 
                components={components}
                rehypePlugins={[rehypeHighlight]}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
