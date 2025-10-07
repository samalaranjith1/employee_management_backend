"use client";

import React from "react";
import { Card, Table } from "react-bootstrap";
import { useTableSort } from "@/components/hooks/useTableSort";
import { IconCalendar } from "@tabler/icons-react";

export default function ItemsPurchaseTrendAnalysisTable({
  tableData = [],
  filter,
}) {
  const original = Array.isArray(tableData) ? tableData : [];

  const parseNumber = (val) => {
    if (val == null) return NaN;
    if (typeof val === "number") return val;
    const s = String(val).replace(/[^0-9.-]+/g, "");
    return s === "" ? NaN : parseFloat(s);
  };

  const parseDateOrString = (val) => {
    if (!val && val !== 0) return "";
    const s = String(val)
      .replace(/\(.*\)/, "")
      .trim();
    const ts = Date.parse(s);
    return isNaN(ts) ? s : ts;
  };

  const sortableData = original.map((row, idx) => {
    const dateLabel = row?.date?.label ?? row?.date ?? "";
    const quantityLabel = row?.quantity?.label ?? row?.quantity ?? "";
    const totalPriceLabel = row?.totalPrice?.label ?? row?.totalPrice ?? "";
    const avgPriceLabel = row?.avgPrice?.label ?? row?.avgPrice ?? "";

    return {
      date: parseDateOrString(dateLabel),
      quantity: parseNumber(quantityLabel),
      totalPrice: parseNumber(totalPriceLabel),
      avgPrice: parseNumber(avgPriceLabel),
      _origIndex: idx,
    };
  });

  const { sortedData, sortKey, direction, handleSort } =
    useTableSort(sortableData);

  const finalRows = sortedData.map((sd) => original[sd._origIndex]);

  const columns = [
    { key: "date", label: "Date" },
    { key: "quantity", label: "Total Quantity" },
    { key: "totalPrice", label: "Total Price" },
    { key: "avgPrice", label: "Avg Price" },
  ];

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  // footer summary (totals)
  const footer = {
    quantity: finalRows.reduce(
      (sum, r) => sum + (parseNumber(r?.quantity?.label ?? r?.quantity) || 0),
      0
    ),
    totalPrice: finalRows.reduce(
      (sum, r) =>
        sum + (parseNumber(r?.totalPrice?.label ?? r?.totalPrice) || 0),
      0
    ),
    avgPrice:
      finalRows.length > 0
        ? finalRows.reduce(
          (sum, r) =>
            sum + (parseNumber(r?.avgPrice?.label ?? r?.avgPrice) || 0),
          0
        ) / finalRows.length
        : 0,
  };

  return (
    <Card
      className="shadow-lg border-0 rounded-4"
      style={{
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      }}
    >
      <Card.Body>
        <div className="d-flex align-items-center mb-3" style={{backgroundColor:'white'}}>
          {/* Gradient icon circle */}
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2563eb, #3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "12px",
            }}
          >
            <span style={{ color: "#fff", fontWeight: "bold" }}>
              <div
                style={{
                  background: 'linear-gradient(135deg, #2196F3 0%, #18A8E7 100%)',
                  borderRadius: '14px',
                  padding: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                }}
              >
                <IconCalendar size={24} stroke={2} color="#fff" />
              </div>
            </span>
          </div>
          <div>
            <h5 className="fw-bold mb-0">
              {filter.charAt(0).toUpperCase() + filter.slice(1)} Purchase Data
            </h5>
            <small className="text-muted">
              Detailed breakdown of purchase metrics by date
            </small>
          </div>
        </div>

        {/* Scrollable table */}
        <div
          className="hide-scrollbar"
          style={{
            maxHeight: "65vh",
            overflowY: "auto",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <Table hover className="align-middle mb-0 text-nowrap">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    style={{
                      background: "#f5f5f5",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      color: "#000",
                      position: "sticky",
                      top: 0,
                      zIndex: 2,
                      cursor: "pointer",
                      padding: "14px 18px",
                    }}
                  >
                    {col.label}
                    {renderSortArrow(col.key)}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {finalRows.length > 0 ? (
                finalRows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="fw-semibold">
                      <span className="bg-secondary me-2"></span>
                      {/* {row?.date?.icon} */}
                      {row?.date?.label ?? row?.date ?? ""}
                    </td>
                    <td className="fw-bold text-primary">
                      <span className="dot bg-primary me-2"></span>
                      {/* {row?.quantity?.icon} */}
                      {row?.quantity?.label ?? row?.quantity ?? ""}
                    </td>
                    <td className="fw-bold text-success">
                      <span className="dot bg-success me-2"></span>
                      {/* {row?.totalPrice?.icon} */}
                      {row?.totalPrice?.label ?? row?.totalPrice ?? ""}
                    </td>
                    <td className="fw-bold" style={{ color: "#6D28D9" }}>
                      <span
                        className="dot"
                        style={{ background: "#6D28D9" }}
                      ></span>
                      {row?.avgPrice?.label ?? row?.avgPrice ?? ""}
                    </td>
                  </tr>
                ))
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

            {/* Colored footer row */}
            {finalRows.length > 0 && (
              <tfoot>
                <tr style={{ background: "#f0fdf4", fontWeight: "bold" }}>
                  <td>Total</td>
                  <td className="text-primary">{footer.quantity}</td>
                  <td className="text-success">{footer.totalPrice}</td>
                  <td style={{ color: "#6D28D9" }}>
                    {footer.avgPrice.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            )}
          </Table>
        </div>

        {/* Extra styles */}
        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 6px;
          }
          tbody tr:nth-child(even) {
            background: #fafafa;
          }
          tbody tr:hover {
            background: #f3f4f6;
          }
        `}</style>
      </Card.Body>
    </Card>
  );
}
