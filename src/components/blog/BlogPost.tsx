import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPostBySlug } from "@/lib/blog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { MDXProvider } from "@mdx-js/react";
import * as runtime from "react/jsx-runtime";
import type { BlogPost as BlogPostType } from "@/lib/blog";
import CodeBlock from "./CodeBlock";

// Create MDX Components map
const components = {
  code: ({ className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    
    // Only use CodeBlock for code blocks, not inline code
    if (!match) {
      // This is inline code
      return (
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      );
    }
    
    // For code blocks, use our custom component
    return (
      <CodeBlock className={className}>
        {children}
      </CodeBlock>
    );
  }
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mdxContent, setMdxContent] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      try {
        const fetchedPost = await getPostBySlug(slug);
        setPost(fetchedPost);
        
        // If we have compiled content, evaluate it
        if (fetchedPost?.compiledContent) {
          try {
            // Use dynamic import to evaluate the MDX content
            const { evaluate } = await import('@mdx-js/mdx');
            const { default: Content } = await evaluate(fetchedPost.compiledContent, {
              ...runtime,
              baseUrl: import.meta.url
            });
            setMdxContent(() => Content);
          } catch (evalError) {
            console.error("Error evaluating MDX:", evalError);
          }
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (isLoading) {
    return <BlogPostSkeleton />;
  }

  if (!post) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The blog post you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate("/blog")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
      </div>
    );
  }

  // Generate author initials for avatar fallback
  const authorInitials = post.author
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <article className="container mx-auto py-8 max-w-4xl">
      <Link to="/blog" className="inline-block mb-6">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all posts
        </Button>
      </Link>

      <div className="mb-8">
        {post.image && (
          <div className="mb-6 rounded-lg overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={`https://ui-avatars.com/api/?name=${post.author}&background=random`} />
              <AvatarFallback>{authorInitials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{post.author}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{post.formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="prose dark:prose-invert prose-lg max-w-none">
        {mdxContent ? (
          <MDXProvider components={components}>
            {mdxContent}
          </MDXProvider>
        ) : (
          <ReactMarkdown 
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeHighlight, rehypeKatex]}
            components={{
              code({ node, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                
                // Only use CodeBlock for code blocks, not inline code
                if (!match) {
                  // This is inline code
                  return (
                    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                      {children}
                    </code>
                  );
                }
                
                // For code blocks, use our custom component
                return (
                  <CodeBlock className={className}>
                    {children}
                  </CodeBlock>
                );
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        )}
      </div>
    </article>
  );
}

function BlogPostSkeleton() {
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-8">
        <Skeleton className="h-[400px] w-full rounded-lg mb-6" />
        <Skeleton className="h-12 w-3/4 mb-4" />
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-6 w-24" />
          </div>
          
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
      </div>
      
      <div className="space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
      </div>
    </div>
  );
} 