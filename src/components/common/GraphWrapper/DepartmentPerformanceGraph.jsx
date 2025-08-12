"use client";
import React from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";
import {
  FaPercentage,
} from "react-icons/fa";

function DepartmentPerformanceGraph({ data }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          yAxisId="left"
          orientation="left"
          stroke="#8884d8"
          tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="#f97316"
          domain={[50, 75]}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="sales" fill="#3b82f6" name="Sales" />
        <Bar
          yAxisId="left"
          dataKey="consumption"
          fill="#10b981"
          name="Consumption"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="cost"
          stroke="#f97316"
          name="Cost %"
          dot={{ r: 5 }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default DepartmentPerformanceGraph