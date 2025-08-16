"use client";
import React from "react";
import { Table, Badge } from "react-bootstrap";
import BaseSurface from "./BaseSurface";

export default function SupplierDetailsTable({ supplierData }) {
  return (
    <BaseSurface title="Supplier Details">
      {/* 👇 custom scroll wrapper */}
      <div
        style={{
          maxHeight: "60vh",
          overflowY: "auto",
          overflowX: "auto",
        }}
      >
        <Table hover className="mb-0" style={{ minWidth: 600 }}>
          <thead
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "#fff", // ensure opaque background
              zIndex: 5,
            }}
          >
            <tr>
              <th style={{ fontWeight: 600 }}>Supplier</th>
              <th style={{ fontWeight: 600 }}>Purchase</th>
              <th style={{ fontWeight: 600 }}>Items</th>
            </tr>
          </thead>
          <tbody>
            {supplierData.map((row, idx) => (
              <tr key={idx}>
                <td>
                  <div className="fw-semibold">{row.supplier}</div>
                  <div className="d-flex gap-1">
                    <Badge bg="light" text="dark">
                      {row.category}
                    </Badge>
                    <span style={{ color: "#64748b", fontSize: "0.85rem" }}>
                      {row.location}
                    </span>
                  </div>
                </td>
                <td style={{ color: "#16a34a", fontWeight: 600 }}>
                  {row.purchase}
                </td>
                <td>{row.items}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </BaseSurface>
  );
}
