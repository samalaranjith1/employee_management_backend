"use client";
import React from "react";
import { Table, Badge } from "react-bootstrap";
import BaseSurface from "./BaseSurface";
import { useTableSort } from "@/components/hooks/useTableSort";
import { handleNavigation } from "@/utils";
import { useRouter } from "next/navigation";

function PeriodDataBreakDownTable({ data, filters }) {
  const router = useRouter();

  // ✅ use sorting hook
  const { sortedData, sortKey, direction, handleSort } = useTableSort(
    data.table || []
  );

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  // ✅ Define columns
  const columns = [
    { key: "date", label: "DATE" },
    { key: "sales", label: "SALES" },
    { key: "consumption", label: "CONSUMPTION" },
    { key: "waste", label: "WASTE" },
    { key: "ratio", label: "COST RATIO" },
  ];

  return (
    <BaseSurface>
      <Table bordered hover className="m-0">
        <thead
          style={{ position: "sticky", top: 0, background: "#fff", zIndex: 1 }}
        >
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="fw-bold"
                style={{
                  cursor: "pointer",
                  backgroundColor: "rgb(250,250,150",
                }}
                onClick={() => handleSort(col.key)}
              >
                {col.label}
                {renderSortArrow(col.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, idx) => (
            <tr key={idx}>
              <td>
                {row.date}
                {row.day && (
                  <>
                    <br />
                    <small>{row.day}</small>
                  </>
                )}
              </td>
              <td
                onClick={() =>
                  handleNavigation({
                    router,
                    url: "sp/sales_analytics",
                    params: filters,
                  })
                }
                style={{ cursor: "pointer" }}
              >
                {row.sales}
              </td>
              <td
                onClick={() =>
                  handleNavigation({
                    router,
                    url: "sp/consumption_analytics",
                    params: filters,
                  })
                }
                style={{ cursor: "pointer" }}
              >
                {row.consumption}
              </td>
              <td
                onClick={() =>
                  handleNavigation({
                    router,
                    url: "sp/wastage_analytics",
                    params: filters,
                  })
                }
                style={{ cursor: "pointer" }}
              >
                {row.waste}
              </td>
              <td>
                <Badge bg="warning" text="dark">
                  {row.ratio}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </BaseSurface>
  );
}

export default PeriodDataBreakDownTable;
