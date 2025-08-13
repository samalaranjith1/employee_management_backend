"use client";
import React from "react";
import { Card, Table, Badge } from "react-bootstrap";
import { FaCircle, FaArrowUp } from "react-icons/fa";

export default function ItemConsumptionDistributionTable({ data }) {
  const getBadgeVariant = (classification) => {
    if (classification === "High Consumption")
      return { bg: "#FFEAEA", color: "#E53935" };
    if (classification === "Medium Consumption")
      return { bg: "#FFF8E1", color: "#FBC02D" };
    if (classification === "Low Consumption")
      return { bg: "#E8F8F0", color: "#43A047" };
    return { bg: "#EEE", color: "#000" };
  };

  return (
    <Card style={{ border: "none", borderRadius: "12px" }}>
      <div
        style={{
          maxHeight: "65vh",
          overflowY: "auto",
        }}
      >
        <Table
          borderless
          className="align-middle mb-0"
          style={{ minWidth: "700px" }}
        >
          <thead
            style={{
              backgroundColor: "#F9FAFB",
              position: "sticky",
              top: 0,
              zIndex: 5,
            }}
          >
            <tr>
              <th>Percentile Bucket</th>
              <th>Items</th>
              <th>Consumption Value</th>
              <th>% of Total</th>
              <th>Classification</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => {
              const badge = getBadgeVariant(row.classification);
              return (
                <tr key={idx}>
                  <td className="fw-medium">
                    <FaCircle
                      size={10}
                      className="me-2"
                      style={{ color: row.color }}
                    />
                    {row.percentile}
                  </td>
                  <td>
                    <div className="fw-bold">{row.items}</div>
                    <small className="text-muted">
                      {row.percentItems} of items
                    </small>
                  </td>
                  <td className="text-success fw-bold">
                    ₹{row.value.toLocaleString()}{" "}
                    <small className="text-success">
                      <FaArrowUp size={10} className="me-1" />
                      consumption
                    </small>
                  </td>
                  <td className="text-primary fw-bold">
                    {row.percentValue}{" "}
                    <small className="text-muted">of total value</small>
                  </td>
                  <td>
                    <Badge
                      style={{
                        backgroundColor: badge.bg,
                        color: badge.color,
                        fontWeight: 500,
                        padding: "6px 12px",
                        borderRadius: "8px",
                      }}
                    >
                      {row.classification}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Card>
  );
}
