"use client";
import React from "react";
import { Table, Badge } from "react-bootstrap";
import BaseSurface from "./BaseSurface";
import { useTableSort } from "@/components/hooks/useTableSort";
import { handleNavigation } from "@/utils";
import { useRouter } from "next/navigation";
import { useDashboardContext } from "@/contexts/DashboardContext";
import '@/app/globals.css';

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
              backgroundColor: "#f4f7fc",
              zIndex: 5,
            }}
          >
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{
                    fontWeight: 600, cursor: "pointer",
                    backgroundColor: "#f4f7fc",
                    color: "#464f60"
                  }}
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
                  <div style={{
                    fontWeight: 500,
                    fontSize: '14px',
                    color: '#171c26'
                  }}>{row.supplier}</div>
                  <div className="d-flex gap-1">
                    <div style={{
                      fontWeight: 400,
                      fontSize: '12px',
                      color: '#687182'
                    }}>
                      {row.category}
                    </div>
                    <span style={{
                      fontWeight: 400,
                      fontSize: '12px',
                      color: '#687182'
                    }}>
                      {row.location}
                    </span>
                  </div>
                </td>
                <td
                  style={{
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#464f60"
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
                <td style={{
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "#464f60"
                }}>{row.items}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </BaseSurface>
  );
}
