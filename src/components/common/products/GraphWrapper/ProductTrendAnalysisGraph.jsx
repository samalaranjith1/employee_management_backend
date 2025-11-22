"use client";

import { useProductsContext } from "@/contexts/ProductsContext";
import { Card } from "react-bootstrap";
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
import React from "react";

// ✅ Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        style={{
          background: "#fff",
          padding: "10px 12px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          fontSize: "13px",
          lineHeight: "1.4",
        }}
      >
        <p style={{ margin: 0, fontWeight: 600 }}>📅 {data.date}</p>
        <p style={{ margin: "4px 0", color: "#3b82f6" }}>
          💰 Sales: ₹{data.totalSales}
        </p>
        <p style={{ margin: "4px 0", color: "#10b981" }}>
          🏭 Making Cost: ₹{data.totalMakingCost}
        </p>
        <p style={{ margin: "4px 0", color: "#f97316" }}>
          📦 Items Sold: {data.itemsSold}
        </p>
      </div>
    );
  }
  return null;
};

const ProductTrendAnalysisGraph = ({ trendData, filter, setFilter }) => {
  const { isMobile } = useProductsContext();

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        {/* ✅ Mobile: Horizontally scrollable container */}
        <div
          style={{
            overflowX: isMobile ? "auto" : "visible",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div
            style={{
              width: isMobile ? "90vw" : "100%",
              minWidth: isMobile ? "900px" : "auto",
            }}
          >
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />

                {/* X Axis */}
                <XAxis
                  dataKey="date"
                  interval={0}
                  tick={{ fontSize: 12 }}
                  tickMargin={10}
                />

                {/* Y Axis - Left */}
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  stroke="#ccc"
                  label={{
                    angle: -90,
                    position: "insideLeft",
                  }}
                  tick={{ fontSize: 12, fill: "#666" }}
                />

                {/* Y Axis - Right */}
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#ccc"
                  tick={{ fontSize: 12, fill: "#666" }}
                  label={{
                    angle: -90,
                    position: "insideRight",
                    offset: 10,
                  }}
                />

                {/* Tooltip + Legend */}
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                {/* Data Lines */}
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
                  dataKey="totalMakingCost"
                  stroke="#10b981"
                  name="Making Cost"
                  strokeWidth={3}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="itemsSold"
                  stroke="#f97316"
                  name="Items Sold"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductTrendAnalysisGraph;

// "use client";

// import { useProductsContext } from "@/contexts/ProductsContext";
// import { IconArrowsMaximize, IconTrendingUp } from "@tabler/icons-react";
// import React from "react";
// import { Card, ButtonGroup, ToggleButton } from "react-bootstrap";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// // ✅ Custom Tooltip
// const CustomTooltip = ({ active, payload }) => {
//   if (active && payload && payload.length) {
//     const data = payload[0].payload; // hovered data point
//     return (
//       <div
//         style={{
//           background: "#fff",
//           padding: "10px 12px",
//           border: "1px solid #ddd",
//           borderRadius: "8px",
//           fontSize: "13px",
//           lineHeight: "1.4",
//         }}
//       >
//         <p style={{ margin: 0, fontWeight: 600 }}>📅 {data.date}</p>
//         <p style={{ margin: "4px 0", color: "#3b82f6" }}>
//           💰 Sales: ₹{data.totalSales}
//         </p>
//         <p style={{ margin: "4px 0", color: "#10b981" }}>
//           🏭 Making Cost: ₹{data.totalMakingCost}
//         </p>
//         <p style={{ margin: "4px 0", color: "#f97316" }}>
//           📦 Items Sold: {data.itemsSold}
//         </p>
//       </div>
//     );
//   }
//   return null;
// };

// const ProductTrendAnalysisGraph = ({ trendData, filter, setFilter }) => {
//   const {isMobile} = useProductsContext()
//   return (
//     <Card className="shadow-sm border-0">
//       <Card.Body>
//         {/* Header + Filters */}
//         {/* <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap" style={{ backgroundColor: "#f1f6ff", padding: '10px' }}>
//           <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
//             <div
//               className="d-flex align-items-center justify-content-center me-3"
//               style={{
//                 background: "linear-gradient(135deg, #924CFE 60%, #BC75FF 100%)",
//                 borderRadius: "12px",
//                 width: "40px",
//                 height: "40px",
//               }}
//             >
//               <IconTrendingUp stroke={2} color="#fff" size={20} />
//             </div>

//             <div className="flex-grow-1">
//               <div className=" mb-1" style={{fontWeight:700, fontSize:"18px", color:"#232425"}}>Trend Analysis</div>
//             </div>
//           </div>
//           <div>
//             <ButtonGroup
//               style={{
//                 backgroundColor: "rgb(230,230,230)",
//                 padding: "4px",
//                 borderRadius: "30px"
//               }}>
//               {["Daily", "Same Days", "Weekly", "Monthly"].map((label) => (
//                 <ToggleButton
//                   key={label}
//                   id={`graph-filter-${label}`}
//                   type="radio"
//                   variant="outline-secondary"
//                   checked={filter === label.toLowerCase().replace(" ", "")}
//                   value={label.toLowerCase().replace(" ", "")}
//                   onChange={(e) => setFilter(e.currentTarget.value)}
//                   className="rounded-pill px-3"
//                   style={{
//                     fontSize: "13px",
//                     backgroundColor:
//                       filter === label.toLowerCase().replace(" ", "")
//                         ? "#fff"
//                         : "transparent",
//                     color:
//                       filter === label.toLowerCase().replace(" ", "")
//                         ? "#FF5B22"
//                         : "#6C757D",
//                     border:
//                       filter === label.toLowerCase().replace(" ", "")
//                         ? "1px solid #FF5B22"
//                         : "1px solid #dee2e6",
//                   }}
//                 >
//                   {label}
//                 </ToggleButton>
//               ))}
//             </ButtonGroup>
//             {!isMobile && <span style={{marginLeft:'10px'}}>
//               <IconArrowsMaximize size={20} color="#232425"/>
//               </span>}
//           </div>
//         </div> */}

//         {/* Graph */}
//         <ResponsiveContainer width="100%" height={320}>
//           <LineChart data={trendData}>
//             <CartesianGrid strokeDasharray="3 3" />

//             {/* ✅ Show all X-axis labels */}
//             <XAxis
//               dataKey="date"
//               interval={0}
//               tick={{ fontSize: 12 }}
//               tickMargin={10}
//             />

//             {/* ✅ Left Y-axis for Sales */}
//             <YAxis
//               yAxisId="left"
//               orientation="left"
//               stroke="#ccc"
//               label={{
//                 // value: "Sales (₹)",
//                 angle: -90,
//                 position: "insideLeft",
//               }}
//               tick={{ fontSize: 12, fill: "#3b82f6" }}
//             />

//             {/* ✅ Right Y-axis for Making Cost (now showing tick labels) */}
//             <YAxis
//               yAxisId="right"
//               orientation="right"
//               stroke="#ccc"
//               tick={{ fontSize: 12, fill: "#10b981" }}
//               label={{
//                 // value: "Making Cost (₹)",
//                 angle: -90,
//                 position: "insideRight",
//                 offset: 10,
//               }}
//             />

//             {/* Tooltip + Legend */}
//             <Tooltip content={<CustomTooltip />} />
//             <Legend />

//             {/* Lines */}
//             <Line
//               yAxisId="left"
//               type="monotone"
//               dataKey="totalSales"
//               stroke="#3b82f6"
//               name="Total Sales"
//               strokeWidth={3}
//               // dot={false}
//             />
//             <Line
//               yAxisId="right"
//               type="monotone"
//               dataKey="totalMakingCost"
//               stroke="#10b981"
//               name="Making Cost"
//               strokeWidth={3}
//               // dot={false}
//             />
//             <Line
//               yAxisId="left"
//               type="monotone"
//               dataKey="itemsSold"
//               stroke="#f97316"
//               name="Items Sold"
//               strokeDasharray="5 5"
//               strokeWidth={2}
//               dot
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </Card.Body>
//     </Card>
//   );
// };

// export default ProductTrendAnalysisGraph;
// "use client";

// import React from "react";
// import { Card, ButtonGroup, ToggleButton } from "react-bootstrap";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// // ✅ Custom Tooltip
// const CustomTooltip = ({ active, payload }) => {
//   if (active && payload && payload.length) {
//     const data = payload[0].payload; // hovered data point
//     return (
//       <div
//         style={{
//           background: "#fff",
//           padding: "10px 12px",
//           border: "1px solid #ddd",
//           borderRadius: "8px",
//           fontSize: "13px",
//           lineHeight: "1.4",
//         }}
//       >
//         <p style={{ margin: 0, fontWeight: 600 }}>📅 {data.date}</p>
//         <p style={{ margin: "4px 0", color: "#3b82f6" }}>
//           💰 Sales: ₹{data.totalSales}
//         </p>
//         <p style={{ margin: "4px 0", color: "#10b981" }}>
//           🏭 Making Cost: ₹{data.totalMakingCost}
//         </p>
//         <p style={{ margin: "4px 0", color: "#f97316" }}>
//           📦 Items Sold: {data.itemsSold}
//         </p>
//       </div>
//     );
//   }
//   return null;
// };

// const ProductTrendAnalysisGraph = ({ trendData, filter, setFilter }) => {
//   return (
//     <Card className="mb-4 shadow-sm border-0">
//       <Card.Body>
//         {/* Header + Filters */}
//         <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
//           <div>
//             <h6 className="fw-bold mb-1">Trend Analysis</h6>
//             <small className="text-muted">
//               Daily tracking: Sales, Making Cost & Items Sold
//             </small>
//           </div>

//           <div>
//             <ButtonGroup>
//               {["Daily", "Same Days", "Weekly", "Monthly"].map((label) => (
//                 <ToggleButton
//                   key={label}
//                   id={`graph-filter-${label}`}
//                   type="radio"
//                   variant="outline-secondary"
//                   checked={filter === label.toLowerCase().replace(" ", "")}
//                   value={label.toLowerCase().replace(" ", "")}
//                   onChange={(e) => setFilter(e.currentTarget.value)}
//                   className="rounded-pill px-3"
//                   style={{
//                     fontSize: "13px",
//                     backgroundColor:
//                       filter === label.toLowerCase().replace(" ", "")
//                         ? "#fff"
//                         : "transparent",
//                     color:
//                       filter === label.toLowerCase().replace(" ", "")
//                         ? "#FF5B22"
//                         : "#6C757D",
//                     border:
//                       filter === label.toLowerCase().replace(" ", "")
//                         ? "1px solid #FF5B22"
//                         : "1px solid #dee2e6",
//                   }}
//                 >
//                   {label}
//                 </ToggleButton>
//               ))}
//             </ButtonGroup>
//           </div>
//         </div>

//         {/* Graph */}
//         <ResponsiveContainer width="100%" height={320}>
//           <LineChart data={trendData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />

//             {/* Y Axes */}
//             <YAxis
//               yAxisId="left"
//               orientation="left"
//               stroke="#3b82f6"
//               label={{ value: "Sales (₹)", angle: -90, position: "insideLeft" }}
//             />
//             <YAxis
//               yAxisId="right"
//               orientation="right"
//               stroke="#10b981"
//               label={{
//                 value: "Making Cost (₹)",
//                 angle: -90,
//                 position: "insideRight",
//               }}
//             />

//             {/* Tooltip + Legend */}
//             <Tooltip content={<CustomTooltip />} />
//             <Legend />

//             {/* Lines */}
//             <Line
//               yAxisId="left"
//               type="monotone"
//               dataKey="totalSales"
//               stroke="#3b82f6"
//               name="Total Sales"
//               strokeWidth={3}
//               dot={false}
//             />
//             <Line
//               yAxisId="right"
//               type="monotone"
//               dataKey="totalMakingCost"
//               stroke="#10b981"
//               name="Making Cost"
//               strokeWidth={3}
//               dot={false}
//             />
//             <Line
//               yAxisId="left"
//               type="monotone"
//               dataKey="itemsSold"
//               stroke="#f97316"
//               name="Items Sold"
//               strokeDasharray="5 5"
//               strokeWidth={2}
//               dot
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </Card.Body>
//     </Card>
//   );
// };

// export default ProductTrendAnalysisGraph;

// "use client";

// import React from "react";
// import { Card, ButtonGroup, ToggleButton } from "react-bootstrap";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const ProductTrendAnalysisGraph = ({ trendData, filter, setFilter }) => {
//   return (
//     <Card className="mb-4 shadow-sm border-0">
//       <Card.Body>
//         <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
//           <div>
//             <h6 className="fw-bold mb-1">Trend Analysis</h6>
//             <small className="text-muted">
//               Daily tracking: purchase amounts and payment amounts
//             </small>
//           </div>

//           {/* Filters */}
//           <div>
//             <ButtonGroup>
//               {["Daily", "Same Days", "Weekly", "Monthly"].map((label) => (
//                 <ToggleButton
//                   key={label}
//                   id={`graph-filter-${label}`}
//                   type="radio"
//                   variant="outline-secondary"
//                   checked={filter === label.toLowerCase().replace(" ", "")}
//                   value={label.toLowerCase().replace(" ", "")}
//                   onChange={(e) => setFilter(e.currentTarget.value)}
//                   className="rounded-pill px-3"
//                   style={{
//                     fontSize: "13px",
//                     backgroundColor:
//                       filter === label.toLowerCase().replace(" ", "")
//                         ? "#fff"
//                         : "transparent",
//                     color:
//                       filter === label.toLowerCase().replace(" ", "")
//                         ? "#FF5B22"
//                         : "#6C757D",
//                     border:
//                       filter === label.toLowerCase().replace(" ", "")
//                         ? "1px solid #FF5B22"
//                         : "1px solid #dee2e6",
//                   }}
//                 >
//                   {label}
//                 </ToggleButton>
//               ))}
//             </ButtonGroup>
//           </div>
//         </div>

//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={trendData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
//             <YAxis yAxisId="right" orientation="right" stroke="#f97316" />
//             <Tooltip />
//             <Legend />
//             <Line
//               yAxisId="left"
//               type="monotone"
//               dataKey="totalSales"
//               stroke="#3b82f6"
//               name="Total Sales"
//               strokeWidth={3}
//             />
//             <Line
//               yAxisId="right"
//               type="monotone"
//               dataKey="itemsSold"
//               stroke="#f97316"
//               name="Items Sold"
//               strokeWidth={3}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </Card.Body>
//     </Card>
//   );
// };

// export default ProductTrendAnalysisGraph;
