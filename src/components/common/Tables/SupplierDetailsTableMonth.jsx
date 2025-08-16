"use client";

import React from "react";
import { Table, Badge } from "react-bootstrap";
import BaseSurface from "@/components/common/Tables/BaseSurface";

export default function SupplierDetailsTableMonth({ supplierData }) {
  return (
    <BaseSurface title="Top Suppliers" maxHeight="50vh">
      {/* The scroll container must be here, wrapping the table */}
      <div style={{ maxHeight: "45vh", overflowY: "auto" }}>
        <Table hover>
          <thead>
            <tr>
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  background: "#fff",
                  zIndex: 2,
                }}
              >
                Supplier
              </th>
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  background: "#fff",
                  zIndex: 2,
                }}
              >
                Purchase
              </th>
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  background: "#fff",
                  zIndex: 2,
                }}
              >
                Items
              </th>
            </tr>
          </thead>
          <tbody>
            {supplierData.suppliersList.map((row, idx) => (
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
                <td style={{ color: "#16a34a", fontWeight: "600" }}>
                  ₹{row.purchase.toLocaleString()}
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
