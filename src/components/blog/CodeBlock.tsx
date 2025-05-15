import { Code, Copy, Check } from "lucide-react";
import React, { useState, useRef } from "react";

interface CodeBlockProps {
  className?: string;
  children: React.ReactNode;
}

// Helper function to get language name from class
const getLanguageName = (className: string | undefined) => {
  if (!className) return "Code";
  
  const match = className.match(/language-(\w+)/);
  if (!match) return "Code";
  
  const lang = match[1].toLowerCase();
  
  // Map of language codes to full names
  const langMap: Record<string, string> = {
    js: "JavaScript",
    jsx: "React JSX",
    ts: "TypeScript",
    tsx: "React TSX",
    html: "HTML",
    css: "CSS",
    scss: "SCSS",
    sass: "Sass",
    less: "Less",
    json: "JSON",
    md: "Markdown",
    mdx: "MDX",
    py: "Python",
    rb: "Ruby",
    java: "Java",
    c: "C",
    cpp: "C++",
    cs: "C#",
    go: "Go",
    rust: "Rust",
    php: "PHP",
    sh: "Shell",
    bash: "Bash",
    ps1: "PowerShell",
    yaml: "YAML",
    sql: "SQL",
  };
  
  return langMap[lang] || lang.charAt(0).toUpperCase() + lang.slice(1);
};

export default function CodeBlock({ className, children }: CodeBlockProps) {
  const language = getLanguageName(className);
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);
  
  const handleCopy = () => {
    if (!codeRef.current) return;
    
    // Get the text content directly from the DOM element
    const code = codeRef.current.textContent || '';
    
    // Use the Clipboard API
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy code:', err);
        // Fallback method
        const textArea = document.createElement('textarea');
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (e) {
          console.error('Fallback: Could not copy text: ', e);
        }
        document.body.removeChild(textArea);
      });
  };
  
  return (
    <div className="vscode-codeblock">
      <div className="vscode-codeblock-header">
        <div className="flex items-center">
          <Code className="h-3.5 w-3.5 mr-2 opacity-70" />
          <span>{language}</span>
        </div>
        <button 
          onClick={handleCopy}
          className="ml-auto flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 w-6 h-6 rounded transition-colors"
          aria-label="Copy code"
          title="Copy code"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <Copy className="h-3.5 w-3.5 opacity-70" />
          )}
        </button>
      </div>
      <pre>
        <code ref={codeRef} className={className}>
          {children}
        </code>
      </pre>
    </div>
  );
} 