"use client";

import React from "react";
import { Card, ButtonGroup, ToggleButton } from "react-bootstrap";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ProductTrendAnalysisGraph = ({ trendData, filter, setFilter }) => {
  return (
    <Card className="mb-4 shadow-sm border-0">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <div>
            <h6 className="fw-bold mb-1">Trend Analysis</h6>
            <small className="text-muted">
              Daily tracking: purchase amounts and payment amounts
            </small>
          </div>

          {/* Filters */}
          <div>
            <ButtonGroup>
              {["Daily", "Same Days", "Weekly", "Monthly"].map((label) => (
                <ToggleButton
                  key={label}
                  id={`graph-filter-${label}`}
                  type="radio"
                  variant="outline-secondary"
                  checked={filter === label.toLowerCase().replace(" ", "")}
                  value={label.toLowerCase().replace(" ", "")}
                  onChange={(e) => setFilter(e.currentTarget.value)}
                  className="rounded-pill px-3"
                  style={{
                    fontSize: "13px",
                    backgroundColor:
                      filter === label.toLowerCase().replace(" ", "")
                        ? "#fff"
                        : "transparent",
                    color:
                      filter === label.toLowerCase().replace(" ", "")
                        ? "#FF5B22"
                        : "#6C757D",
                    border:
                      filter === label.toLowerCase().replace(" ", "")
                        ? "1px solid #FF5B22"
                        : "1px solid #dee2e6",
                  }}
                >
                  {label}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
            <YAxis yAxisId="right" orientation="right" stroke="#f97316" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="totalSales"
              stroke="#3b82f6"
              name="Total Sales"
              strokeWidth={3}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="itemsSold"
              stroke="#f97316"
              name="Items Sold"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default ProductTrendAnalysisGraph;
