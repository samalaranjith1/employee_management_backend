"use client";
import React, { useEffect, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from "recharts";

function DepartmentPerformanceGraph({ data }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMinWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };
    updateMinWidth();
    window.addEventListener("resize", updateMinWidth);
    return () => window.removeEventListener("resize", updateMinWidth);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={true}/>
        <XAxis dataKey="title" />
        
        {/* Left Y-axis for ₹ values */}
        <YAxis
          yAxisId="left"
          orientation="left"
          stroke="#8884d8"
          type="number"
          domain={['auto', 'auto']}
          tickFormatter={(v) => `₹${(v / 1000).toFixed(1)}K`}
        />

        {/* Right Y-axis for % values */}
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="#f97316"
          type="number"
          domain={[50, 80]} // adjust if needed
          tickFormatter={(v) => `${v}%`}
        />

        <Tooltip />
        <Legend />

        <Bar yAxisId="left" dataKey="sales" fill="#3b82f6" name="Sales" />
        <Bar yAxisId="left" dataKey="consumption" fill="#10b981" name="Consumption" />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="cost"
          stroke="#f97316"
          strokeWidth={2}
          name="Cost %"
          dot={{ r: 5 }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default DepartmentPerformanceGraph;
// "use client";
// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Card, Badge } from "react-bootstrap";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   Line,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   FaPercentage,
// } from "react-icons/fa";

// function DepartmentPerformanceGraph({ data }) {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const updateMinWidth = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     updateMinWidth();
//     window.addEventListener("resize", updateMinWidth);
//     return () => window.removeEventListener("resize", updateMinWidth);
//   }, []);
//   return (
//     <ResponsiveContainer width="100%" height={350}>
//       <BarChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="title" />
//         <YAxis
//           yAxisId="left" 
//           orientation="left"
//           stroke="#8884d8"
//           tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
//         />
//         <YAxis
//           yAxisId="right"
//           orientation="right"
//           stroke="#f97316"
//           domain={[50, 75]}
//           tickFormatter={(v) => `${v}%`}
//         />
//         <Tooltip />
//         <Legend />
//         <Bar yAxisId="left" dataKey="sales" fill="#3b82f6" name="Sales" />
//         <Bar
//           yAxisId="left"
//           dataKey="consumption"
//           fill="#10b981"
//           name="Consumption"
//         />
//         <Line
//           yAxisId="right"
//           type="monotone"
//           dataKey="cost"
//           stroke="#f97316"
//           name="Cost %"
//           dot={{ r: 5 }}
//         />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }

// export default DepartmentPerformanceGraph