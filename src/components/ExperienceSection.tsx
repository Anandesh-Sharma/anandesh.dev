
import { Briefcase } from "lucide-react";

const experiences = [
  {
    company: "Compliance Innovation",
    role: "Principal Architect",
    period: "Mar 2023 - Present",
    location: "Remote, India",
    achievements: [
      "Led the architecture and development of API Builders, achieving a 30% reduction in integration time for external partners and saving $30K every per year gravitee subscription.",
      "Built robust Payment Systems, increased payment processing speed by 10%, and a 15% reduction in error rates.",
      "Streamlined collaboration with cross-functional teams to successfully integrate React components, resulting in a 10% increase in user engagement and a more cohesive user experience."
    ]
  },
  {
    company: "PST.AG",
    role: "Software Engineer",
    period: "Sep 2022 - Mar 2023",
    location: "Remote, DE",
    achievements: [
      "Orchestrated data extraction from diverse sources (websites, XML, PDFs, Excel Sheets), boosting accuracy by 30% and reducing extraction time by 20%.",
      "Engineered ETL data pipelines, accelerating big-data processing speed by 40%. Also, used an open-source spider management tool, reducing the cost of Zyte by $10K per year.",
      "Optimized SQL queries, reduced execution time by 15%, and executed comprehensive Linux server administration, enhancing system efficiency by 20%."
    ]
  },
  {
    company: "Treez Inc.",
    role: "Software Engineer",
    period: "Dec 2021 - May 2022",
    location: "Remote, US",
    achievements: [
      "Implemented frameworks (Data Quality, Governance, Trending, Validation, Profiling) using Bigdata, Spark, and Python, enhancing data accuracy by 25%.",
      "Led Cloud Analytics solutions, researching and implementing strategies, contributing to a 20% boost in efficiency and scalability.",
      "Orchestrated end-to-end ETL processes for Data Warehousing applications, reducing processing time by 30%."
    ]
  },
  {
    company: "H1",
    role: "Software Engineer",
    period: "Jul 2021 - Jul 2022",
    location: "Remote, US",
    achievements: [
      "Executed data acquisition using Python, Pandas, MSSql, Numpy, BS4, Scrapy, Selenium, and Appium, streamlining the data acquisition process and improving accuracy by 20%.",
      "Spearheaded internal process improvements, automating manual processes and optimizing data delivery. Redesigned infrastructure for greater scalability, resulting in a 30% increase in overall system efficiency.",
      "Designed and maintained robust Pipeline architecture, ensuring seamless data flow and accessibility."
    ]
  },
  {
    company: "Credicxo",
    role: "Data / ML Engineer",
    period: "Jan 2019 - Aug 2021",
    location: "Onsite, IN",
    achievements: [
      "Developed and implemented an innovative Credit Risk Model that revolutionized the analysis of phone messages, contacts, and personal details, delivering an exceptional 40% improvement in accuracy over conventional models, setting a new industry benchmark.",
      "Enhanced risk assessment precision, resulting in a 25% improvement in identifying potential credit risks within diverse datasets."
    ]
  },
  {
    company: "Cash Suvidha",
    role: "Python Developer",
    period: "Jan 2018 - Jan 2019",
    location: "Onsite, IN",
    achievements: [
      "Specialized in PDF processing, implementing efficient algorithms and tools that enhanced document parsing speed by 20%.",
      "Developed intricate SQL queries for data retrieval and manipulation, optimizing database performance and reducing query execution time by 15%."
    ]
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        
        <div className="space-y-10 max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-8 border-l border-border">
              <div className="absolute left-0 top-0 -translate-x-1/2 bg-background p-2 border border-border rounded-full">
                <Briefcase size={18} />
              </div>
              
              <div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                  <h3 className="text-xl font-medium">{exp.company}</h3>
                  <span className="text-sm text-muted-foreground">{exp.period}</span>
                </div>
                
                <div className="flex flex-col md:flex-row md:justify-between mb-4">
                  <span className="font-mono text-sm">{exp.role}</span>
                  <span className="text-sm text-muted-foreground">{exp.location}</span>
                </div>
                
                <ul className="list-disc list-outside ml-4 space-y-2">
                  {exp.achievements.map((achievement, i) => (
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
