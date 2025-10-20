"use client";

import React from "react";
import { Table, Badge } from "react-bootstrap";
import { useTableSort } from "@/components/hooks/useTableSort";
import { useTableControls } from "@/components/hooks/useTableControls";
import { TableControls } from "@/components/common/TableControls";
import { handleNavigation } from "@/utils";
import { useRouter } from "next/navigation";
import { useDepartmentContext } from "@/contexts/DepartmentContext";
export default function DepartmentPeriodDropDownTable({ table = [] }) {
  // 🔹 Sorting
  const { sortedData, sortKey, direction, handleSort } = useTableSort(table);
  const router = useRouter();
  // 🔹 Columns
  const columns = [
    // { key: "index", label: "#" },
    { key: "date", label: "Date" },
    { key: "sales", label: "Sales" },
    { key: "consumption", label: "Consumption" },
    { key: "waste", label: "Waste" },
    { key: "costRatio", label: "Cost Ratio" },
  ];

  // 🔹 Filters (by day)
  const filtersConfig = {
    day: ["All", ...Array.from(new Set(table.map((t) => t.day)))],
  };

  // 🔹 Table controls (search + filters + export)
  const {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    filteredData,
    handleExport,
  } = useTableControls({
    data: sortedData,
    columns,
    searchFields: ["day"], // you can add other searchable fields
    filtersConfig,
  });

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";
  const {startDate, endDate} = useDepartmentContext();

  return (
    <div>
      {/* 🔹 Controls */}
      <TableControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        filtersConfig={filtersConfig}
        handleExport={handleExport}
        searchable={true}
        filterable={true}
        exportable={true}
      />

      {/* 🔹 Table with sticky header & max-height */}
      <div
        style={{
          maxHeight: "65vh",
          overflowY: "auto",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="hide-scrollbar"
      >
        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <Table
          hover
          className="align-middle mb-0 text-nowrap"
          style={{ minWidth: "700px" }}
        >
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{
                    background: "#f4f7fc",
                    fontWeight: 700,
                    fontSize: "14px",
                    textTransform: "uppercase",
                    color: "#464f60",
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                    cursor: "pointer",
                    padding: "12px 16px",
                    minWidth: col.key === "date" ? "150px" : "120px",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {col.label}
                  {renderSortArrow(col.key)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => {
                const today = new Date();
                const rowDate = new Date(row.rawDate || row.date);
                const isToday =
                  rowDate.getDate() === today.getDate() &&
                  rowDate.getMonth() === today.getMonth() &&
                  rowDate.getFullYear() === today.getFullYear();

                const formattedDate = rowDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
                const formattedDay = rowDate.toLocaleDateString("en-US", {
                  weekday: "long",
                });

                return (
                  <tr
                    // key={row.index}
                    style={{ borderBottom: "1px solid #eee" }}
                  >
                    {/* <td style={{ padding: "14px 16px" }}>{row.index}</td> */}
                    <td style={{ padding: "14px 16px", fontWeight:600, fontSize:"14px", color:"#171c26" }}>
                      <div className="" style={{ fontSize: 14 }}>
                        {formattedDate}{" "}
                        {isToday && (
                          <span className="" style={{ fontSize: "12px", fontWeight:400, color:"#171c26" }}>
                            (Today)
                          </span>
                        )}
                      </div>
                      <div
                        className="text-muted"
                        style={{ fontSize: "12px", marginTop: 2, fontWeight:400, color:"#687182" }}
                      >
                        {formattedDay}
                      </div>
                    </td>
                    <td
                      style={{ fontSize: "14px", cursor: "pointer", fontWeight:700, color:"#464f60" }}
                      onClick={() =>
                        handleNavigation({
                          router,
                          url: "sp/sales_analytics",
                          params: { startDate: startDate, endDate: endDate },
                        })
                      }
                    >
                      ₹{row.sales?.toLocaleString()}
                    </td>
                    <td
                      style={{ fontSize: "14px", cursor: "pointer", fontWeight:700, color: "#464f60" }}
                      onClick={() =>
                        handleNavigation({
                          router,
                          url: "sp/consumption_analytics",
                          params: { startDate: startDate, endDate: endDate },
                        })
                      }
                    >
                      ₹{row.consumption?.toLocaleString()}
                    </td>
                    <td
                      style={{ fontSize:"14px", fontWeight:700, cursor: "pointer",color:"#464f60" }}
                      onClick={() =>
                        handleNavigation({
                          router,
                          url: "sp/wastage_analytics",
                          params: { startDate: startDate, endDate: endDate },
                        })
                      }
                    >
                      ₹{row.waste?.toLocaleString()}
                    </td>
                    <td>
                      <Badge
                        bg=""
                        style={{
                          backgroundColor: row.costColor,
                          fontSize: 12,
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontWeight: 500,
                          color: "#fff",
                        }}
                      >
                        {row.costRatio.toFixed(1)}%
                      </Badge>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#888",
                    fontStyle: "italic",
                  }}
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
