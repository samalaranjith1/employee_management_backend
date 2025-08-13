import React from 'react'

function RecommendationsCard({
  rec,
  idx,
  cardStyle,
  isMobile,
  textColor,
}) {
  return (
    <div
      key={idx}
      style={{
        ...cardStyle,
        width: isMobile ? "90vw" : `calc(25% - (3 * 15px / 4))`,
      }}
      className="rec-card"
    >
      <div className="d-flex justify-content-between align-items-center">
        <div
          style={{
            fontWeight: "600",
            color: { textColor },
            fontSize: "15px",
            marginBottom: "5px",
          }}
        >
          {rec.title}
        </div>
        <div
          style={{
            fontWeight: "600",
            color: { textColor },
            fontSize: "15px",
            marginBottom: "5px",
          }}
        >
          {rec.title}
        </div>
      </div>

      <div style={{ fontSize: "13px", color: "#333" }}>{rec.desc}</div>
    </div>
  );
}

export default RecommendationsCard;