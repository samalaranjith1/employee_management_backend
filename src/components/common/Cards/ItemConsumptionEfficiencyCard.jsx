import React from "react";
import { Card } from "react-bootstrap";

function ItemConsumptionEfficiencyCard({ summaryCards }) {
  return (
    <div
      className="summary-cards-container"
      style={{
        display: "grid",
        gridAutoFlow: "column",
        gap: "1rem",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        paddingBottom: "0.5rem",
      }}
    >
      {summaryCards.map((card, idx) => (
        <div
          key={idx}
          className="summary-card-wrapper"
          style={{
            minWidth: "90vw", // Mobile swipe width
          }}
        >
          <Card
            style={{
              backgroundColor: card.bg,
              borderRadius: "12px",
              padding: "10px",
            }}
            className="shadow-sm"
          >
            <Card.Body className="d-flex align-items-center">
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  marginRight: "10px",
                }}
              >
                {card.icon}
              </div>
              <div>
                <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {card.value}
                </div>
                <div style={{ fontSize: "13px", color: "#555" }}>
                  {card.label}
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}

      <style jsx>{`
        /* Mobile default: horizontal scroll */
        .summary-cards-container {
          gridautoflow: column;
        }

        /* Desktop: fixed 4-column grid */
        @media (min-width: 768px) {
          .summary-cards-container {
            display: grid;
            gridautoflow: unset;
            gridtemplatecolumns: repeat(4, 1fr);
            overflow-x: visible;
          }
          .summary-card-wrapper {
            min-width: auto !important;
          }
        }
      `}</style>
    </div>
  );
}

export default ItemConsumptionEfficiencyCard;
