
import { ArrowDownCircle } from "lucide-react";
import ArchitecturalBackground from "./ArchitecturalBackground";

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      <ArchitecturalBackground />
      <div className="container relative z-10">
        <div className="max-w-2xl bg-background/70 backdrop-blur-sm p-6 rounded-lg">
          <h1 className="heading mb-6">
            Hi, I'm <span className="font-mono relative inline-block">
              Anandesh Sharma
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary"></span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
            Principal Architect specialized in API development, data engineering, and scalable software solutions.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#projects" 
              className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
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

        {/* Abstract architectural elements */}
        <div className="absolute right-10 bottom-20 w-24 h-24 border-4 border-primary/20 rounded-full opacity-70 hidden md:block"></div>
        <div className="absolute right-40 bottom-40 w-16 h-16 border-2 border-primary/30 opacity-50 hidden md:block"></div>
        <div className="absolute left-1/3 top-10 w-20 h-1 bg-primary/20 rotate-45 hidden md:block"></div>
      </div>
    </section>
  );
}
