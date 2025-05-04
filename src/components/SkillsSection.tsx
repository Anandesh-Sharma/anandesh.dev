
const skills = [
  { 
    category: 'Languages', 
    items: ['Python', 'JavaScript', 'TypeScript', 'HTML/CSS', 'C/C++', 'SQL', 'Bash'] 
  },
  { 
    category: 'Frameworks & Tools', 
    items: ['React', 'Next.js', 'Django', 'Flask', 'Node.js', 'Spark', 'PySpark', 'Scrapy', 'Selenium', 'Git'] 
  },
  { 
    category: 'Databases', 
    items: ['PostgreSQL', 'MySQL', 'Redis', 'MongoDB', 'DynamoDB'] 
  },
  { 
    category: 'Soft Skills', 
    items: ['Leadership', 'Analytical Thinking', 'Effective Communication', 'Continuous Learning'] 
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title">Skills & Technologies</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillGroup) => (
            <div key={skillGroup.category} className="space-y-4">
              <h3 className="text-lg font-medium">{skillGroup.category}</h3>
              <ul className="space-y-2">
                {skillGroup.items.map((skill) => (
                  <li key={skill} className="text-muted-foreground">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
