"use client";
import React from "react";
import { Table, Badge } from "react-bootstrap";
import BaseSurface from "./BaseSurface";
import { useTableSort } from "@/components/hooks/useTableSort";
import { handleNavigation } from "@/utils";
import { useRouter } from "next/navigation";
import { useDashboardContext } from "@/contexts/DashboardContext";

function ItemConsumptionEffieciencyTable({ tableData, wasteBadge }) {
    const { startDate, endDate } = useDashboardContext();
  const { sortedData, sortKey, direction, handleSort } =
    useTableSort(tableData);
  const router = useRouter();

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  // ✅ Define columns with key + label mapping
  const columns = [
    { key: "itemDetails", label: "Item Details" },
    { key: "dept", label: "Department" },
    { key: "consumed", label: "Consumed" },
    { key: "sales", label: "Sales Qty" },
    { key: "diff", label: "Difference" },
    { key: "waste", label: "Waste %" },
    { key: "cost", label: "Cost Impact" },
    { key: "status", label: "Status" },
  ];

  return (
    <BaseSurface
      title="Detailed Item Consumption Analysis"
      subtitle="Comprehensive consumption vs sales comparison with efficiency metrics"
      maxHeight="65vh"
    >
      <div style={{ maxHeight: "60vh", overflowY: "auto", overflowX: "auto" }}>
        <Table
          striped
          hover
          className="mb-0 align-middle"
          style={{ minWidth: "800px" }}
        >
          <thead
            className="table-light"
            style={{ position: "sticky", top: 0, zIndex: 5 }}
          >
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{ cursor: "pointer" }}
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
                {/* Item Details */}
                <td>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{ fontWeight: "500", cursor: "pointer" }}
                      onClick={() =>
                        handleNavigation({
                          router,
                          url: "items",
                          params: {
                            startDate: startDate,
                            endDate: endDate,
                            // departments: item?.departmentId,
                          },
                        })
                      }
                    >
                      {row.item}
                    </span>
                    <small style={{ color: "#6c757d" }}>
                      {row.dept} • {row.unitQuantity}
                      {row.unit} • ₹{row.unitPrice}
                    </small>
                  </div>
                </td>

                {/* Department */}
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    handleNavigation({
                      router,
                      url: "departments",
                      params: {
                        startDate: startDate,
                        endDate: endDate,
                        // departments: item?.departmentId,
                      },
                    })
                  }
                >
                  <Badge bg="white" text="primary">
                    {row.dept || (row.department?.name ?? "-")}
                  </Badge>
                </td>

                {/* Consumed */}
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    handleNavigation({
                      router,
                      url: "consumption_analytics",
                      params: {
                        startDate: startDate,
                        endDate: endDate,
                        departments: row?.departmentId,
                      },
                    })
                  }
                >
                  {row.consumed}
                </td>

                {/* Sales */}
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    handleNavigation({
                      router,
                      url: "items",
                      params: {
                        startDate: startDate,
                        endDate: endDate,
                        departments: row?.departmentId,
                      },
                    })
                  }
                >
                  {row.sales}
                </td>

                {/* Difference */}
                <td
                  style={{
                    color: row.diff.startsWith("+") ? "red" : "green",
                    fontWeight: "bold",
                  }}
                >
                  {row.diff}
                </td>

                {/* Waste */}
                <td>
                  <Badge
                    bg={
                      row.wasteType === "Critical"
                        ? "danger"
                        : row.wasteType === "Medium"
                        ? "warning"
                        : "success"
                    }
                    text={row.wasteType === "Medium" ? "dark" : "light"}
                  >
                    {row.waste}
                  </Badge>
                </td>

                {/* Cost */}
                <td>{row.cost}</td>

                {/* Status */}
                <td>
                  {wasteBadge ? wasteBadge(row.wasteType) : row.wasteType}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </BaseSurface>
  );
}

export default ItemConsumptionEffieciencyTable;
