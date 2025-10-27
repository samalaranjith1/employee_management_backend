"use client";

import React from "react";
import { Table } from "react-bootstrap";
import { useTableSort } from "@/components/hooks/useTableSort";

export default function ProductsIngreidentAnalysisTable({ tableData }) {
  // Prepare numeric values for sorting
  const dataForSort = tableData.map((row, idx) => {
    const recipeNum =
      parseFloat(String(row.recipe || "").replace(/₹|,/g, "")) || 0;
    const totalNum =
      parseFloat(String(row.total || "").replace(/₹|,/g, "")) || 0;

    return { ...row, recipeNum, totalNum, index: idx };
  });

  const { sortedData, sortKey, direction, handleSort } =
    useTableSort(dataForSort);

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  const columns = [
    { key: "name", label: "Item (Raw Material)" },
    { key: "recipeNum", label: "Recipe (Price, Qty)" },
    { key: "totalNum", label: "Total Cost (Price, Qty)" },
  ];

  return (
    <div style={{ maxHeight: "65vh", overflowY: "auto" }}>
      <Table hover className="align-middle mb-0">
        <thead
          style={{
            position: "sticky",
            top: 0,
            background: "#fff",
            zIndex: 3,
          }}
        >
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                style={{
                  cursor: "pointer",
                  fontSize: '14px',
                  fontWeight: '600',
                  color: "#232425",
                  textAlign: "left",
                  background: '#f4f7fc'
                }}
              >
                {col.label}
                {renderSortArrow(col.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr key={row.key}>
              <td>
                <div className="d-flex align-items-center gap-2">
                  {/* {row.icon} */}
                  <div>
                    <div className="" style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: "#232425",
                      textAlign: "left",
                    }}>{row.name}</div>
                    <small className="text-muted" style={{ fontWeight: 500, fontSize: "12px", }}>{row.storeItem}</small>
                  </div>
                </div>
              </td>
              <td className="text-primary">
                <div className="d-flex align-items-center gap-2">
                  {/* {row.icon} */}
                  <div>
                    <div className="" style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      textAlign: "left", color: "#1447E6"
                    }}>{row.recipe?.split(".")[0]}</div>
                    <small className="text-muted" style={{ fontweight: 500, fontSize: "12px",}}>{row.recipe?.split(".")[1]}</small>
                  </div>
                </div>
              </td>
              <td className="text-success">
                <div className="d-flex align-items-center gap-2">
                  {/* {row.icon} */}
                  <div>
                    <div className="" style={{ fontweight: 600, fontSize: "14px", color: "#008236" }}>{row.total?.split(".")[0]}</div>
                    <small className="text-muted" style={{ fontweight: 500, fontSize: "12px", }}>{row.total?.split(".")[1]}</small>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
