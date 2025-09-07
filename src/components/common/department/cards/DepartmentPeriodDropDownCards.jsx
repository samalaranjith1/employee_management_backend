"use client";

import React from "react";
import { Card, Row, Col } from "react-bootstrap";

export default function DepartmentPeriodDropDownCards({ cards = [] }) {
  return (
    <Row className="mb-4">
      {cards.map((c, idx) => (
        <Col key={idx} md={3} xs={6} className="mb-3">
          {/* <Card
            className="h-100 d-flex flex-column justify-content-center"
            style={{
              backgroundColor: c.bg,
              borderRadius: "12px",
              border: "none",
            }}
          >
            <Card.Body className="d-flex align-items-center">
              <div
                className="p-2 d-flex align-items-center justify-content-center me-3"
                style={{
                  backgroundColor: c.iconBg,
                  borderRadius: "8px",
                  width: 40,
                  height: 40,
                }}
              >
                {c.icon}
              </div>
              <div>
                <div
                  className="fw-semibold text-muted"
                  style={{ fontSize: 13 }}
                >
                  {c.title}
                </div>
                <div className="fw-bold" style={{ fontSize: 18 }}>
                  {c.value}
                </div>
              </div>
            </Card.Body>
          </Card> */}
          <Card
            className="h-100 d-flex flex-column justify-content-center"
            style={{
              backgroundColor: c.bg, // c.bg must be #f0fdf4, #f5f3ff, etc. exactly
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
            }}
          >
            <Card.Body className="d-flex align-items-center">
              <div
                className="p-2 d-flex align-items-center justify-content-center me-3"
                style={{
                  backgroundColor: c.iconBg, // e.g. "#16a34a"
                  borderRadius: "12px", // fully rounded corner like pill
                  width: 40,
                  height: 40,
                }}
              >
                {c.icon}
              </div>
              <div>
                <div
                  className="fw-semibold text-muted"
                  style={{ fontSize: 13 }}
                >
                  {c.title}
                </div>
                <div className="fw-bold" style={{ fontSize: 18 }}>
                  {c.value}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
