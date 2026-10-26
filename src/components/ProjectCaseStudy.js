import "./ProjectCaseStudy.css";

export default function ProjectCaseStudy({ study }) {
  if (!study) return null;
  return (
    <div className="project-case-study">
      <p className="case-study-label">Capstone case study · Solo developer</p>
      <section aria-label="What I built">
        <h4>What I built</h4>
        <p>{study.overview}</p>
        <ul>
          {study.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>
      <section aria-label="Tech stack">
        <h4>Tech stack</h4>
        <p>{study.stack}</p>
      </section>
      <section
        className="case-study-learning"
        aria-label="Challenges and what I learned"
      >
        <h4>Challenges and what I learned</h4>
        {study.learning ? (
          <p>{study.learning}</p>
        ) : (
          <p>
            <span className="placeholder-label">
              Placeholder — to be completed
            </span>
            Add a challenge you encountered, how you approached it, and what you
            learned.
          </p>
        )}
      </section>
    </div>
  );
}
