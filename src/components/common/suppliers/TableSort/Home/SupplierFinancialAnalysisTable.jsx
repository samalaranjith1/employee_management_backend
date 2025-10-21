"use client";

import React from "react";
import { Card, ButtonGroup, ToggleButton, Table } from "react-bootstrap";
import { useTableSort } from "@/components/hooks/useTableSort";
import { IconArrowsMaximize } from "@tabler/icons-react";
import { useSuppliersContext } from "@/contexts/SuppliersContext";

const SupplierFinancialAnalysisTable = ({
  table = [],
  cards = [],
  filter,
  setFilter,
}) => {
  const {isMobile} = useSuppliersContext()
  // 🔹 Prepare data for numeric sorting
  const dataForSort = table.map((row, idx) => {
    const purchase =
      typeof row.purchaseAmount === "number"
        ? row.purchaseAmount
        : parseFloat(String(row.purchaseAmount || "").replace(/₹|,/g, "")) || 0;

    const payment =
      typeof row.paymentAmount === "number"
        ? row.paymentAmount
        : parseFloat(String(row.paymentAmount || "").replace(/₹|,/g, "")) || 0;

    return {
      ...row,
      purchaseAmountNum: purchase,
      paymentAmountNum: payment,
      index: idx,
    };
  });

  const { sortedData, sortKey, direction, handleSort } =
    useTableSort(dataForSort);

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  const columns = [
    { key: "date", label: "DATE" },
    { key: "purchaseAmountNum", label: "PURCHASE AMOUNT" },
    { key: "paymentAmountNum", label: "PAYMENT AMOUNT" },
  ];

  return (
    <Card
      className="border-0 shadow-sm"
      style={{
        backgroundColor: cards[1]?.bgColor,
        borderRadius: "16px",
      }}
    >
      <Card.Body>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <div className="d-flex align-items-center mb-2 mb-md-0">
            <div
              style={{
                backgroundColor: cards[1]?.iconBg,
                width: "32px",
                height: "32px",
                borderRadius: "8px",
              }}
              className="d-flex align-items-center justify-content-center me-2"
            >
              {cards[1]?.icon}
            </div>
            <div>
              <h6 style={{
                fontWeight:'600',
                fontSize:'18px',
                color:'#232425'
              }}>{cards[1]?.title}</h6>
              {/* <small style={{ color: "#6C757D" }}>{cards[1]?.subtitle}</small> */}
            </div>
          </div>

          {/* Desktop Buttons */}
          <div className="d-none d-md-flex">
            <ButtonGroup
              style={{
                backgroundColor: "rgb(230,230,230)",
                borderRadius:'20px',
              }}>
              {["Daily", "Same Days", "Weekly", "Monthly"].map((label) => (
                <ToggleButton
                  key={label}
                  id={`table-filter-${label}`}
                  type="radio"
                  variant="outline-secondary"
                  checked={filter === label.toLowerCase()}
                  value={label.toLowerCase()}
                  onChange={(e) => setFilter(e.currentTarget.value)}
                  style={{
                    fontSize: "13px",
                    borderRadius: "20px",
                    padding: "2px 12px",
                    backgroundColor:
                      filter === label.toLowerCase() ? "#fff" : "transparent",
                    color:
                      filter === label.toLowerCase() ? "#FF5B22" : "#6C757D",
                    border:
                      filter === label.toLowerCase()
                        ? "1px solid #dee2e6"
                        : "1px solid #dee2e6",
                  }}
                >
                  {label}
                </ToggleButton>
              ))}
            </ButtonGroup>
            <span style={{marginLeft:'10px'}}><IconArrowsMaximize size={20} color="#232425" /></span>
          </div>

          {/* Mobile Buttons */}
          <div className="d-flex d-md-none w-100 mt-2 justify-content-center">
            <ButtonGroup className="w-100"
              style={{
                backgroundColor: "rgb(230,230,230)",
                borderRadius:'20px'
              }}>
              {["Daily", "Same Days", "Weekly", "Monthly"].map((label) => (
                <ToggleButton
                  key={`mobile-table-${label}`}
                  id={`table-mobile-${label}`}
                  type="radio"
                  variant="outline-secondary"
                  checked={filter === label.toLowerCase()}
                  value={label.toLowerCase()}
                  onChange={(e) => setFilter(e.currentTarget.value)}
                  style={{
                    fontSize: "13px",
                    borderRadius: "20px",
                    padding: "2px 12px",
                    backgroundColor:
                      filter === label.toLowerCase() ? "#fff" : "transparent",
                    color:
                      filter === label.toLowerCase() ? "#FF5B22" : "#6C757D",
                    border:
                      filter === label.toLowerCase()
                        ? "1px solid #dee2e6"
                        : "1px solid #dee2e6",
                  }}
                  className="flex-fill"
                >
                  {label}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </div>
        </div>

        {/* Table */}
        <div
          style={{
            maxHeight: "65vh",
            overflowY: "auto",
            overflowX: "auto",
          }}
        >
          <Table borderless style={{ marginBottom: 0, minWidth: "600px" }}>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    style={{
                      position: "sticky",
                      top: 0,
                      background: "#f4f7fc",
                      zIndex: 3,
                      fontSize: "14px",
                      color: "#232425",
                      fontWeight:'600',
                      cursor: "pointer",
                      padding: "12px 16px",
                    }}
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
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{
                      fontSize:'14px',
                      color:'#232425',
                      fontWeight:'600'
                    }}>{row.date}</div>
                    <small style={{ color: "#717182",fontWeight:'500',fontSize:'12px' }}>{row.day}</small>
                  </td>
                  <td
                    className="fw-semibold"
                    style={{ color: "#c10007", padding: "14px 16px" ,fontSize:'14px',fontWeight:'600'}}
                  >
                    ₹{row.purchaseAmount?.toLocaleString()}
                  </td>
                  <td
                    className="fw-semibold"
                    style={{ color: "#008236", padding: "14px 16px" ,fontSize:'14px',fontWeight:'600'}}
                  >
                    ₹{row.paymentAmount?.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SupplierFinancialAnalysisTable;
