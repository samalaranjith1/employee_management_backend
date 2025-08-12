import { Card } from "react-bootstrap";

export default function ConsumptionCard({
  title,
  percentage,
  percentageChange,
  icon,
  textColor,
  bgColor,
  rows,
}) {
  return (
    <Card
      className="p-3 card-item"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        minWidth: "30vw",
        flexShrink: 0,
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition:
          "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h6
            className="text-secondary fw-bold text-uppercase"
            style={{ fontSize: "0.8rem" }}
          >
            {title}
          </h6>
          <h4 className="fw-bold mb-0">{percentage}</h4>
          <span className="text-success fw-bold" style={{ fontSize: "0.9rem" }}>
            {percentageChange}
          </span>
        </div>
        <div>{icon}</div>
      </div>
      <ul className="list-unstyled mt-3">
        {rows.map((row, idx) => (
          <li
            key={idx}
            className={`d-flex justify-content-between align-items-center mb-1 rounded p-1`}
            style={{
              backgroundColor: row.highlightBg || "transparent",
              color: "black",
            }}
          >
            <span className="text-secondary" style={{ fontSize: "0.9rem" }}>
              {row.label}
            </span>
            <span className="fw-bold" style={{ fontSize: "0.9rem" }}>
              {row.value}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
};