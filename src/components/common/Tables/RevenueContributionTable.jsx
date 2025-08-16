"use client";
import React from "react";
import { Table } from "react-bootstrap";
import BaseSurface from "./BaseSurface";

function RevenueContributionTable({ styles, tableData }) {
  return (
    <BaseSurface bodyStyle={styles?.tableContainer}>
      <Table hover>
        <thead className="table-header-sticky">
          <tr>
            <th>Bucket</th>
            <th>Products</th>
            <th>Sales</th>
            <th>Total Sales</th>
            <th>Recommendation</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, idx) => (
            <tr key={idx}>
              <td>{row.bucket}</td>
              <td>{row.products}</td>
              <td>{row.sales}</td>
              <td>{row.totalSales}</td>
              <td>
                <span
                  style={{
                    ...styles?.tag,
                    background: row.tagColor,
                    color: row.tagText,
                  }}
                >
                  {row.tag}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </BaseSurface>
  );
}

export default RevenueContributionTable;
