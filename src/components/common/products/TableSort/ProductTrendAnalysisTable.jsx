"use client";

import React from "react";
import { Card, Table, ButtonGroup, ToggleButton } from "react-bootstrap";
import { useTableSort } from "@/components/hooks/useTableSort";
import { IconArrowsMaximize, IconTable } from "@tabler/icons-react";
import { useProductsContext } from "@/contexts/ProductsContext";

const ProductTrendAnalysisTable = ({ tableData, filter, setFilter }) => {
  const {isMobile} = useProductsContext()
  // 🔹 Prepare data for sorting
  const dataForSort = tableData.map((row, idx) => ({
    ...row,
    totalSalesNum: parseFloat(row.totalSales.value?.replace(/₹|,/g, "")) || 0,
    netSalesNum: parseFloat(row.netSales.value?.replace(/₹|,/g, "")) || 0,
    discountNum: parseFloat(row.discount.value?.replace(/₹|,/g, "")) || 0,
    taxNum: parseFloat(row.tax.value?.replace(/₹|,/g, "")) || 0,
    itemsSoldNum: Number(row?.itemsSold?.value) || 0,
    ordersNum: parseFloat(row.orders.value?.replace(/₹|,/g, "")) || 0,
    index: idx,
  }));

  const { sortedData, sortKey, direction, handleSort } =
    useTableSort(dataForSort);

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  const columns = [
    { key: "date", label: "DATE" },
    { key: "totalSalesNum", label: "TOTAL SALES" },
    { key: "netSalesNum", label: "NET SALES" },
    { key: "discountNum", label: "DISCOUNT" },
    { key: "taxNum", label: "TAX" },
    { key: "itemsSoldNum", label: "ITEMS SOLD" },
    { key: "ordersNum", label: "ORDERS" },
  ];

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap" style={{ backgroundColor: "#eefdf4", padding: "10px" }}>
          <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
            {/* Left Column — Icon */}
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: "linear-gradient(135deg, #11C270 60%, #0BA360 100%)",
                borderRadius: "12px",
                width: "40px",
                height: "40px",
                flexShrink: 0,
              }}
            >
              <IconTable size={20} stroke={2.5} color="#fff" />
            </div>

            {/* Right Column — Title + Subtitle */}
            <div>
              <div className="mb-1" style={{fontWeight:700, fontSize:"18px", color:"#232425"}}>Daily Sales Analytics</div>
              {/* <small className="text-muted">
                Complete breakdown of daily sales performance and revenue data
              </small> */}
            </div>
          </div>

          {/* Filters */}
          <div>
            <ButtonGroup
              style={{
                backgroundColor: "rgb(230,230,230)",
                padding: "4px",
                borderRadius: "30px"
              }}>
              {["Daily", "Same Days", "Weekly", "Monthly"].map((label) => (
                <ToggleButton
                  key={label}
                  id={`table-filter-${label}`}
                  type="radio"
                  variant="outline-secondary"
                  checked={filter === label.toLowerCase()?.replace(" ", "")}
                  value={label.toLowerCase()?.replace(" ", "")}
                  onChange={(e) => setFilter(e.currentTarget.value)}
                  className="rounded-pill px-3"
                  style={{
                    fontSize: "13px",
                    backgroundColor:
                      filter === label.toLowerCase()?.replace(" ", "")
                        ? "#fff"
                        : "transparent",
                    color:
                      filter === label.toLowerCase()?.replace(" ", "")
                        ? "#FF5B22"
                        : "#6C757D",
                    border:
                      filter === label.toLowerCase()?.replace(" ", "")
                        ? "1px solid #FF5B22"
                        : "1px solid #dee2e6",
                  }}
                >
                  {label}
                </ToggleButton>
              ))}
            </ButtonGroup>
            {!isMobile && <span style={{marginLeft:'10px'}}>
              <IconArrowsMaximize size={20} color="#232425"/>
              </span>}
          </div>
        </div>

        {/* Sticky + Scrollable Table */}
        <div style={{ maxHeight: "65vh", overflowY: "auto" }}>
          <Table
            bordered
            hover
            className="align-middle"
            style={{ minWidth: "900px" }}
          >
            <thead
              style={{
                position: "sticky",
                top: 0,
                background: "#f6f5f7",
                zIndex: 3,
                fontWeight:'bold'
              }}
            >
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    style={{
                      fontSize: "14px",
                      color: "#000",
                      fontWeight:'700',
                      cursor: "pointer",
                      padding: "12px 16px",
                      backgroundColor: "#f4f7fc", // ensures rows don’t bleed through
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
                  <td className="" style={{fontWeight:700, fontSize:"14px", color:"#232425"}}>{row.date}</td>
                  <td style={{ color:"#1447E6", fontWeight:600, fontSize:"14px" }}>
                    {/* {row.totalSales.icon}  */}
                    {row.totalSales.value?.slice(0,1)} {Number(row.totalSales.value?.substring(1)).toLocaleString() }
                  </td>
                  <td style={{ color:"#008236", fontWeight:600, fontSize:"14px"}}>
                    {/* {row.netSales.icon} */}
                     {row.netSales.value?.slice(0,1)} {Number(row.netSales.value?.substring(1)).toLocaleString()}
                  </td>
                  <td style={{ color:"#CA3500", fontWeight:600, fontSize:"14px"}}>
                    {/* {row.discount.icon} */}
                     {row.discount.value?.slice(0,1)} {Number(row.discount.value?.substring(1)).toLocaleString()}
                  </td>
                  <td style={{ color:"#8200DB", fontWeight:600, fontSize:"14px" }}>
                    {/* {row.tax.icon} */}
                     {row.tax.valu?.slice(0,1)} {Number(row.tax.value?.substring(1)).toLocaleString()}
                  </td>
                  <td style={{ color:"#432DD7", fontWeight:600, fontSize:"14px"}}>
                    {/* {row.itemsSold.icon}  */}
                    {row.itemsSold.value?.slice(0,1)} {Number(row.itemsSold.value?.substring(1)).toLocaleString()}
                  </td>
                  <td style={{color:"#364153", fontWeight:600, fontSize:"14px"}}>
                    {/* {row.orders.icon}  */}
                    {row.orders.value?.slice(0,1)} {Number(row.orders.value?.substring(1)).toLocaleString()}
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

export default ProductTrendAnalysisTable;
