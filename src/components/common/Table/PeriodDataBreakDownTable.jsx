import React from 'react'
import { Badge, Table } from 'react-bootstrap';

function PeriodDataBreakDownTable({ data }) {
  return (
    <Table bordered hover className="m-0">
      <thead style={{ position: "sticky", top: 0 }}>
        <tr>
          <th className="fw-bold">DATE</th>
          <th className="fw-bold">SALES</th>
          <th className="fw-bold">CONSUMPTION</th>
          <th className="fw-bold">WASTE</th>
          <th className="fw-bold">COST RATIO</th>
        </tr>
      </thead>
      <tbody>
        {data.table.map((row, idx) => (
          <tr key={idx}>
            <td>
              {row.date}
              {row.day && (
                <>
                  <br />
                  <small>{row.day}</small>
                </>
              )}
            </td>
            <td>{row.sales}</td>
            <td>{row.consumption}</td>
            <td>{row.waste}</td>
            <td>
              <Badge bg="warning" text="dark">
                {row.ratio}
              </Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default PeriodDataBreakDownTable