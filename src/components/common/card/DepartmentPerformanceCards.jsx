"use client";
import React from "react";
import { Col, Card } from "react-bootstrap";
import {
  FaRupeeSign,
  FaUtensils,
  FaPercentage,
  FaBullseye,
} from "react-icons/fa";
import CommonCard from "./CommonCard";

export default function DepartmentPerformanceCards() {
  return (
    <Col
      xs={12}
      lg={3}
      className="d-flex flex-lg-column flex-row overflow-auto gap-3 mb-3 mb-lg-0"
      style={{ whiteSpace: "nowrap" }}
    >
      <CommonCard
        bgColor="#eaf2ff"
        textColor="#3b82f6"
        minWidth="220px"
        style={{ borderLeft: "5px solid #3b82f6" }}
      >
        <Card.Body>
          <FaRupeeSign className="text-primary fs-4" />
          <p className="mb-1 text-muted">Total Sales</p>
          <h5 className="fw-bold text-primary">₹413K</h5>
        </Card.Body>
      </CommonCard>
      <CommonCard
        bgColor="#e6f8f2"
        textColor="#10b981"
        minWidth="220px"
        style={{ borderLeft: "5px solid #10b981" }}
      >
        <Card.Body>
          <FaUtensils className="text-success fs-4" />
          <p className="mb-1 text-muted">Total Consumption</p>
          <h5 className="fw-bold text-success">₹255K</h5>
        </Card.Body>
      </CommonCard>
      <CommonCard
        bgColor="#fff5e6"
        textColor="#f97316"
        minWidth="220px"
        style={{ borderLeft: "5px solid #f97316" }}
      >
        <Card.Body>
          <FaPercentage className="text-warning fs-4" />
          <p className="mb-1 text-muted">Overall Cost %</p>
          <h5 className="fw-bold text-warning">61.7%</h5>
        </Card.Body>
      </CommonCard>
      <CommonCard
        bgColor="#f3e5ff"
        textColor="#a855f7"
        minWidth="220px"
        style={{ borderLeft: "5px solid #a855f7" }}
      >
        <Card.Body>
          <FaBullseye className="text-purple fs-4" />
          <p className="mb-1 text-muted">Target Cost %</p>
          <h5 className="fw-bold text-purple">≤60%</h5>
        </Card.Body>
      </CommonCard>
    </Col>
  );
}
