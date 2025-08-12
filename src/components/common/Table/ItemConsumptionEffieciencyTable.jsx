import React from "react";
import { Table, Card, Badge } from "react-bootstrap";

function ItemConsumptionEffieciencyTable({ tableData, wasteBadge }) {
  return (
    <Card className="shadow-sm">
      <Card.Header>
        <strong>Detailed Item Consumption Analysis</strong>
        <div style={{ fontSize: "12px", color: "#777" }}>
          Comprehensive consumption vs sales comparison with efficiency metrics
        </div>
      </Card.Header>

      {/* Scroll container */}
      <div style={{ maxHeight: "65vh", overflowY: "auto" }}>
        <Table
          striped
          hover
          className="mb-0 align-middle"
          style={{ minWidth: "800px" }}
        >
          <thead
            className="table-light"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 2,
            }}
          >
            <tr>
              <th>Item Details</th>
              <th>Department</th>
              <th>Consumed</th>
              <th>Sales Qty</th>
              <th>Difference</th>
              <th>Waste %</th>
              <th>Cost Impact</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={idx}>
                <td>{row.item}</td>
                <td>
                  <Badge bg="light" text="dark">
                    {row.region}
                  </Badge>
                </td>
                <td>{row.consumed}</td>
                <td>{row.sales}</td>
                <td
                  style={{
                    color: row.diff.startsWith("+") ? "red" : "green",
                    fontWeight: "bold",
                  }}
                >
                  {row.diff}
                </td>
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
                <td>{row.cost}</td>
                <td>{wasteBadge(row.wasteType)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Card>
  );
}

export default ItemConsumptionEffieciencyTable;
