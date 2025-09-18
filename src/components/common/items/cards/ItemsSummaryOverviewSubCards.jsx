"use client";
import React from "react";
import { Row, Col, Card } from "react-bootstrap";

export default function ItemsSummaryOverviewSubCards({ footer = [] }) {
  return (
    <Row
      className="g-3 mt-3"
      style={{
        flex: "1",
        display: "flex",
        alignItems: "center",
        background: "#F3FFF8",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgb(0 0 0 / 0.05)",
      }}
    >
      {footer.map((foot) => (
        <Col key={foot.id}>
          <Card
            className="p-3 border-0 shadow-sm h-100 rounded-4 text-center"
            style={{ backgroundColor: foot.bg }}
          >
            <h6 className="fw-bold d-flex align-items-center justify-content-center mb-1">
              {foot.icon} {foot.label}
            </h6>
            <p className="mb-0 fw-semibold">{foot.value}</p>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
