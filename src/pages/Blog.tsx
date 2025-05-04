
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPostCard from "@/components/BlogPostCard";
import BlogPostSkeleton from "@/components/BlogPostSkeleton";
import { supabase } from "@/integrations/supabase/client";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import type { BlogPost } from "@/types/blog";

const POSTS_PER_PAGE = 6;

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['blog-posts', currentPage],
    queryFn: async () => {
      // Calculate the range for pagination
      const from = (currentPage - 1) * POSTS_PER_PAGE;
      const to = from + POSTS_PER_PAGE - 1;
      
      // Get total count for pagination
      const { count } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true })
        .eq('is_published', true);
        
      if (count) {
        setTotalPages(Math.ceil(count / POSTS_PER_PAGE));
      }
      
      // Fetch paginated blog posts
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .range(from, to);
        
      if (error) throw error;
      return data as BlogPost[];
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="heading mb-8">Blog</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Thoughts, ideas, and insights on technology, development, and design.
          </p>
          
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(POSTS_PER_PAGE)].map((_, i) => (
                <BlogPostSkeleton key={i} />
              ))}
            </div>
          )}
          
          {isError && (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium">Failed to load blog posts</h2>
              <p className="text-muted-foreground mt-2">Please try again later</p>
            </div>
          )}
          
          {posts && posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
              
              {totalPages > 1 && (
                <Pagination className="mt-12">
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationLink 
                          onClick={() => setCurrentPage(p => p - 1)}
                          className="cursor-pointer"
                        >
                          Previous
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink 
                          isActive={currentPage === i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className="cursor-pointer"
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationLink 
                          onClick={() => setCurrentPage(p => p + 1)}
                          className="cursor-pointer"
                        >
                          Next
                        </PaginationLink>
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              )}
            </>
          ) : (
            !isLoading && (
              <div className="text-center py-12">
                <h2 className="text-xl font-medium">No blog posts yet</h2>
                <p className="text-muted-foreground mt-2">Check back soon for updates</p>
              </div>
            )
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
