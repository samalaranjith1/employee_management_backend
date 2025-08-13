"use client";
import React from "react";
import { Table, Badge } from "react-bootstrap";

export default function ProductPerformanceTable({ data }) {
  const classificationColors = {
    "Top Performers": { bg: "#d4f6e7", color: "#2a9d8f" },
    "Moderate Performers": { bg: "#fff3d4", color: "#f4a261" },
    "Low Performers": { bg: "#fceaea", color: "#e76f51" },
  };

  const barColors = {
    green: "#27ae60",
    orange: "#f4a261",
    red: "#e76f51",
  };

  return (
    <div
      style={{
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 0 10px rgb(0 0 0 / 0.05)",
      }}
    >
      {/* Wrapper div for both horizontal and vertical scrolling */}
      <div style={{ maxHeight: "65vh", overflow: "auto" }}>
        <Table
          hover
          className="mb-0"
          style={{ minWidth: 900, backgroundColor: "#fff7f0" }}
        >
          <thead
            style={{
              backgroundColor: "#fff2e8",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <tr>
              <th style={{ color: "#d85e00", fontWeight: 600 }}>Percentile</th>
              <th style={{ fontWeight: 600 }}>Products</th>
              <th style={{ fontWeight: 600 }}>Sales</th>
              <th style={{ fontWeight: 600 }}>Sales %</th>
              <th style={{ fontWeight: 600 }}>Margin</th>
              <th style={{ fontWeight: 600 }}>Margin %</th>
              <th style={{ fontWeight: 600 }}>Classification</th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              (
                {
                  percentile,
                  products,
                  sales,
                  salesPercent,
                  margin,
                  marginPercent,
                  classification,
                  barColor,
                },
                idx
              ) => {
                const classColor = classificationColors[classification] || {
                  bg: "#eee",
                  color: "#444",
                };
                return (
                  <tr
                    key={idx}
                    style={{
                      backgroundColor: idx % 2 === 0 ? "#fff8f0" : "white",
                    }}
                  >
                    <td
                      className="d-flex align-items-center gap-2"
                      style={{ fontWeight: 600 }}
                    >
                      <div
                        style={{
                          width: 8,
                          height: 28,
                          backgroundColor: barColors[barColor] || "#27ae60",
                          borderRadius: 4,
                        }}
                      />
                      {percentile}
                    </td>
                    <td style={{ fontWeight: "bold" }}>{products}</td>
                    <td>₹{sales}</td>
                    <td>{salesPercent}</td>
                    <td style={{ color: "#7f3fff", fontWeight: 600 }}>
                      ₹{margin}
                    </td>
                    <td style={{ color: "#7f3fff", fontWeight: 600 }}>
                      {marginPercent}
                    </td>
                    <td>
                      <Badge
                        style={{
                          backgroundColor: classColor.bg,
                          color: classColor.color,
                          fontWeight: 600,
                          padding: "4px 10px",
                          borderRadius: "10px",
                        }}
                      >
                        {classification}
                      </Badge>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
