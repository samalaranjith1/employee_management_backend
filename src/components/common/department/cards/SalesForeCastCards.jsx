"use client";

import React from "react";
import { Card } from "react-bootstrap";
import { FaRupeeSign } from "react-icons/fa";

export default function SalesForeCastCards({ title, value }) {
  return (
    <Card
      className="text-center shadow-sm"
      style={{ minWidth: "200px", flexShrink: 0 }}
    >
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className="fs-5 fw-bold">
          <FaRupeeSign /> {Math.round(value).toLocaleString()}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
