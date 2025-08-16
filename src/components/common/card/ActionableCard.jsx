"use client";
import React from "react";
import { Row, Col } from "react-bootstrap";
import { FaArrowUp, FaExclamationTriangle } from "react-icons/fa";
import CommonCard from "./CommonCard";

export default function ActionableCard({
  data,
  priorityColors,
  bgColor,
  textColor,
  scrollRef,
}) {
  return (
    <CommonCard
      scrollRef={scrollRef}
      bgColor={bgColor[data.priority]}
      textColor={textColor}
      border={`2px solid gray`}
      style={{ borderTop: `8px solid ${priorityColors[data.priority]}` }}
    >
      <Row className="align-items-center mb-2">
        <Col xs="auto">
          <div
            style={{
              background: "linear-gradient(135deg, #ff6a00, #ff3c3c)",
              borderRadius: "12px",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <FaArrowUp size={20} />
          </div>
        </Col>
        <Col className="text-danger fw-semibold d-flex align-items-center gap-1">
          <FaExclamationTriangle />{" "}
          {data.priority.charAt(0).toUpperCase() + data.priority.slice(1)}{" "}
          Priority
        </Col>
      </Row>
      <h6>{data.title}</h6>
      <span
        dangerouslySetInnerHTML={{ __html: data.message }}
        style={{
          fontSize: "0.95rem",
          color: "#555",
          maxWidth: "100%",
          wordBreak: "break-word",
        }}
      />
    </CommonCard>
  );
}
