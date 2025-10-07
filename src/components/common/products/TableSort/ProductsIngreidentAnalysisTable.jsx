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
                style={{ cursor: "pointer", whiteSpace: "nowrap", backgroundColor: "rgb(248,248,248" }}
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
                    <div className="fw-semibold">{row.name}</div>
                    <small className="text-muted">{row.storeItem}</small>
                  </div>
                </div>
              </td>
              <td className="text-primary fw-semibold">
                <div className="d-flex align-items-center gap-2">
                  {/* {row.icon} */}
                  <div>
                    <div className="fw-semibold">{row.recipe?.split(".")[0]}</div>
                    <small className="text-muted">{row.recipe?.split(".")[1]}</small>
                  </div>
                </div>
              </td>
              <td className="text-success fw-semibold">
                <div className="d-flex align-items-center gap-2">
                  {/* {row.icon} */}
                  <div>
                    <div className="fw-semibold">{row.total?.split(".")[0]}</div>
                    <small className="text-muted">{row.total?.split(".")[1]}</small>
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
