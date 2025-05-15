import { format, parseISO } from 'date-fns';
import { parseYamlFrontmatter, compileMdx } from './mdx';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  formattedDate: string;
  author: string;
  tags: string[];
  image: string;
  content: string;
  compiledContent?: string;
  readingTime: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  formattedDate: string;
  author: string;
  tags: string[];
  image: string;
  readingTime: string;
}

// Function to fetch all blog posts from the MDX files
export async function getAllPosts(): Promise<BlogPostMeta[]> {
  try {
    // Use relative path without leading slash
    const modules = import.meta.glob('../content/**/*.mdx', { as: 'raw', eager: true });
    
    const posts = Object.entries(modules).map(([filePath, content]: [string, string]) => {
      // Parse frontmatter and content
      const { frontmatter } = parseYamlFrontmatter(content);
      
      // Extract slug from the file path
      const slug = filePath.split('/').pop()?.replace('.mdx', '') || '';
      
      const formattedDate = format(parseISO(frontmatter.date), 'MMMM dd, yyyy');
      
      // Calculate reading time (approximately 200 words per minute)
      const wordCount = content.trim().split(/\s+/).length;
      const readingTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
      
      return {
        slug,
        title: frontmatter.title,
        description: frontmatter.description,
        date: frontmatter.date,
        formattedDate,
        author: frontmatter.author,
        tags: frontmatter.tags,
        image: frontmatter.image,
        readingTime,
      };
    });
    
    // Sort by date (newest first)
    return posts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error loading blog posts:", error);
    return [];
  }
}

// Function to get a single blog post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // Use relative path without leading slash
    const modules = import.meta.glob('../content/**/*.mdx', { as: 'raw', eager: true });
    
    for (const [filePath, content] of Object.entries(modules)) {
      if (filePath.includes(slug + '.mdx')) {
        // Parse frontmatter and content
        const { frontmatter, content: articleContent } = parseYamlFrontmatter(content as string);
        
        // Compile the MDX content
        const compiledContent = await compileMdx(articleContent);
        
        const formattedDate = format(parseISO(frontmatter.date), 'MMMM dd, yyyy');
        
        // Calculate reading time (approximately 200 words per minute)
        const wordCount = (content as string).trim().split(/\s+/).length;
        const readingTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
        
        return {
          slug,
          title: frontmatter.title,
          description: frontmatter.description,
          date: frontmatter.date,
          formattedDate,
          author: frontmatter.author,
          tags: frontmatter.tags,
          image: frontmatter.image,
          content: articleContent,
          compiledContent,
          readingTime,
        };
      }
    }
  } catch (error) {
    console.error("Error loading blog post:", error);
  }
  
  return null;
} 