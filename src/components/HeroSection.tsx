
export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16">
      <div className="container">
        <h1 className="heading mb-6 max-w-2xl">
          Hi, I'm <span className="font-mono">Your Name</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl">
          A frontend developer specializing in building beautiful, functional interfaces and experiences.
        </p>
        <div className="flex space-x-4">
          <a 
            href="#projects" 
            className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
          >
            View Projects
          </a>
          <a 
            href="#contact" 
            className="border border-border px-6 py-3 rounded-md hover:bg-secondary transition-colors"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}
