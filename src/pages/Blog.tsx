import BlogList from "@/components/blog/BlogList";
import BlogLayout from "@/components/blog/BlogLayout";

export default function Blog() {
  return (
    <BlogLayout>
      <div className="container mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore our latest articles and insights on web development, design, and technology.
        </p>
      </div>
      <BlogList />
    </BlogLayout>
  );
} 