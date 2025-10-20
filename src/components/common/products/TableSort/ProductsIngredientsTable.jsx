"use client";

import React, { useMemo } from "react";
import { Table } from "react-bootstrap";
import { productsIngredientsDataFormatter } from "@/utils/data_formatters/productsPageDataFormatter";
import { useTableSort } from "@/components/hooks/useTableSort";

export default function ProductsIngredientsTable({ list = [] }) {
  // 🔹 Format each row (adds raw values + JSX display)
  const rows = useMemo(() => {
    return list.map((ingredient) =>
      productsIngredientsDataFormatter(ingredient)
    );
  }, [list]);

  // 🔹 Prepare numeric data for sorting
  const dataForSort = useMemo(
    () =>
      rows.map((row, idx) => ({
        ...row,
        itemTypeRaw: row.itemTypeRaw,
        ingredientRaw: row.ingredientRaw,
        itemPriceNum: Number(row.itemPriceRaw) || 0,
        quantityNum: Number(row.quantityRaw) || 0,
        totalPriceNum: Number(row.totalPriceRaw) || 0,
        index: idx,
      })),
    [rows]
  );

  // 🔹 Hook for sorting
  const { sortedData, sortKey, direction, handleSort } =
    useTableSort(dataForSort);

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  // 🔹 Define table columns
  const columns = [
    { key: "itemTypeRaw", label: "Item", display: "itemType" },
    { key: "ingredientRaw", label: "Ingredient", display: "ingredient" },
    { key: "itemPriceNum", label: "Item Price", display: "itemPrice" },
    { key: "quantityNum", label: "Quantity", display: "quantity" },
    { key: "totalPriceNum", label: "Total Price", display: "totalPrice" },
  ];

  return (
    <div style={{ maxHeight: "65vh", overflowY: "auto" }}>
      <Table hover className="align-middle mb-0">
        <thead
          className="bg-primary text-white"
          style={{
            position: "sticky",
            top: 0,
            background: "#f4f7fc",
            zIndex: 10,
          }}
        >
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                style={{ cursor: "pointer", whiteSpace: "nowrap",backgroundColor:'#f4f7fc',fontWeight:700,fontSize:"14px",color:"#232425" }}
              >
                {col.label}
                {renderSortArrow(col.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((row, idx) => (
              <tr key={idx} style={{fontWeight:500, fontSize:"14px"}}>
                {columns.map((col) => (
                  <td key={col.key}>{row[col.display]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center text-muted py-3"
              >
                No Ingredients Available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
