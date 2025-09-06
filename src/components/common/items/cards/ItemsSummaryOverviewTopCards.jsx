"use client";
import React from "react";
import { Row, Col, Card } from "react-bootstrap";

export function ItemsSummaryOverviewTopCardsFirstRow({ cards = [] }) {
  return (
    <Row className="g-3">
      {cards.map((card) => (
        <Col md={4} key={card.id}>
          <Card
            style={{ backgroundColor: card.bg }}
            className="p-3 border-0 shadow-sm h-100"
          >
            <h6 className="fw-bold d-flex align-items-center">
              {card.icon}
              {card.title}
            </h6>
            <div className="mt-2">
              {card.rows.map((row, i) => (
                <div
                  key={i}
                  className="d-flex justify-content-between small mb-1"
                >
                  <span className="text-muted">{row.label}</span>
                  <span className="fw-semibold">{row.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export function ItemsSummaryOverviewTopCardsSecondRow({ cards = [] }) {
  return (
    <Row className="g-3 mt-2">
      {cards.map((card) => (
        <Col md={4} key={card.id}>
          <Card
            style={{ backgroundColor: card.bg }}
            className="p-3 border-0 shadow-sm h-100"
          >
            <h6 className="fw-bold d-flex align-items-center">
              {card.icon}
              {card.title}
            </h6>
            <div className="mt-2">
              {card.rows.map((row, i) => (
                <div
                  key={i}
                  className="d-flex justify-content-between small mb-1"
                >
                  <span className="text-muted">{row.label}</span>
                  <span className="fw-semibold">{row.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
