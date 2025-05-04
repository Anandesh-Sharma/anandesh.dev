
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    id: 1,
    title: 'Portfolio Website',
    description: 'A clean, minimal portfolio website built with React and Tailwind CSS. Features responsive design and smooth animations.',
    tags: ['React', 'Tailwind CSS', 'Responsive'],
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    id: 2,
    title: 'E-Commerce Dashboard',
    description: 'Admin dashboard for an e-commerce platform featuring analytics, product management, and order processing.',
    tags: ['React', 'TypeScript', 'Chart.js'],
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    id: 3,
    title: 'Weather App',
    description: 'A weather application that displays current weather conditions and forecasts based on user location or search.',
    tags: ['JavaScript', 'API Integration', 'CSS'],
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    id: 4,
    title: 'Task Management App',
    description: 'A productivity application for managing tasks, projects, and deadlines with a clean and intuitive interface.',
    tags: ['React', 'Redux', 'Firebase'],
    github: 'https://github.com',
    demo: 'https://example.com',
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="section bg-secondary">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="bg-background rounded-lg p-6 border border-border transition-all hover:shadow-md"
            >
              <h3 className="text-xl font-medium mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-4">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-muted-foreground hover:text-foreground"
                >
                  <Github size={16} className="mr-2" />
                  Code
                </a>
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink size={16} className="mr-2" />
                  Live Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
