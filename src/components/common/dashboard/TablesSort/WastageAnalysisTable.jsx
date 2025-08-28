"use client";
import React from "react";
import { Row, Col } from "react-bootstrap";
import { FaBox, FaClock, FaUtensils } from "react-icons/fa";
import BaseSurface from "./BaseSurface";
import { useTableSort } from "@/components/hooks/useTableSort";

function WastageAnalysisTable({
  expiredItems,
  expiredProducts,
  rawMaterialWastage,
  tableCardStyle,
  scrollBodyStyle,
}) {
  // ✅ Sorting hooks for each dataset
  const rawSort = useTableSort(rawMaterialWastage || []);
  const expiredItemsSort = useTableSort(expiredItems || []);
  const expiredProductsSort = useTableSort(expiredProducts || []);

  const renderSortArrow = (sort, key) =>
    sort.sortKey === key ? (sort.direction === "asc" ? " ↑" : " ↓") : "";

  return (
    <Row className="g-3 mt-3">
      <Col md={4}>
        <BaseSurface
          title={
            <span className="d-flex align-items-center gap-2">
              <FaBox style={{ color: "#00bcd4" }} /> Raw Material Wastage
            </span>
          }
          containerStyle={tableCardStyle}
          bodyStyle={scrollBodyStyle}
        >
          {/* Sortable header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 600,
              marginBottom: 8,
              cursor: "pointer",
            }}
            onClick={() => rawSort.handleSort("total")}
          >
            <span>Name / Category</span>
            <span>Total{renderSortArrow(rawSort, "total")}</span>
          </div>

          {rawSort.sortedData.map((item, idx) => (
            <div
              key={idx}
              className="d-flex align-items-center justify-content-between py-2 border-bottom"
            >
              <div className="d-flex align-items-center gap-3">
                <div style={{ fontSize: "20px", color: "#00bcd4" }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontWeight: "500" }}>{item.name}</div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    {item.category} • {item.qty} • ₹{item.price}
                  </div>
                </div>
              </div>
              <div style={{ fontWeight: "600" }}>₹{item.total}</div>
            </div>
          ))}
        </BaseSurface>
      </Col>

      <Col md={4}>
        <BaseSurface
          title={
            <span className="d-flex align-items-center gap-2">
              <FaClock style={{ color: "#3f51b5" }} /> Expired Items
            </span>
          }
          containerStyle={tableCardStyle}
          bodyStyle={scrollBodyStyle}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 600,
              marginBottom: 8,
              cursor: "pointer",
            }}
            onClick={() => expiredItemsSort.handleSort("total")}
          >
            <span>Name / Category</span>
            <span>Total{renderSortArrow(expiredItemsSort, "total")}</span>
          </div>

          {expiredItemsSort.sortedData.map((item, idx) => (
            <div
              key={idx}
              className="d-flex align-items-center justify-content-between py-2 border-bottom"
            >
              <div>
                <div style={{ fontWeight: "500" }}>{item.name}</div>
                <div style={{ fontSize: "12px", color: "#666" }}>
                  {item.category} • {item.qty} • ₹{item.price}
                </div>
                <div style={{ fontSize: "12px", color: "#3f51b5" }}>
                  Expired: {item.date}
                </div>
              </div>
              <div style={{ fontWeight: "600" }}>₹{item.total}</div>
            </div>
          ))}
        </BaseSurface>
      </Col>

      <Col md={4}>
        <BaseSurface
          title={
            <span className="d-flex align-items-center gap-2">
              <FaUtensils style={{ color: "#7b1fa2" }} /> Expired Products
            </span>
          }
          containerStyle={tableCardStyle}
          bodyStyle={scrollBodyStyle}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 600,
              marginBottom: 8,
              cursor: "pointer",
            }}
            onClick={() => expiredProductsSort.handleSort("total")}
          >
            <span>Name / Category</span>
            <span>Total{renderSortArrow(expiredProductsSort, "total")}</span>
          </div>

          {expiredProductsSort.sortedData.map((item, idx) => (
            <div
              key={idx}
              className="d-flex align-items-center justify-content-between py-2 border-bottom"
            >
              <div>
                <div style={{ fontWeight: "500" }}>{item.name}</div>
                <div style={{ fontSize: "12px", color: "#666" }}>
                  {item.category} • ₹{item.price}
                </div>
                <div style={{ fontSize: "12px", color: "#7b1fa2" }}>
                  Prepared: {item.date}
                </div>
              </div>
              <div style={{ fontWeight: "600" }}>₹{item.total}</div>
            </div>
          ))}
        </BaseSurface>
      </Col>
    </Row>
  );
}

export default WastageAnalysisTable;
