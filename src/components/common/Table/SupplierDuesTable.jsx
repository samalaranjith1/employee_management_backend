import React from 'react'
import {Table, Badge } from "react-bootstrap";

function SupplierDuesTable({ styles, data }) {
  return (
    <Table
      hover
      className="mb-0"
      style={{ borderCollapse: "separate", borderSpacing: 0 }}
    >
      <thead>
        <tr>
          <th
            style={{
              ...styles.tableHeader,
              position: "sticky",
              top: 0,
              background: "#fff",
              zIndex: 2,
            }}
          >
            Supplier
          </th>
          <th
            style={{
              ...styles.tableHeader,
              position: "sticky",
              top: 0,
              background: "#fff",
              zIndex: 2,
            }}
          >
            This Month Due
          </th>
          <th
            style={{
              ...styles.tableHeader,
              position: "sticky",
              top: 0,
              background: "#fff",
              zIndex: 2,
            }}
          >
            Last Month Due
          </th>
          <th
            style={{
              ...styles.tableHeader,
              position: "sticky",
              top: 0,
              background: "#fff",
              zIndex: 2,
            }}
          >
            Total Due
          </th>
          <th
            style={{
              ...styles.tableHeader,
              position: "sticky",
              top: 0,
              background: "#fff",
              zIndex: 2,
            }}
          >
            Items
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            <td>
              <div style={styles.supplierName}>{row.supplier}</div>
              <div className="d-flex align-items-center gap-1">
                <Badge style={styles.badge}>{row.category}</Badge>
                <span style={styles.locationText}>{row.location}</span>
              </div>
            </td>
            <td style={styles.redAmount}>₹{row.thisMonth.toLocaleString()}</td>
            <td>
              {row.lastMonth ? `₹${row.lastMonth.toLocaleString()}` : "—"}
            </td>
            <td style={styles.redAmount}>₹{row.total.toLocaleString()}</td>
            <td>{row.items}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default SupplierDuesTable