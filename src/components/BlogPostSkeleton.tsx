
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const BlogPostSkeleton = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="h-6 bg-muted rounded-md w-3/4 animate-pulse"></div>
        <div className="flex items-center gap-4 mt-3">
          <div className="h-4 bg-muted rounded-md w-24 animate-pulse"></div>
          <div className="h-4 bg-muted rounded-md w-24 animate-pulse"></div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded-md w-full animate-pulse"></div>
          <div className="h-4 bg-muted rounded-md w-full animate-pulse"></div>
          <div className="h-4 bg-muted rounded-md w-2/3 animate-pulse"></div>
        </div>
        <div className="flex gap-1 mt-4">
          <div className="h-4 bg-muted rounded-md w-16 animate-pulse"></div>
          <div className="h-4 bg-muted rounded-md w-16 animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogPostSkeleton;
