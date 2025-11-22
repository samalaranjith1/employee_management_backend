"use client";
import { Row, Col } from "react-bootstrap";

function DepartmentCards({ cards }) {
  return (
    <Row className="g-3 align-items-stretch">
      {cards.map((card, idx) => (
        <Col key={idx} xs={6} md={3} className="d-flex">
          <div
            className="h-100 w-100"
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "1rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                background: card.color,
                borderRadius: "12px",
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "1.3rem",
              }}
            >
              {card.icon}
            </div>
            <div>
              <div style={{ fontSize: "0.85rem", color: "#666" }}>
                {card.title}
              </div>
              <div style={{ fontSize: "1.1rem", fontWeight: "700" }}>
                {card.value}
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default DepartmentCards;
