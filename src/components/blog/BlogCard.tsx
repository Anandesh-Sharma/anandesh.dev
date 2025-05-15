import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BlogPostMeta } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPostMeta;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { slug, title, description, formattedDate, author, tags, image, readingTime } = post;
  
  // Generate author initials for avatar fallback
  const authorInitials = author
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link to={`/blog/${slug}`} className="block">
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
        
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{readingTime}</span>
          </div>
          <h3 className="text-xl font-semibold line-clamp-2 hover:underline">{title}</h3>
        </CardHeader>
        
        <CardContent className="p-4 pt-0">
          <p className="text-muted-foreground line-clamp-3">{description}</p>
        </CardContent>
        
        <CardFooter className="p-4 pt-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`https://ui-avatars.com/api/?name=${author}&background=random`} />
              <AvatarFallback>{authorInitials}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{author}</span>
          </div>
          
          <div className="flex gap-2 flex-wrap justify-end">
            {tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 2}
              </Badge>
            )}
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
} 