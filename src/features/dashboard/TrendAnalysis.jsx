"use client";

import React, { useEffect, useState } from "react";
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
import { subDays, subWeeks, subMonths, format } from "date-fns";
import { Button, ButtonGroup, Container, Row, Col } from "react-bootstrap";
import { FaBolt, FaExpand } from "react-icons/fa";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { handleNavigation } from "@/utils";
import { useRouter } from "next/navigation";

import {
  useOutletDailySummary,
  useOutletMonthlySummary,
  useOutletSameDaySummary,
  useOutletWeeklySummary,
} from "@/services/outlet-service";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { trendAnalysisFormatter } from "@/utils/data_formatters/dashboardFormatter";

export default function TrendAnalysis() {
  const { startDate, endDate } = useDashboardContext();
  const router = useRouter();
  const [startDateCS, setStartDateCS] = useState("");
  const [endDateCS, setEndDateCs] = useState("");

  const [view, setView] = useState("Daily");

  const useDataFetchMethod = (view) => {
    switch (view) {
      case "Daily":
        return useOutletDailySummary;
      case "SameDay":
        return useOutletSameDaySummary;
      case "Weekly":
        return useOutletWeeklySummary;
      case "Monthly":
        return useOutletMonthlySummary;
      default:
        return useOutletDailySummary;
    }
  };

  const getDateRange = (view) => {
    const today = new Date();
    let startDatetemp;
    switch (view) {
      case "Daily":
        startDatetemp = subDays(today, 7); // last 7 days
        break;
      case "Weekly":
        startDatetemp = subWeeks(today, 5); // last 5 weeks
        break;
      case "Monthly":
        startDatetemp = subMonths(today, 5); // last 5 months
        break;
      case "SameDay":
        startDatetemp = subWeeks(today, 5); // same-day comparison → last 5 weeks
        break;
      default:
        startDatetemp = today;
    }
    setStartDateCS(format(startDatetemp, "yyyy-MM-dd"));
    setEndDateCs(format(today, "yyyy-MM-dd"));
    setView(view);
  };

  useEffect(() => {
    getDateRange(view);
  }, [view]);

  const SelectedHook = useDataFetchMethod(view);

  return (
    <Container fluid className="m-1">
      <Container fluid className="p-2 bg-white rounded shadow-sm">
        <Row className="d-flex align-items-center justify-content-between mb-3">
          <Col className="d-flex align-items-center">
            <div className="me-2">
              <FaBolt size={24} color="rgb(255,80,22)" />
            </div>
            <div className="d-flex flex-column mt-2">
              <div style={{ color: "rgb(255,80,22)", fontWeight: "bold" }}>
                📈 Trend Analysis
              </div>
              <div>Sales, consumption, and inventory trends over time</div>
            </div>
          </Col>

          <Col xs="auto" className="d-flex align-items-center ms-auto gap-2">
            <div className="d-none d-md-flex">
              <ButtonGroup>
                {["Daily","SameDay", "Weekly", "Monthly"].map((type) => (
                  <Button
                    key={type}
                    variant={view === type ? "primary" : "outline-secondary"}
                    onClick={() => getDateRange(type)}
                  >
                    {type}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
            <FaExpand size={24} color="rgb(255,80,22)" />
          </Col>
          <div className="d-flex d-md-none justify-content-center w-100 mt-1">
            <ButtonGroup>
              {["Daily", "Weekly", "Monthly"].map((type) => (
                <Button
                  key={type}
                  variant={view === type ? "primary" : "outline-secondary"}
                  onClick={() => getDateRange(type)}
                >
                  {type}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </Row>

        {/* ServiceRenderer handles service + formatter */}
        <ServiceRenderer
          queryHook={SelectedHook} // Pass the hook itself
          queryKey={["outletSummary", view]}
          queryArgs={[1, { startdt: startDateCS, enddt: endDateCS }]} // Args passed to the hook
          formatter={(raw) => trendAnalysisFormatter(raw, view)}
        >
          {(data) => {
            const averages = (() => {
              const keys = ["Sales", "Consumption", "Opening", "Closing"];
              const avg = {};
              keys.forEach((key) => {
                avg[key] = (
                  data.reduce((sum, d) => sum + d[key], 0) / data.length
                ).toFixed(0);
              });
              return avg;
            })();
            return (
              <>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={data}
                    margin={{ top: 20, right: 40, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />

                    <YAxis
                      yAxisId="left"
                      tickFormatter={(value) => `₹${value}k`}
                      domain={[0, "auto"]}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tickFormatter={(value) => `${value}%`}
                      domain={[0, 100]}
                    />

                    <Tooltip
                      formatter={(value, name) =>
                        name === "consumptionPercentage"
                          ? `${value}%`
                          : `₹${value}k`
                      }
                    />
                    <Legend
                      content={(props) => {
                        const { payload } = props;
                        return (
                          <ul
                            style={{
                              listStyle: "none",
                              display: "flex",
                              justifyContent: "center", // 🔹 center align
                              gap: "20px",
                              padding: 0,
                              margin: 0,
                            }}
                          >
                            {payload.map((entry, index) => (
                              <li
                                key={`legend-${index}`}
                                style={{
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "6px",
                                }}
                                onClick={() =>
                                  handleNavigation({
                                    router,
                                    url:
                                      entry.value === "Sales"
                                        ? "sp/sales_analytics"
                                        : entry.value === "Consumption"
                                        ? "sp/consumption_analytics"
                                        : entry.value === "Opening"
                                        ? "sp/consumption_closing_analytics"
                                        : entry.value === "Closing"
                                        ? "sp/consumption_closing_analytics"
                                        : "",
                                    params: {
                                      startDate: startDateCS,
                                      endDate: endDateCS,
                                    },
                                  })
                                }
                              >
                                <span
                                  style={{
                                    width: 12,
                                    height: 12,
                                    backgroundColor: entry.color,
                                    display: "inline-block",
                                    borderRadius: "3px",
                                  }}
                                />
                                {entry.value}
                              </li>
                            ))}
                          </ul>
                        );
                      }}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="Sales"
                      stroke="#22c55e"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="Consumption"
                      stroke="#f59e0b"
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="Opening"
                      stroke="#3b82f6"
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="Closing"
                      stroke="#8b5cf6"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="consumptionPercentage"
                      stroke="#ef4444"
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
                {/* 
                <Row className="mt-3 text-center fw-bold d-none d-md-flex">
                  <Col style={{ color: "#22c55e" }}>
                    Avg Sales ₹{averages.Sales}k
                  </Col>
                  <Col style={{ color: "#f59e0b" }}>
                    Avg Consumption ₹{averages.Consumption}k
                  </Col>
                  <Col style={{ color: "#3b82f6" }}>
                    Avg Opening ₹{averages.Opening}k
                  </Col>
                  <Col style={{ color: "#8b5cf6" }}>
                    Avg Closing ₹{averages.Closing}k
                  </Col>
                </Row> */}
              </>
            );
          }}
        </ServiceRenderer>
      </Container>
    </Container>
  );
}

// "use client";

// import React, { useState, useMemo } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { Button, ButtonGroup, Container, Row, Col } from "react-bootstrap";
// import { FaBolt, FaExpand } from "react-icons/fa";

// const dailyData = [
//   {
//     name: "Dec 1",
//     Sales: 45,
//     Consumption: 29,
//     Opening: 33,
//     Closing: 14,
//     consumptionPercentage: 64,
//   },
//   {
//     name: "Dec 2",
//     Sales: 50,
//     Consumption: 31,
//     Opening: 14,
//     Closing: 17,
//     consumptionPercentage: 62,
//   },
//   {
//     name: "Dec 3",
//     Sales: 48,
//     Consumption: 30,
//     Opening: 16,
//     Closing: 15,
//     consumptionPercentage: 63,
//   },
//   {
//     name: "Dec 4",
//     Sales: 42,
//     Consumption: 28,
//     Opening: 15,
//     Closing: 13,
//     consumptionPercentage: 67,
//   },
//   {
//     name: "Dec 5",
//     Sales: 54,
//     Consumption: 32,
//     Opening: 13,
//     Closing: 19,
//     consumptionPercentage: 59,
//   },
//   {
//     name: "Dec 6",
//     Sales: 48,
//     Consumption: 30,
//     Opening: 18,
//     Closing: 16,
//     consumptionPercentage: 62,
//   },
//   {
//     name: "Dec 7",
//     Sales: 45,
//     Consumption: 28,
//     Opening: 15,
//     Closing: 14,
//     consumptionPercentage: 62,
//   },
// ];

// const weeklyData = [
//   {
//     name: "Week 1",
//     Sales: 320,
//     Consumption: 200,
//     Opening: 140,
//     Closing: 110,
//     consumptionPercentage: 63,
//   },
//   {
//     name: "Week 2",
//     Sales: 340,
//     Consumption: 210,
//     Opening: 130,
//     Closing: 120,
//     consumptionPercentage: 62,
//   },
//   {
//     name: "Week 3",
//     Sales: 300,
//     Consumption: 190,
//     Opening: 150,
//     Closing: 100,
//     consumptionPercentage: 63,
//   },
//   {
//     name: "Week 4",
//     Sales: 360,
//     Consumption: 220,
//     Opening: 160,
//     Closing: 115,
//     consumptionPercentage: 61,
//   },
// ];

// const monthlyData = [
//   {
//     name: "Jan",
//     Sales: 1200,
//     Consumption: 800,
//     Opening: 500,
//     Closing: 400,
//     consumptionPercentage: 67,
//   },
//   {
//     name: "Feb",
//     Sales: 1400,
//     Consumption: 900,
//     Opening: 550,
//     Closing: 420,
//     consumptionPercentage: 64,
//   },
//   {
//     name: "Mar",
//     Sales: 1300,
//     Consumption: 850,
//     Opening: 530,
//     Closing: 410,
//     consumptionPercentage: 65,
//   },
// ];

// export default function TrendAnalysis() {
//   const [view, setView] = useState("Daily");

//   const getData = () => {
//     if (view === "Daily") return dailyData;
//     if (view === "Weekly") return weeklyData;
//     return monthlyData;
//   };

//   const averages = useMemo(() => {
//     const data = getData();
//     const keys = ["Sales", "Consumption", "Opening", "Closing"];
//     const avg = {};
//     keys.forEach((key) => {
//       avg[key] = (
//         data.reduce((sum, d) => sum + d[key], 0) / data.length
//       ).toFixed(0);
//     });
//     return avg;
//   }, [view]);

//   return (
//     <Container fluid className="m-1">
//       <Container fluid className="p-2 bg-white rounded shadow-sm">
//         <Row className="d-flex align-items-center justify-content-between mb-3">
//           {/* Left section */}
//           <Col className="d-flex align-items-center">
//             <div className="me-2">
//               <FaBolt size={24} color="rgb(255,80,22)" />
//             </div>
//             <div className="d-flex flex-column mt-2">
//               <div style={{ color: "rgb(255,80,22)", fontWeight: "bold" }}>
//                 📈 Trend Analysis
//               </div>
//               <div>Sales, consumption, and inventory trends over time</div>
//             </div>
//           </Col>

//           {/* Right section with buttons */}
//           <Col xs="auto" className="d-flex align-items-center ms-auto gap-2">
//             <div className="d-none d-md-flex">
//               <ButtonGroup>
//                 {["Daily", "Weekly", "Monthly"].map((type) => (
//                   <Button
//                     key={type}
//                     variant={view === type ? "primary" : "outline-secondary"}
//                     onClick={() => setView(type)}
//                   >
//                     {type}
//                   </Button>
//                 ))}
//               </ButtonGroup>
//             </div>
//             <FaExpand size={24} color="rgb(255,80,22)" />
//           </Col>
//         </Row>

//         {/* Chart with dual y-axis */}
//         <ResponsiveContainer width="100%" height={400}>
//           <LineChart
//             data={getData()}
//             margin={{ top: 20, right: 40, left: 0, bottom: 0 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />

//             {/* Left Y Axis (₹ values) */}
//             <YAxis
//               yAxisId="left"
//               tickFormatter={(value) => `₹${value}k`}
//               domain={[0, "auto"]}
//             />

//             {/* Right Y Axis (% values) */}
//             <YAxis
//               yAxisId="right"
//               orientation="right"
//               tickFormatter={(value) => `${value}%`}
//               domain={[0, 100]}
//             />

//             <Tooltip
//               formatter={(value, name) =>
//                 name === "consumptionPercentage" ? `${value}%` : `₹${value}k`
//               }
//             />
//             <Legend />

//             {/* Lines */}
//             <Line
//               yAxisId="left"
//               type="monotone"
//               dataKey="Sales"
//               stroke="#22c55e"
//               activeDot={{ r: 8 }}
//             />
//             <Line
//               yAxisId="left"
//               type="monotone"
//               dataKey="Consumption"
//               stroke="#f59e0b"
//             />
//             <Line
//               yAxisId="left"
//               type="monotone"
//               dataKey="Opening"
//               stroke="#3b82f6"
//             />
//             <Line
//               yAxisId="left"
//               type="monotone"
//               dataKey="Closing"
//               stroke="#8b5cf6"
//             />

//             {/* Percentage Line */}
//             <Line
//               yAxisId="right"
//               type="monotone"
//               dataKey="consumptionPercentage"
//               stroke="#ef4444"
//               strokeDasharray="5 5"
//             />
//           </LineChart>
//         </ResponsiveContainer>

//         {/* Averages */}
//         <Row className="mt-3 text-center fw-bold">
//           <Col style={{ color: "#22c55e" }}>Avg Sales ₹{averages.Sales}k</Col>
//           <Col style={{ color: "#f59e0b" }}>
//             Avg Consumption ₹{averages.Consumption}k
//           </Col>
//           <Col style={{ color: "#3b82f6" }}>
//             Avg Opening ₹{averages.Opening}k
//           </Col>
//           <Col style={{ color: "#8b5cf6" }}>
//             Avg Closing ₹{averages.Closing}k
//           </Col>
//         </Row>
//       </Container>
//     </Container>
//   );
// }
