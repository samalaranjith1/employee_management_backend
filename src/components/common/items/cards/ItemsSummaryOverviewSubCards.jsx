"use client";
import React from "react";
import { Row, Col, Card } from "react-bootstrap";

export default function ItemsSummaryOverviewSubCards({ footer = [] }) {
  return (
    <Row className="g-3 mt-3">
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
