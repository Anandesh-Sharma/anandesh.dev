
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  published_at: string;
  updated_at: string;
  author: string;
  tags: string[];
  is_published: boolean;
  read_time: number;
}
