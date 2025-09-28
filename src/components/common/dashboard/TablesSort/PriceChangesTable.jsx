"use client";
import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import { FaExclamationCircle } from "react-icons/fa";
import BaseSurface from "./BaseSurface";
import { useTableSort } from "@/components/hooks/useTableSort";
import { handleNavigation } from "@/utils";
import { useRouter } from "next/navigation";
import { useDashboardContext } from "@/contexts/DashboardContext";

function PriceChangesTable({ styles, recentChanges, futureHikes }) {
  const recentSort = useTableSort(recentChanges || []);
  const futureSort = useTableSort(futureHikes || []);

  const renderSortArrow = (sort, key) =>
    sort.sortKey === key ? (sort.direction === "asc" ? " ↑" : " ↓") : "";

  const columns = [
    { key: "name", label: "ITEM" },
    { key: "category", label: "CATEGORY" },
    { key: "date", label: "DATE" },
    { key: "oldPrice", label: "OLD PRICE" },
    { key: "newPrice", label: "NEW PRICE" },
    { key: "change", label: "CHANGE" },
    { key: "percent", label: "PERCENT" },
  ];

  const renderScrollableTable = (
    sortHook,
    footerText,
    footerAmount,
    dateLabel,
    dateClass
  ) => {
    const {
      dashboardFilter,
      startDate: startDate,
      endDate: endDate,
    } = useDashboardContext();
    const router = useRouter()
    return (
      <div style={{ maxHeight: "400px", overflowY: "auto", overflowX: "auto" }}>
        <Table hover className="mb-0" style={{ minWidth: "700px" }}>
          <thead
            style={{
              position: "sticky",
              top: 0,
              background: "#fff",
              zIndex: 5,
              borderBottom: "1px solid #ddd",
            }}
          >
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ cursor: "pointer", whiteSpace: "nowrap" }}
                  onClick={() => sortHook.handleSort(col.key)}
                >
                  {col.label}
                  {renderSortArrow(sortHook, col.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={styles?.tableBody}>
            {sortHook.sortedData.map((item, idx) => (
              <tr
                key={idx}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  handleNavigation({
                    router,
                    url: "sp/item_price_change_analytics",
                    params: {
                      startDate: startDate,
                      endDate: endDate,
                      items: item?.itemId,
                    },
                  })
                }
              >
                <td className="fw-bold">{item.name}</td>
                <td className="text-muted">{item.category}</td>
                <td className={dateClass}>
                  {dateLabel}: {item.date}
                </td>
                <td className="text-end">₹{item.oldPrice}</td>
                <td className="text-end">₹{item.newPrice}</td>
                <td
                  className="text-end"
                  style={item.up ? styles.priceUp : styles.priceDown}
                >
                  {item.up ? "+" : ""}₹{item.change}
                </td>
                <td
                  className="text-end"
                  style={item.up ? styles.priceUp : styles.priceDown}
                >
                  {item.percent}%
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {footerText && (
          <div style={{ padding: "8px 12px", ...styles?.footer }}>
            {footerText}: <span className="text-danger">{footerAmount}</span>
          </div>
        )}
      </div>
    );};

  return (
    <Row>
      <Col md={6} className="mb-4">
        <BaseSurface
          title="Recent Price Changes"
          containerStyle={styles?.sectionCard}
          headerStyle={styles?.sectionHeaderRecent}
          bodyStyle={{ padding: 0 }}
        >
          {renderScrollableTable(
            recentSort,
            "Net Recent Impact",
            "₹8,200",
            "Effective",
            "text-primary"
          )}
        </BaseSurface>
      </Col>

      <Col md={6} className="mb-4">
        <BaseSurface
          title={
            <span>
              <FaExclamationCircle className="me-1" /> Future Price Hikes
            </span>
          }
          containerStyle={styles?.sectionCard}
          headerStyle={styles?.sectionHeaderFuture}
          bodyStyle={{ padding: 0 }}
        >
          {renderScrollableTable(
            futureSort,
            "Expected Future Impact",
            "₹6,280",
            "Tentative",
            "text-warning"
          )}
        </BaseSurface>
      </Col>
    </Row>
  );
}

export default PriceChangesTable;
