
import { ArrowDownCircle } from "lucide-react";
import ArchitecturalBackground from "./ArchitecturalBackground";

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      <ArchitecturalBackground />
      <div className="container relative z-10">
        <div className="max-w-2xl bg-background/60 backdrop-blur-md p-8 rounded-lg border border-primary/10 shadow-sm">
          <h1 className="heading mb-6">
            Hi, I'm <span className="font-mono relative inline-block">
              Anandesh Sharma
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary"></span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground leading-relaxed">
            Principal Architect specialized in API development, data engineering, and scalable software solutions.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#projects" 
              className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-all duration-300 flex items-center gap-2 shadow-sm"
            >
              View Projects
            </a>
            <a 
              href="/lovable-uploads/0071ef85-3f41-4ab4-9110-f74dd40771bd.png" 
              download="Anandesh_Sharma_Resume.png"
              className="border border-primary/20 bg-background/80 flex items-center gap-2 px-6 py-3 rounded-md hover:bg-secondary/80 transition-all duration-300 shadow-sm"
            >
              <ArrowDownCircle size={18} />
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
