"use client";
import React from "react";
import BaseSurface from "./BaseSurface";
import { useTableSort } from "@/components/hooks/useTableSort";
import { handleNavigation } from "@/utils";
import { useRouter } from "next/navigation";
import { useDashboardContext } from "@/contexts/DashboardContext";

function OutOfStockTable({ data, getBadgeStyle }) {
  const router = useRouter()
  const {
    dashboardFilter,
    startDate: startDate,
    endDate: endDate,
  } = useDashboardContext();
  const { sortedData, sortKey, direction, handleSort } = useTableSort(data);

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  // ✅ Define columns
  const columns = [
    { key: "name", label: "Item" },
    { key: "moq", label: "MOQ", align: "center" },
    { key: "stock", label: "Stock", align: "center" },
    { key: "status", label: "Status", align: "center" },

  ];

  return (
    <BaseSurface>
      <div
        style={{
          border: "1px solid #eee",
          borderRadius: "12px",
          overflow: "hidden",
          marginTop:'-10px'
        }}
      >
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#F9FAFB",
              fontWeight: "bold",
              display: "grid",
              gridTemplateColumns: "40% 15% 20% 25%",
              padding: "0 1rem",
              position: "sticky",
              top: 0,
              zIndex: 2,
              cursor: "pointer",
            }}
          >
            {columns.map((col) => (
              <span
                key={col.key}
                style={{
                  textAlign: col.align || "left",
                  backgroundColor: '#f5f5f5',
                  color: '#464f60',
                  fontWeight: '600',
                  fontSize: '14px',
                  padding: '5px'
                }}
                onClick={() => handleSort(col.key)}
              >
                {col.label}
                {renderSortArrow(col.key)}
              </span>
            ))}
          </div>

          {/* Body */}
          <div
            style={{
              maxHeight: "60vh",
              overflowY: "auto",
              background: "#fff",
            }}
          >
            {sortedData.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "grid",
                  gridTemplateColumns: "40% 15% 20% 25%",
                  alignItems: "center",
                  padding: "0.6rem 1rem",
                  background: "#FDFDFD",
                  borderBottom: "1px solid #eee",
                }}
              >
                {/* Item details */}
                <div>
                  <div style={{ fontWeight: "500", color: '#171c26', fontSize: "14px", }}>
                    {item.name}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: '400',
                      color: "#687182",
                      display: "flex",
                      gap: "0.5rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <span>{item.category}</span>
                    <span>•</span>
                    <span>{item.size}</span>
                    <span>•</span>
                    <span>{item.code}</span>
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#777",
                      marginTop: "2px",
                    }}
                  >
                    Closing: {item.closing}
                  </div>
                </div>

                {/* MOQ */}
                <div
                  style={{ textAlign: "center", cursor: "pointer" }}
                  onClick={() =>
                    handleNavigation({
                      router,
                      url: "sp/ware_house_analytics",
                      params: {
                        startDate: startDate,
                        endDate: endDate,
                        items: item?.itemId,
                      },
                    })
                  }
                >
                  <div style={{
                    fontWeight: '700',
                    fontSize: '14px',
                    color: '#464f60'
                  }}>{Number(item.moq.split(' ')[0])?.toLocaleString()}</div>
                  <div
                    style={{
                      fontWeight: '500',
                      color: '#464f60',
                      fontSize: '12px'
                    }}>{item.moq.split(' ')[1]?.toLowerCase()}</div>

                </div>

                {/* Stock + Status stacked */}
                <div
                  style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <div style={{
                    fontWeight: '700',
                    fontSize: '14px',
                    color: '#464f60'
                  }}>{Number(item.stock.split(' ')[0])?.toLocaleString()}</div>
                  <div
                    style={{
                      fontWeight: '500',
                      color: '#464f60',
                      fontSize: '12px'
                    }}>{item.stock.split(' ')[1]?.toLowerCase()}</div>
                  {/* <div>{item.stock}</div> */}
                </div>
                <div
                  style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span style={{ ...getBadgeStyle(item.status), backgroundColor: 'rgba(250, 212, 212, 1)', color: 'red' }}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          {/* <div
            style={{
              background: "#F9FAFB",
              padding: "0.8rem 1rem",
              fontWeight: "500",
              position: "sticky",
              bottom: 0,
              zIndex: 2,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            Total Items: {sortedData.length}
          </div> */}
        </div>
      </div>
    </BaseSurface>
  );
}

export default OutOfStockTable;
