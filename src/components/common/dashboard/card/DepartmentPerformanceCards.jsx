"use client";
import React from "react";
import { Col, Card } from "react-bootstrap";
import {
  FaRupeeSign,
  FaUtensils,
  FaPercentage,
  FaBullseye,
  FaCartPlus,
} from "react-icons/fa";
import CommonCard from "./CommonCard";
import { FaArrowTrendUp } from "react-icons/fa6";

export default function DepartmentPerformanceCards() {
  return (
    <Col
      xs={12}
      lg={3}
      className="d-flex flex-lg-column flex-row gap-3 mb-3 mb-lg-0"
      style={{ whiteSpace: "nowrap" }}
    >
      <CommonCard
        bgColor="#cff9d6ff"
        textColor="#000"
        minWidth="220px"
        style={{ borderLeft: "5px solid #3b82f6", padding: '0px' }}
      >
        <Card.Body>
          <div className="d-flex d-flex-row p-0">
            <div>
              <h6 className="fw-bold mb-1">Total Sales</h6>
              <h4 className="fw-bold">₹413K</h4>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <FaCartPlus className="text-success fs-4" />
            </div>
          </div>
        </Card.Body>
      </CommonCard>
      <CommonCard
        bgColor="#eaeffaff"
        textColor="#000"
        minWidth="220px"
        style={{ borderLeft: "5px solid #10b981", padding: '0px' }}
      >
        <Card.Body>
          <div className="d-flex d-flex-row p-0">
            <div>
              <h6 className="fw-bold mb-1">Consumption</h6>
              <h4 className="fw-bold">₹255K</h4>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <FaCartPlus className="text-primary fs-4" />
            </div>
          </div>
        </Card.Body>
      </CommonCard>
      <CommonCard
        bgColor="#fff5e6"
        textColor="#000"
        minWidth="220px"
        style={{ borderLeft: "5px solid #f97316", padding: '0px' }}
      >
        <Card.Body>
          <div className="d-flex d-flex-row">
            <div>
              <h6 className="fw-bold mb-1">Overall Cost %</h6>
              <h4 className="fw-bold">61.7%</h4>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <FaCartPlus className="text-primary fs-4" />
            </div>
          </div>
        </Card.Body>
      </CommonCard>
      <CommonCard
        bgColor="#efe5f7ff"
        textColor="#000"
        minWidth="220px"
        style={{ borderLeft: "5px solid #a855f7", padding: "0px" }}
      >
        <Card.Body>
          <div className="d-flex d-flex-row">
            <div>
              <h6 className="fw-bold mb-1">Total Cost %</h6>
              <h4 className="fw-bold">61.7%</h4>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <FaArrowTrendUp className="text-primary fs-4" />
            </div>
          </div>
        </Card.Body>
      </CommonCard>
    </Col>
  );
}
