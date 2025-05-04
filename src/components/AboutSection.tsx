
export default function AboutSection() {
  return (
    <section id="about" className="section bg-secondary">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="max-w-3xl">
          <p className="text-lg mb-4">
            I'm a Principal Architect with extensive experience in developing API builders, robust payment systems, 
            and data engineering solutions. My expertise spans across designing scalable software architectures 
            that significantly reduce integration time and error rates.
          </p>
          <p className="text-lg mb-4">
            With a strong focus on data engineering, I've successfully orchestrated ETL pipelines, optimized SQL queries, 
            and implemented innovative credit risk models that have improved accuracy by up to 40% over conventional models.
          </p>
          <p className="text-lg">
            Currently, I'm working on compliance innovation projects where I lead architecture and development initiatives 
            that have achieved substantial improvements in processing speed and team collaboration. I'm passionate about 
            creating efficient systems that deliver exceptional user experiences.
          </p>
        </div>
      </div>
    </section>
  );
}
