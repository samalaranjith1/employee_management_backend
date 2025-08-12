"use client";
import React from "react";
import { Table } from "react-bootstrap";

function KitchenPurchaseByDepartmentTable({ data, badgeStyle }) {
  return (
    <Table
      bordered
      className="align-middle shadow-sm mb-2"
      style={{ minWidth: "900px" }}
    >
      <thead>
        <tr>
          {[
            "Department",
            "Consumption%",
            "Net Consumption%",
            "Sales",
            "Opening",
            "Consumption",
            "Closing",
            "Net Consumption",
            "Budget",
          ].map((heading, idx) => (
            <th
              key={idx}
              style={{
                background: "#f5f7fa",
                position: "sticky",
                top: 0,
                zIndex: 2,
              }}
            >
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((dept, idx) => (
          <tr key={idx}>
            <td style={{ backgroundColor: dept.bg }}>
              <div className="fw-bold">{dept.name}</div>
              <small className="text-muted">Department</small>
            </td>
            <td style={{ backgroundColor: dept.bg }}>
              <span style={badgeStyle}>{dept.consumptionPct}</span>
            </td>
            <td style={{ backgroundColor: dept.bg }}>
              <span style={badgeStyle}>{dept.netConsumptionPct}</span>
            </td>
            <td
              style={{ backgroundColor: dept.bg }}
              className="fw-bold text-success"
            >
              {dept.sales}
            </td>
            <td style={{ backgroundColor: dept.bg }}>{dept.opening}</td>
            <td style={{ backgroundColor: dept.bg }}>{dept.consumption}</td>
            <td style={{ backgroundColor: dept.bg }}>{dept.closing}</td>
            <td style={{ backgroundColor: dept.bg }} className="fw-bold">
              {dept.netConsumption}
            </td>
            <td style={{ backgroundColor: dept.bg }}>{dept.budget}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default KitchenPurchaseByDepartmentTable;
