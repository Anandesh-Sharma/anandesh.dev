
import { School } from "lucide-react";

const educations = [
  {
    institution: "Guru Gobind Singh Indraprastha University",
    degree: "Bachelors in Computer Science, MSI",
    period: "Aug 2016 - Aug 2019",
    location: "Delhi, IN",
    achievements: [
      "Grade: A",
      "Been the first Microsoft Student Partner / Multi-time Tech Speaker"
    ]
  }
];

export default function EducationSection() {
  return (
    <section id="education" className="section bg-secondary">
      <div className="container">
        <h2 className="section-title">Education</h2>
        
        <div className="space-y-10 max-w-4xl mx-auto">
          {educations.map((edu, index) => (
            <div key={index} className="relative pl-8 border-l border-border">
              <div className="absolute left-0 top-0 -translate-x-1/2 bg-secondary p-2 border border-border rounded-full">
                <School size={18} />
              </div>
              
              <div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                  <h3 className="text-xl font-medium">{edu.institution}</h3>
                  <span className="text-sm text-muted-foreground">{edu.period}</span>
                </div>
                
                <div className="flex flex-col md:flex-row md:justify-between mb-4">
                  <span className="font-mono text-sm">{edu.degree}</span>
                  <span className="text-sm text-muted-foreground">{edu.location}</span>
                </div>
                
                <ul className="list-disc list-outside ml-4 space-y-2">
                  {edu.achievements.map((achievement, i) => (
                    <li key={i} className="text-muted-foreground">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
