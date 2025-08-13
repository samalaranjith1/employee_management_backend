"use client";

import React from "react";
import { Table, Badge } from "react-bootstrap";

export default function SupplierDetailsTable({ supplierData }) {
  return (
    <>
      <div className="fw-semibold mb-2">Supplier Details</div>
      <Table hover responsive>
        <thead>
          <tr>
            <th>Supplier</th>
            <th>Purchase</th>
            <th>Items</th>
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
              <td style={{ color: "#16a34a", fontWeight: "600" }}>
                {row.purchase}
              </td>
              <td>{row.items}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
