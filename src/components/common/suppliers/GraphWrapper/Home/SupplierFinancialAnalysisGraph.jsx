"use client";

import React from "react";
import { Card, ButtonGroup, ToggleButton } from "react-bootstrap";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

/**
 * Safely format dates like "2025-09-04" to "Sep 4"
 */
const formatXAxisDate = (dateStr) => {
  if (!dateStr) return "";

  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const [year, month, day] = parts;
    const date = new Date(year, month - 1, day);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  }

  return dateStr;
};

const formatCurrency = (value) =>
  typeof value === "number" ? `₹${value.toLocaleString()}` : value;

const SupplierFinancialAnalysisGraph = ({
  chart,
  cards,
  filter,
  setFilter,
}) => {
  return (
    <Card
      className="border-0 shadow-sm mb-4"
      style={{
        backgroundColor: cards[0].bgColor,
        borderRadius: "16px",
      }}
    >
      <Card.Body>
        {/* Header with Title and Filters */}
        <div
          className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3"
          style={{
            backgroundColor: "#f4f5ff",
            padding: "10px 0px",
          }}
        >
          <div className="d-flex align-items-center mb-2 mb-md-0">
            <div
              style={{
                backgroundColor: cards[0].iconBg,
                width: "32px",
                height: "32px",
                borderRadius: "8px",
              }}
              className="d-flex align-items-center justify-content-center me-2"
            >
              {cards[0].icon}
            </div>
            <div>
              <h6 className="mb-0 fw-semibold">{cards[0].title}</h6>
              <small style={{ color: "#6C757D" }}>{cards[0].subtitle}</small>
            </div>
          </div>

          {/* Filters - Desktop */}
          <div className="d-none d-md-block">
            <ButtonGroup
            style={{
                backgroundColor: "rgb(230,230,230)",
                borderRadius:"30px"
              }}>
              {["Daily", "Same Days", "Weekly", "Monthly"].map((label) => (
                <ToggleButton
                  key={label}
                  id={`filter-${label}`}
                  type="radio"
                  variant="outline-secondary"
                  checked={filter === label.toLowerCase()}
                  value={label.toLowerCase()}
                  onChange={(e) => setFilter(e.currentTarget.value)}
                  style={{
                    fontSize: "13px",
                    borderRadius: "20px",
                    padding: "2px 12px",
                    backgroundColor: filter === label.toLowerCase() ? "#ffffff" : "transparent",
                    color: filter === label.toLowerCase() ? "#FF5B22" : "#6C757D",
                    border: filter === label.toLowerCase()
                      ? "1px solid #dee2e6"
                      : "1px solid #dee2e6",
                  }}
                >
                  {label}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </div>
        </div>

        {/* Filters - Mobile */}
        <div className="d-flex d-md-none justify-content-center mb-3">
          <ButtonGroup
            style={{
              backgroundColor: "rgb(240,240,240)",
              borderRadius:'20px'
            }}
          >
            {["Daily", "Same Days", "Weekly", "Monthly"].map((label) => (
              <ToggleButton
                key={label}
                id={`mobile-filter-${label}`}
                type="radio"
                variant="outline-secondary"
                checked={filter === label.toLowerCase()}
                value={label.toLowerCase()}
                onChange={(e) => setFilter(e.currentTarget.value)}
                style={{
                  fontSize: "13px",
                  borderRadius: "20px",
                  padding: "2px 12px",
                  backgroundColor:
                    filter === label.toLowerCase() ? "#fff" : "transparent",
                  color: filter === label.toLowerCase()
                    ? "#FF5B22"
                    : "#6C757D",
                  border:
                    filter === label.toLowerCase()
                      ? "1px solid #dee2e6"
                      : "1px solid #dee2e6",
                }}
              >
                {label}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chart}
            margin={{ top: 25, right: 25, left: 20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={formatXAxisDate} />
            <YAxis
              yAxisId="left"
              tickFormatter={formatCurrency}
              label={{
                angle: -90,
                position: "insideLeft",
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={formatCurrency}
              label={{
                angle: -90,
                position: "insideRight",
              }}
            />
            <Tooltip
              formatter={(value, name) => [formatCurrency(value), name]}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="purchaseAmount"
              stroke="#E60023"
              dot={{ r: 4 }}
              name="Purchase Amount"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="paymentAmount"
              stroke="#28A745"
              dot={{ r: 4 }}
              name="Payment Amount"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default SupplierFinancialAnalysisGraph;
// "use client";

// import React from "react";
// import { Card, ButtonGroup, ToggleButton } from "react-bootstrap";
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
// } from "recharts";

// /**
//  * Safely format dates like "2025-09-04" to "Sep 4"
//  */
// const formatXAxisDate = (dateStr) => {
//   if (!dateStr) return "";

//   const parts = dateStr.split("-");
//   if (parts.length === 3) {
//     const [year, month, day] = parts;
//     const date = new Date(year, month - 1, day);
//     if (!isNaN(date.getTime())) {
//       return date.toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//         year: undefined, // 🔥 force hide year
//       });
//     }
//   }

//   return dateStr;
// };

// const SupplierFinancialAnalysisGraph = ({
//   chart,
//   cards,
//   filter,
//   setFilter,
// }) => {
//   return (
//     <Card
//       className="border-0 shadow-sm mb-4"
//       style={{
//         backgroundColor: cards[0].bgColor,
//         borderRadius: "16px",
//       }}
//     >
//       <Card.Body>
//         {/* Header with Title and Filters */}
//         <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3"
//           style={{
//             backgroundColor: "#f4f5ff",
//             padding: "10px 0px"
//           }}>
//           <div className="d-flex align-items-center mb-2 mb-md-0">
//             <div
//               style={{
//                 backgroundColor: cards[0].iconBg,
//                 width: "32px",
//                 height: "32px",
//                 borderRadius: "8px",
//               }}
//               className="d-flex align-items-center justify-content-center me-2"
//             >
//               {cards[0].icon}
//             </div>
//             <div>
//               <h6 className="mb-0 fw-semibold">{cards[0].title}</h6>
//               <small style={{ color: "#6C757D" }}>{cards[0].subtitle}</small>
//             </div>
//           </div>

//           {/* Filters - Desktop */}
//           <div className="d-none d-md-block">
//             <ButtonGroup style={{
//             backgroundColor: "rgb(230,230,230)",
//             padding: '4px'
//           }}>
//               {["Daily", "Same Days", "Weekly", "Monthly"].map((label) => (
//                 <ToggleButton
//                   key={label}
//                   id={`filter-${label}`}
//                   type="radio"
//                   variant="outline-secondary"
//                   checked={filter === label.toLowerCase()}
//                   value={label.toLowerCase()}
//                   onChange={(e) => setFilter(e.currentTarget.value)}
//                   style={{
//                     fontSize: "13px",
//                     borderRadius: "20px",
//                     padding: "2px 12px",
//                     backgroundColor:
//                       filter === label.toLowerCase() ? "#fff" : "transparent",
//                     color:
//                       filter === label.toLowerCase() ? "#FF5B22" : "#6C757D",
//                     border:
//                       filter === label.toLowerCase()
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

//         {/* Filters - Mobile */}
//         <div className="d-flex d-md-none justify-content-center mb-3">
//           <ButtonGroup style={{
//             backgroundColor: "rgb(240,240,240)",
//             padding: '4px'
//           }}>
//             {["Daily", "Same Days", "Weekly", "Monthly"].map((label) => (
//               <ToggleButton
//                 key={label}
//                 id={`mobile-filter-${label}`}
//                 type="radio"
//                 variant="outline-secondary"
//                 checked={filter === label.toLowerCase()}
//                 value={label.toLowerCase()}
//                 onChange={(e) => setFilter(e.currentTarget.value)}
//                 style={{
//                   fontSize: "13px",
//                   borderRadius: "20px",
//                   padding: "2px 12px",
//                   backgroundColor:
//                     filter === label.toLowerCase() ? "#fff" : "transparent",
//                   color: filter === label.toLowerCase() ? "#FF5B22" : "#6C757D",
//                   border:
//                     filter === label.toLowerCase()
//                       ? "1px solid #FF5B22"
//                       : "1px solid #dee2e6",
//                 }}
//               >
//                 {label}
//               </ToggleButton>
//             ))}
//           </ButtonGroup>
//         </div>

//         {/* Chart */}
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart
//             data={chart}
//             margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" tickFormatter={formatXAxisDate} />
//             <YAxis
//               yAxisId="left"
//               label={{
//                 // value: "Purchase Amount",
//                 angle: -90,
//                 position: "insideLeft",
//               }}
//             />
//             <YAxis
//               yAxisId="right"
//               orientation="right"
//               label={{
//                 // value: "Payment Amount",
//                 angle: -90,
//                 position: "insideRight",
//               }}
//             />
//             <Tooltip />
//             <Legend />
//             <Line
//               yAxisId="left"
//               type="monotone"
//               dataKey="purchaseAmount"
//               stroke="#E60023"
//               dot={{ r: 4 }}
//               name="Purchase Amount"
//             />
//             <Line
//               yAxisId="right"
//               type="monotone"
//               dataKey="paymentAmount"
//               stroke="#28A745"
//               dot={{ r: 4 }}
//               name="Payment Amount"
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </Card.Body>
//     </Card>
//   );
// };

// export default SupplierFinancialAnalysisGraph;
