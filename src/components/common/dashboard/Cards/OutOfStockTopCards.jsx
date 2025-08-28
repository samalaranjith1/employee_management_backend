"use client";

import React from "react";
import {  Card } from "react-bootstrap";
import {
  FaBoxOpen,
  FaExclamationTriangle,
  FaLayerGroup,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function OutOfStockTopCards({ cardBase, iconStyle ,scrollRef}) {
  return (
    <div
      ref={scrollRef}
      style={{
        display: "flex",
        gap: "1rem",
        overflowX: "auto",
        padding: "1rem 0",
      }}
    >
      <Card
        className="top-card"
        style={{ ...cardBase, background: "#FFE5E7", color: "#C62828" }}
      >
        <Card.Body>
          <FaBoxOpen style={iconStyle} />
          <h5 style={{ fontWeight: "bold" }}>Out of Stock</h5>
          <h2 style={{ fontWeight: "bold" }}>3</h2>
          <p>Zero inventory remaining</p>
        </Card.Body>
      </Card>
      <Card
        className="top-card"
        style={{ ...cardBase, background: "#FFF0D5", color: "#E78C27" }}
      >
        <Card.Body>
          <FaExclamationTriangle style={iconStyle} />
          <h5 style={{ fontWeight: "bold" }}>Critical Items</h5>
          <h2 style={{ fontWeight: "bold" }}>5</h2>
          <p>Require immediate attention</p>
        </Card.Body>
      </Card>
      <Card
        className="top-card"
        style={{ ...cardBase, background: "#FFF5D6", color: "#6D4C41" }}
      >
        <Card.Body>
          <FaLayerGroup style={iconStyle} />
          <h5 style={{ fontWeight: "bold" }}>Total Items</h5>
          <h2 style={{ fontWeight: "bold" }}>12</h2>
          <p>Tracking inventory levels</p>
        </Card.Body>
      </Card>
    </div>
  );
}

export default OutOfStockTopCards