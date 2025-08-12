"use client";
import React from "react";
import {  Col, Card } from "react-bootstrap";
import {
  FaRupeeSign,
  FaUtensils,
  FaPercentage,
  FaBullseye,
} from "react-icons/fa";

function DepartmentPerformanceCards() {
  return (
    <Col
      xs={12}
      lg={3}
      className="d-flex flex-lg-column flex-row overflow-auto gap-3 mb-3 mb-lg-0"
      style={{ whiteSpace: "nowrap" }}
    >
      <Card
        className="shadow-sm flex-shrink-0"
        style={{ borderLeft: "5px solid #3b82f6", minWidth: "220px" }}
      >
        <Card.Body>
          <FaRupeeSign className="text-primary fs-4" />
          <p className="mb-1 text-muted">Total Sales</p>
          <h5 className="fw-bold text-primary">₹413K</h5>
        </Card.Body>
      </Card>

      <Card
        className="shadow-sm flex-shrink-0"
        style={{ borderLeft: "5px solid #10b981", minWidth: "220px" }}
      >
        <Card.Body>
          <FaUtensils className="text-success fs-4" />
          <p className="mb-1 text-muted">Total Consumption</p>
          <h5 className="fw-bold text-success">₹255K</h5>
        </Card.Body>
      </Card>

      <Card
        className="shadow-sm flex-shrink-0"
        style={{ borderLeft: "5px solid #f97316", minWidth: "220px" }}
      >
        <Card.Body>
          <FaPercentage className="text-warning fs-4" />
          <p className="mb-1 text-muted">Overall Cost %</p>
          <h5 className="fw-bold text-warning">61.7%</h5>
        </Card.Body>
      </Card>

      <Card
        className="shadow-sm flex-shrink-0"
        style={{ borderLeft: "5px solid #a855f7", minWidth: "220px" }}
      >
        <Card.Body>
          <FaBullseye className="text-purple fs-4" />
          <p className="mb-1 text-muted">Target Cost %</p>
          <h5 className="fw-bold text-purple">≤60%</h5>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default DepartmentPerformanceCards;
