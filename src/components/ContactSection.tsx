
import { Mail, Phone, Linkedin } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="max-w-xl mx-auto">
          <p className="text-center text-lg text-muted-foreground mb-8">
            Interested in working together or have a question? Feel free to reach out to me through any of the channels below.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <a 
                href="mailto:hello@example.com" 
                className="flex items-center hover:text-primary transition-colors"
              >
                <Mail size={20} className="mr-3" />
                hello@example.com
              </a>
            </div>
            
            <div className="flex items-center justify-center">
              <a 
                href="tel:+11234567890" 
                className="flex items-center hover:text-primary transition-colors"
              >
                <Phone size={20} className="mr-3" />
                +1 (123) 456-7890
              </a>
            </div>
            
            <div className="flex items-center justify-center">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center hover:text-primary transition-colors"
              >
                <Linkedin size={20} className="mr-3" />
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
