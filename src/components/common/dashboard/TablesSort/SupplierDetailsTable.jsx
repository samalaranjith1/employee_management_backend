"use client";
import React from "react";
import { Table, Badge } from "react-bootstrap";
import BaseSurface from "./BaseSurface";
import { useTableSort } from "@/components/hooks/useTableSort";
import { handleNavigation } from "@/utils";
import { useRouter } from "next/navigation";
import { useDashboardContext } from "@/contexts/DashboardContext";

export default function SupplierDetailsTable({ supplierData }) {
  // ✅ Sorting hook
  const sort = useTableSort(supplierData || []);
  const router = useRouter()
  const {
    dashboardFilter,
    startDate: startDate,
    endDate: endDate,
  } = useDashboardContext();

  // ✅ Render sort arrow
  const renderSortArrow = (key) =>
    sort.sortKey === key ? (sort.direction === "asc" ? " ↑" : " ↓") : "";

  // ✅ Define columns
  const columns = [
    { key: "supplier", label: "Supplier" },
    { key: "purchase", label: "Purchase" },
    { key: "items", label: "Items" },
  ];

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
              backgroundColor: "#fff",
              zIndex: 5,
            }}
          >
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ fontWeight: 600, cursor: "pointer" }}
                  onClick={() => sort.handleSort(col.key)}
                >
                  {col.label}
                  {renderSortArrow(col.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sort.sortedData.map((row, idx) => (
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
                <td
                  style={{
                    color: "#16a34a",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    handleNavigation({
                      router,
                      url: "suppliers",
                      params: {
                        startDate: startDate,
                        endDate: endDate,
                        suppliers: row?.supplierId,
                      },
                    })
                  }
                >
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
