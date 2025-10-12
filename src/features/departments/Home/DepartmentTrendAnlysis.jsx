"use client";

import React, { useEffect, useState } from "react";
import {
  useDepartmentSummaryDaily,
  useDepartmentSummarySameDay,
  useDepartmentSummaryWeekly,
  useDepartmentSummaryMonthly,
} from "@/services/department-service"; // ✅ your hooks
import { useDashboardContext } from "@/contexts/DashboardContext";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import DepartmentTrendAnalysisGraph from "@/components/common/department/GraphWrapper/DepartmentTrendAnalysisGraph";

import { subDays, subWeeks, subMonths, format } from "date-fns";
import { departmentTrendAnalysisDataFormatter } from "@/utils/data_formatters/departmentPage";

export default function DepartmentTrendAnalysis() {
  const { startDate, endDate } = useDashboardContext();
  const [filter, setFilter] = useState("daily");
  const [startDateCS, setStartDateCS] = useState("");
  const [endDateCS, setEndDateCS] = useState("");

  // 🔹 Select hook dynamically
  const useDataFetchMethod = (view) => {
    switch (view) {
      case "daily":
        return useDepartmentSummaryDaily;
      case "samedays":
        return useDepartmentSummarySameDay;
      case "weekly":
        return useDepartmentSummaryWeekly;
      case "monthly":
        return useDepartmentSummaryMonthly;
      default:
        return useDepartmentSummaryDaily;
    }
  };

  const SelectedHook = useDataFetchMethod(filter);

  // 🔹 Compute date range dynamically based on filter
  const getDateRange = (view) => {
    const today = new Date();
    let startDatetemp;

    switch (view) {
      case "daily":
        startDatetemp = subDays(today, 7);
        break;
      case "weekly":
        startDatetemp = subWeeks(today, 5);
        break;
      case "monthly":
        startDatetemp = subMonths(today, 5);
        break;
      case "samedays":
        startDatetemp = subWeeks(today, 5);
        break;
      default:
        startDatetemp = today;
    }

    setStartDateCS(format(startDatetemp, "yyyy-MM-dd"));
    setEndDateCS(format(today, "yyyy-MM-dd"));
  };

  useEffect(() => {
    getDateRange(filter);
  }, [filter]);

  return (
    <div className="p-3">
      <ServiceRenderer
        queryHook={SelectedHook}
        queryKey={["departmentTrendAnalysis", filter, startDateCS, endDateCS]}
        queryArgs={[
          2,
          { startdt: startDateCS, enddt: endDateCS, userId: 7, outlet: 1 },
        ]}
        formatter={departmentTrendAnalysisDataFormatter}
        shimmerCount={2}
      >
        {( trendData ) => (
          <DepartmentTrendAnalysisGraph
            trendData={trendData}
            filter={filter}
            setFilter={setFilter}
            startDateCS={startDateCS}
            endDateCS={endDateCS}
          />
        )}
      </ServiceRenderer>
    </div>
  );
}
// "use client";

// import React, { useEffect, useState } from "react";
// import { Card, Row, Col, ButtonGroup, Button } from "react-bootstrap";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { FaArrowUp } from "react-icons/fa";

// export default function DepartmentTrendAnlysis({ apiResponse }) {
//   const [chartData, setChartData] = useState([]);
//   const [activeTab, setActiveTab] = useState("Daily");

//   useEffect(() => {
//     if (apiResponse) {
//       setChartData(departmentTrendAnalysisDataFormatter(apiResponse));
//     }
//   }, [apiResponse]);

//   return (
//     <Card className="p-3 shadow-sm" style={{ borderRadius: "16px" }}>
//       <Row className="align-items-center mb-3">
//         <Col>
//           <h5 className="fw-bold mb-0 d-flex align-items-center">
//             <FaArrowUp className="me-2 text-primary" size={20} />
//             Trend Analysis
//           </h5>
//           <small className="text-muted">
//             Sales, consumption, and inventory trends over time
//           </small>
//         </Col>
//         <Col xs="auto">
//           <ButtonGroup>
//             {["Daily", "Same Days", "Weekly", "Monthly"].map((tab) => (
//               <Button
//                 key={tab}
//                 variant={activeTab === tab ? "primary" : "light"}
//                 className="px-3 fw-semibold"
//                 style={{
//                   borderRadius: "20px",
//                   backgroundColor:
//                     activeTab === tab ? "#FF7043" : "transparent",
//                   color: activeTab === tab ? "#fff" : "#6c757d",
//                   border: "none",
//                 }}
//                 onClick={() => setActiveTab(tab)}
//               >
//                 {tab}
//               </Button>
//             ))}
//           </ButtonGroup>
//         </Col>
//       </Row>

//       <div style={{ width: "100%", height: 400 }}>
//         <ResponsiveContainer>
//           <LineChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />

//             {/* Lines */}
//             <Line
//               type="monotone"
//               dataKey="sales"
//               stroke="#4CAF50"
//               strokeWidth={2}
//               dot={{ r: 4 }}
//               name="Sales"
//             />
//             <Line
//               type="monotone"
//               dataKey="consumption"
//               stroke="#FB8C00"
//               strokeWidth={2}
//               dot={{ r: 4 }}
//               name="Consumption"
//             />
//             <Line
//               type="monotone"
//               dataKey="opening"
//               stroke="#42A5F5"
//               strokeWidth={2}
//               dot={{ r: 4 }}
//               name="Opening"
//             />
//             <Line
//               type="monotone"
//               dataKey="closing"
//               stroke="#9C27B0"
//               strokeWidth={2}
//               dot={{ r: 4 }}
//               name="Closing"
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       <Row className="mt-3">
//         <Col className="d-flex justify-content-center gap-4">
//           <span className="fw-semibold text-success">Sales</span>
//           <span className="fw-semibold text-warning">Consumption</span>
//           <span className="fw-semibold text-primary">Opening</span>
//           <span className="fw-semibold text-purple">Closing</span>
//         </Col>
//       </Row>
//     </Card>
//   );
// }
