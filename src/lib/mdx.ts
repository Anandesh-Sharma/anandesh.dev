import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkFrontmatter from 'remark-frontmatter';
import { compile } from '@mdx-js/mdx';
import { VFile } from 'vfile';
import mdxMermaid from 'mdx-mermaid'
import {Mermaid} from 'mdx-mermaid/lib/Mermaid'

export const mdxOptions = {
  remarkPlugins: [remarkGfm, remarkMath, remarkFrontmatter, [mdxMermaid.default, {output: 'svg'}]],
  rehypePlugins: [rehypeHighlight, rehypeKatex],
  components: {mermaid: Mermaid, Mermaid}
};

// Compile MDX content to a React component
export async function compileMdx(source: string): Promise<string> {
  try {
    const file = new VFile({ value: source });
    const result = await compile(file, mdxOptions);
    return String(result);
  } catch (error) {
    console.error('Error compiling MDX:', error);
    throw error;
  }
}

export function parseYamlFrontmatter(content: string): { frontmatter: any; content: string } {
  // Simple frontmatter parser that extracts YAML between --- markers
  const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(content);

  if (!match) {
    return {
      frontmatter: {},
      content,
    };
  }

  const frontmatterBlock = match[1];
  const contentWithoutFrontmatter = content.replace(frontmatterRegex, '').trim();

  // Parse the frontmatter block into key-value pairs
  const frontmatter: Record<string, any> = {};
  const lines = frontmatterBlock.split('\n');

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    const colonIndex = trimmedLine.indexOf(':');
    if (colonIndex !== -1) {
      const key = trimmedLine.slice(0, colonIndex).trim();
      let value = trimmedLine.slice(colonIndex + 1).trim();

      // Handle quoted strings
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }

      // Handle arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          value = JSON.parse(value);
        } catch (e) {
          console.error('Error parsing array in frontmatter:', e);
        }
      }

      frontmatter[key] = value;
    }
  }

  return {
    frontmatter,
    content: contentWithoutFrontmatter,
  };
} 