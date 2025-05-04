
import { ArrowDownCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16">
      <div className="container">
        <h1 className="heading mb-6 max-w-2xl">
          Hi, I'm <span className="font-mono">Anandesh Sharma</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl">
          Principal Architect specialized in API development, data engineering, and scalable software solutions.
        </p>
        <div className="flex space-x-4">
          <a 
            href="#projects" 
            className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
          >
            View Projects
          </a>
          <a 
            href="/lovable-uploads/0071ef85-3f41-4ab4-9110-f74dd40771bd.png" 
            download="Anandesh_Sharma_Resume.png"
            className="border border-border flex items-center gap-2 px-6 py-3 rounded-md hover:bg-secondary transition-colors"
          >
            <ArrowDownCircle size={18} />
            Resume
          </a>
        </div>
      </div>
    </section>
  );
}
