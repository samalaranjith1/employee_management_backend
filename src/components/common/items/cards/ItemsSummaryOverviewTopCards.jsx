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
            className="p-3 shadow-sm h-100 border-0"
          >
            <h6 className=" d-flex align-items-center" style={{fontWeight:700, fontSize:"14px", color:"#232425"}}>
              {card.icon}
              {card.title}
            </h6>
            <div className="mt-2">
              {card.rows.map((row, i) => (
                <div
                  key={i}
                  className="d-flex justify-content-between small mb-1"
                >
                  <span className="" style={{fontWeight:500, fontSize:"12px",color:"#717182"}}>{row.label}</span>
                  <span className="" style={{fontWeight:600, fontSize:"12px", color:"#232425"}}>{row.value}</span>
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
            className="p-3 shadow-sm h-100 border-0"
          >
            <h6 className=" d-flex align-items-center" style={{fontWeight:700, fontSize:"14px", color:"#232425"}}>
              {card.icon}
              {card.title}
            </h6>
            <div className="mt-2">
              {card.rows.map((row, i) => (
                <div
                  key={i}
                  className="d-flex justify-content-between small mb-1"
                >
                  <span className=""  style={{fontWeight:500, fontSize:"12px",color:"#717182"}}>{row.label}</span>
                  <span className="" style={{fontWeight:600, fontSize:"12px", color:"#232425"}}>{row.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
