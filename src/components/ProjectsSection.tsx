
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    id: 1,
    title: 'Instagram Genesis',
    description: 'Automated bot system that replicates all functions of Instagram for marketing purposes.',
    tags: ['Python', 'Automation', 'Marketing'],
    github: 'https://github.com/Anandesh-Sharma/Instagram-Genesis',
    demo: 'https://anandesh.dev/projects/instagram-genesis',
  },
  {
    id: 2,
    title: 'Emotion Detection AI',
    description: 'AI software capable of detecting up to 6 human emotions using Fischer Face Classifier, built on pure Python.',
    tags: ['AI', 'Python', 'Machine Learning'],
    github: 'https://github.com/Anandesh-Sharma/Emotion-Detection',
    demo: 'https://anandesh.dev/projects/emotion-detection',
  },
  {
    id: 3,
    title: 'Credit Risk Model',
    description: 'Sophisticated credit risk assessment system leveraging phone details for comprehensive risk analysis and reporting.',
    tags: ['Data Analysis', 'Risk Assessment', 'Python'],
    github: 'https://github.com/Anandesh-Sharma/Credit-Risk-Model',
    demo: 'https://anandesh.dev/projects/credit-risk-model',
  },
  {
    id: 4,
    title: 'API Builders',
    description: 'Led the architecture and development of API Builders, achieving a 30% reduction in integration time for external partners.',
    tags: ['API Development', 'Architecture', 'Integration'],
    github: 'https://github.com/Anandesh-Sharma',
    demo: 'https://anandesh.dev',
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
