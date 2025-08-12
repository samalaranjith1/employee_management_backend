import React from 'react'
import { Card } from 'react-bootstrap';

function PeriodBreakDownCard({idx, isMobile, card }) {
  return (
    <Card
      key={idx}
      className="flex-shrink-0"
      style={{
        width: isMobile ? "90vw" : "23vw",
        minWidth: isMobile ? "90vw" : "23vw",
        minWidth:'280px',
        padding: "20px",
        backgroundColor: "rgb(249, 222, 239)",
      }}
    >
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <Card.Title>{card.title}</Card.Title>
            <h4>{card.value}</h4>
          </div>
          <div className="text-end">
            <small className={`text-${card.color}`}>{card.change}</small>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PeriodBreakDownCard