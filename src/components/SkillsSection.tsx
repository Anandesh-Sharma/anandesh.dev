
const skills = [
  { category: 'Languages', items: ['JavaScript', 'TypeScript', 'HTML', 'CSS'] },
  { category: 'Frameworks', items: ['React', 'Next.js', 'Tailwind CSS', 'Express.js'] },
  { category: 'Tools', items: ['Git', 'Webpack', 'Vite', 'Jest', 'npm'] },
  { category: 'Design', items: ['Figma', 'Adobe XD', 'Responsive Design', 'UI/UX Principles'] },
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
