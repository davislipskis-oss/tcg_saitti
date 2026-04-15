export default function SectionHeading({ eyebrow, title, intro }) {
  return (
    <div className="section-heading">
      {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
      <h2>{title}</h2>
      {intro ? <p className="lead">{intro}</p> : null}
    </div>
  );
}
