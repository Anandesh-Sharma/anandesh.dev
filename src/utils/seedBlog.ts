
import { supabase } from "@/integrations/supabase/client";

const sampleBlogPost = {
  slug: "getting-started-with-react",
  title: "Getting Started with React in 2025",
  description: "Learn how to build modern web applications using React, the popular JavaScript library for building user interfaces.",
  content: `
# Getting Started with React in 2025

React has evolved significantly since its initial release, and in 2025, it continues to be one of the most popular libraries for building user interfaces. This guide will help you get started with React in 2025.

## Prerequisites

Before diving into React, make sure you have:

- A good understanding of HTML, CSS, and JavaScript
- Node.js and npm installed on your computer
- A code editor (VS Code is highly recommended)

## Setting Up Your First React Project

The easiest way to get started with React is using Vite:

\`\`\`bash
npm create vite@latest my-react-app -- --template react-ts
cd my-react-app
npm install
npm run dev
\`\`\`

## Understanding React Components

React is all about components. Here's a simple component:

\`\`\`jsx
function Welcome() {
  return <h1>Hello, World!</h1>;
}

export default Welcome;
\`\`\`

## State Management

React's useState hook is the simplest way to manage state:

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## Conclusion

This is just the beginning of your React journey. As you become more comfortable with these basics, you can explore more advanced concepts like context, custom hooks, and integrating with backend services.

Happy coding!
`,
  published_at: new Date().toISOString(),
  author: "Anandesh Sharma",
  tags: ["React", "JavaScript", "Web Development"],
  is_published: true,
  read_time: 5
};

export const seedBlogPost = async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([sampleBlogPost])
    .select();
    
  if (error) {
    console.error("Error seeding blog post:", error);
    return false;
  }
  
  return true;
};
