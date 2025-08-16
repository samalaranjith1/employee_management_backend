"use client";
import React from "react";
import { Table, Badge } from "react-bootstrap";
import BaseSurface from "./BaseSurface";

function ItemConsumptionEffieciencyTable({ tableData, wasteBadge }) {
  return (
    <BaseSurface
      title="Detailed Item Consumption Analysis"
      subtitle="Comprehensive consumption vs sales comparison with efficiency metrics"
      maxHeight="65vh"
    >
      <div style={{ maxHeight: "60vh", overflowY: "auto", overflowX: "auto" }}>
        <Table
          striped
          hover
          className="mb-0 align-middle"
          style={{ minWidth: "800px" }}
        >
          <thead className="table-light">
            <tr>
              {[
                "Item Details",
                "Department",
                "Consumed",
                "Sales Qty",
                "Difference",
                "Waste %",
                "Cost Impact",
                "Status",
              ].map((header, i) => (
                <th
                  key={i}
                  style={{
                    position: "sticky",
                    top: 0,
                    background: "#f8f9fa", // same as .table-light
                    zIndex: 2,
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={idx}>
                <td>{row.item}</td>
                <td>
                  <Badge bg="light" text="dark">
                    {row.region}
                  </Badge>
                </td>
                <td>{row.consumed}</td>
                <td>{row.sales}</td>
                <td
                  style={{
                    color: row.diff.startsWith("+") ? "red" : "green",
                    fontWeight: "bold",
                  }}
                >
                  {row.diff}
                </td>
                <td>
                  <Badge
                    bg={
                      row.wasteType === "Critical"
                        ? "danger"
                        : row.wasteType === "Medium"
                        ? "warning"
                        : "success"
                    }
                    text={row.wasteType === "Medium" ? "dark" : "light"}
                  >
                    {row.waste}
                  </Badge>
                </td>
                <td>{row.cost}</td>
                <td>{wasteBadge(row.wasteType)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </BaseSurface>
  );
}

export default ItemConsumptionEffieciencyTable;
