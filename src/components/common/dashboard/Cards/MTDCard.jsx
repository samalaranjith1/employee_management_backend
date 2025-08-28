import React from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

function MTDCard({ idx, isMobile, card, getVariantBgColor }) {
  return (
    <Card
      key={idx} // Using index as key, consider a unique ID from data if available
      className="shadow-sm p-3 card-item" // Added card-item class
      style={{
        minWidth: isMobile ? "90vw" : "23vw", // Adjusted width based on mobile/desktop
        width: isMobile ? "90vw" : "23vw", // Ensure fixed width for wrapping
        flexShrink: 0,
        flexGrow: 0, // Prevent growing
        flexBasis: isMobile ? "90vw" : "23vw", // Reinforce flex basis
        borderRadius: "12px",
        minWidth: '280px',
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        border: "2px solid gray", // Default border, can be made dynamic
        transition:
          "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s, border 0.3s",
        willChange: "transform",
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <small className="fw-bold text-muted">{card.title}</small>
        <Badge bg={card.trendColor} pill>
          {card.percentageChange}
        </Badge>
      </div>

      <h4 className="fw-bold mt-2">
        {card.value}{" "}
        {card.trend === "up" ? (
          <span className="text-success">
            <FaCaretUp />
          </span>
        ) : (
          <span className="text-danger">
            <FaCaretDown />
          </span>
        )}
      </h4>

      {/* Dynamically render rows */}
      {card.rows.map((row, rowIdx) => (
        <div
          key={rowIdx} // Using index as key for rows
          className="p-2 rounded mt-3 mb-2"
          style={{
            backgroundColor: getVariantBgColor(row.variant),
          }}
        >
          <Row>
            <Col className="fw-medium">{row.label}</Col>
            <Col className="fw-bold text-end">{row.value}</Col>
          </Row>
        </div>
      ))}
    </Card>
  );
}

export default MTDCard;
