"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function HourlyForecastGraph({ currentData, selectedMetric }) {
  const svgHeight = 400; // Increased from 250 to 350
  const maxForecast = currentData?.graphData
    ? Math.max(...currentData.graphData.map((d) => d.forecast))
    : 0;
  const maxActual = currentData?.graphData
    ? Math.max(...currentData.graphData.map((d) => d.actual))
    : 0;
  const maxVal = Math.ceil(Math.max(maxForecast, maxActual) / 100) * 100;

  return (
    <div
      style={{
        overflowX: "auto", // allow horizontal scroll
        width: "100%",
      }}
    >
      <div
        style={{
          minWidth: currentData.graphData.length * 80, // width based on number of points
          height: svgHeight,
        }}
      >
        <ResponsiveContainer width="100%" height={svgHeight}>
          <LineChart
            data={currentData.graphData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 50,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="hour"
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
              tick={{ fill: "#6c757d", fontSize: 12 }}
              label={{
                position: "insideBottom",
                offset: -15,
                fill: "#6c757d",
                fontSize: 14,
              }}
            />
            <YAxis
              domain={[0, maxVal]}
              tickFormatter={(value) =>
                selectedMetric === "Sales" ? `₹${value / 1000}k` : value
              }
              tick={{ fill: "#6c757d", fontSize: 12 }}
              label={{
                angle: -90,
                position: "insideLeft",
                offset: 10,
                fill: "#6c757d",
                fontSize: 14,
              }}
            />
            <Tooltip
              formatter={(value, name) => [
                selectedMetric === "Sales" ? `₹${value.toLocaleString()}` : value,
                name === "forecast" ? "Forecast" : "Actual",
              ]}
              labelFormatter={(label) => `Hour: ${label}`}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            />
            <Legend
              verticalAlign="top"
              align="left"
              wrapperStyle={{ top: -5, right: 0, paddingBottom: "10px" }}
              payload={[
                { value: "Forecast", type: "line", id: "forecast", color: "#007bff" },
                { value: "Actual", type: "line", id: "actual", color: "#28a745" },
              ]}
            />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#f59e0c"
              activeDot={{ r: 8 }}
              name="forecast"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#1faa1f"
              activeDot={{ r: 8 }}
              name="actual"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>


    // <ResponsiveContainer width="100%" height={svgHeight}>
    //   <LineChart
    //     data={currentData.graphData}
    //     margin={{
    //       top: 20,
    //       right: 30,
    //       left: 20,
    //       bottom: 50,
    //     }}
    //   >
    //     <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
    //     <XAxis
    //       dataKey="hour"
    //       interval={0}
    //       angle={-45}
    //       textAnchor="end"
    //       height={60}
    //       tick={{ fill: "#6c757d", fontSize: 12 }}
    //       label={{
    //         // value: "Time",
    //         position: "insideBottom",
    //         offset: -15,
    //         fill: "#6c757d",
    //         fontSize: 14,
    //       }}
    //     />
    //     <YAxis
    //       domain={[0, maxVal]}
    //       tickFormatter={(value) =>
    //         selectedMetric === "Sales" ? `₹${value/1000}k` : value
    //       }
    //       tick={{ fill: "#6c757d", fontSize: 12 }}
    //       label={{
    //         // value: selectedMetric === "Sales" ? "Sales (₹)" : "Orders",
    //         angle: -90,
    //         position: "insideLeft",
    //         offset: 10,
    //         fill: "#6c757d",
    //         fontSize: 14,
    //       }}
    //     />
    //     <Tooltip
    //       formatter={(value, name) => [
    //         selectedMetric === "Sales" ? `₹${value}` : value,
    //         name === "forecast" ? "Forecast" : "Actual",
    //       ]}
    //       labelFormatter={(label) => `Hour: ${label}`}
    //       contentStyle={{
    //         backgroundColor: "#fff",
    //         border: "1px solid #ccc",
    //         borderRadius: "5px",
    //         padding: "10px",
    //         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    //       }}
    //     />
    //     <Legend
    //       verticalAlign="top"
    //       align="left"
    //       wrapperStyle={{ top: -10, right: 0, paddingBottom: "10px" }}
    //       payload={[
    //         {
    //           value: "Forecast",
    //           type: "line",
    //           id: "forecast",
    //           color: "#007bff",
    //         },
    //         { value: "Actual", type: "line", id: "actual", color: "#28a745" },
    //       ]}
    //     />
    //     <Line
    //       type="monotone"
    //       dataKey="forecast"
    //       stroke="#007bff"
    //       activeDot={{ r: 8 }}
    //       name="forecast"
    //       strokeWidth={2}
    //     />
    //     <Line
    //       type="monotone"
    //       dataKey="actual"
    //       stroke="#28a745"
    //       activeDot={{ r: 8 }}
    //       name="actual"
    //       strokeWidth={2}
    //     />
    //   </LineChart>
    // </ResponsiveContainer>
  );
}

export default HourlyForecastGraph;
