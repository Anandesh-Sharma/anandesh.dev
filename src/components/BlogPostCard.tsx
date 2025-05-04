
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import type { BlogPost } from "@/types/blog";

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  // Generate the URL based on the published date and slug
  const postUrl = `/blog/${format(new Date(post.published_at), 'yyyy')}/${format(new Date(post.published_at), 'MM')}/${format(new Date(post.published_at), 'dd')}/${post.slug}`;
  
  return (
    <Link to={postUrl}>
      <Card className="h-full transition-all hover:shadow-md">
        <CardHeader>
          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              <time dateTime={post.published_at} className="text-xs">
                {format(new Date(post.published_at), 'MMM d, yyyy')}
              </time>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              <span className="text-xs">{post.read_time} min read</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-3 mb-4">
            {post.description}
          </CardDescription>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {post.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogPostCard;
