"use client";
import React, { useEffect, useState } from "react";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import {
  useOutletDailySummary,
  useOutletWeeklySummary,
  useOutletMonthlySummary,
  useOutletSameDaySummary,
} from "@/services/outlet-service";
import { periodDataBreakdownFormatter } from "@/utils/data_formatters/dashboardFormatter";
import { ButtonGroup, ToggleButton, Card, Row, Col } from "react-bootstrap";
import { subDays, subWeeks, subMonths, format } from "date-fns";
import PeriodDataBreakDownTable from "@/components/common/dashboard/TablesSort/PeriodDataBreakDownTable";
import PeriodBreakDownCard from "@/components/common/dashboard/card/PeriodBreakDownCard";
import { FaHistory } from "react-icons/fa";
import { IconArrowsMaximize, IconCalendar, IconTrendingUp } from "@tabler/icons-react";
import { useDashboardContext } from "@/contexts/DashboardContext";
import '@/app/globals.css';
// Hook selector
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

export default function PeriodDataBreakdown() {
  const { startDate, endDate } = useDashboardContext()
  const [activeTab, setActiveTab] = useState("Daily");
  const [startDateCS, setStartDateCS] = useState("");
  const [endDateCS, setEndDateCS] = useState("");

  // Calculate date range
  const getDateRange = (view) => {
    const today = new Date();
    let startDatetemp;
    switch (view) {
      case "Daily":
        startDatetemp = subDays(today, 7);
        break;
      case "Weekly":
        startDatetemp = subWeeks(today, 5);
        break;
      case "Monthly":
        startDatetemp = subMonths(today, 5);
        break;
      case "SameDay":
        startDatetemp = subWeeks(today, 5);
        break;
      default:
        startDatetemp = today;
    }
    setStartDateCS(format(startDatetemp, "yyyy-MM-dd"));
    setEndDateCS(format(today, "yyyy-MM-dd"));
  };

  useEffect(() => {
    getDateRange(activeTab);
  }, [activeTab]);

  const SelectedHook = useDataFetchMethod(activeTab);
  const tabs = ["Daily", "SameDay", "Weekly", "Monthly"];

  return (
    <Card className="p-3 shadow-sm" style={{ borderRadius: "16px" }}>
      {/* Header */}
      <Row className="align-items-center mb-4">
        <Col className="d-flex flex-row gap-2">
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "#Fe481d", // Adjust color to match your Figma design
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconCalendar color="white" size={28} stroke={2} />
          </div>
          <div style={{ marginTop: '+8px' }}>
            <h5 className="fw-bold mb-0 c_medium_text_bold">Period Data Breakdown</h5>
            {/* <small className="text-muted">
              Detailed metrics across different time periods
            </small> */}
          </div>
        </Col>
        <Col xs="auto" className="d-flex flex-row justify-content-center align-items-center">
  {/* Tabs */}
  <div className="d-none d-md-flex bg-gray" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
    <ButtonGroup
      className="rounded-pill"
      style={{
        backgroundColor: "#E6E6E6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {tabs.map((label) => {
        const selected = activeTab === label;
        return (
          <ToggleButton
            key={label}
            id={`period-${label}`}
            type="radio"
            variant="none"
            checked={selected}
            value={label}
            onClick={() => setActiveTab(label)}
            className="rounded-pill"
            style={{
              fontSize: "13px",
              padding: "6px 16px",
              backgroundColor: selected ? "#FF6600" : "transparent",
              color: selected ? "white" : "#888",
              border: "none",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            {label === "SameDay" ? "Same Days" : label}
          </ToggleButton>
        );
      })}
    </ButtonGroup>
  </div>

  {/* Maximize Icon */}
  <div
    style={{
      width: 36,
      height: 36,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: "12px", // optional spacing from tabs
    }}
  >
    <IconArrowsMaximize color="rgb(100,100,100)" size={24} />
  </div>
</Col>


      </Row>
      <div
        className="d-flex d-sm-none bg-gray"
        style={{
          justifyContent: "center", // center children horizontally
          alignItems: "center",     // center children vertically
          width: "100%",            // full width
          padding: "0 16px",        // optional horizontal padding
          margin: "0 auto",  
          marginBottom:'5px'       // center container if it has max-width
        }}
      >
        {/* Tabs */}
        <div className="d-flex d-sm-none bg-gray">
          <ButtonGroup
            className="rounded-pill"
            style={{
              backgroundColor: "#E6E6E6",
              marginLeft: 'auto',
            }}
          >
            {tabs.map((label) => {
              const selected = activeTab === label;
              return (
                <ToggleButton
                  key={label}
                  id={`period-${label}`}
                  type="radio"
                  variant="none"
                  checked={selected}
                  value={label}
                  onClick={() => setActiveTab(label)}
                  className="rounded-pill"
                  style={{
                    fontSize: "13px",
                    padding: "6px 16px",
                    backgroundColor: selected ? "#FF6600" : "transparent",
                    color: selected ? "white" : "#888",
                    backgroundColor:
                      activeTab === label ? "#fefefe" : "transparent",
                    color: activeTab === label ? "#FF6600" : "#888",
                    border: "none",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  {label === "SameDay" ? "Same Days" : label}
                </ToggleButton>
              );
            })}
          </ButtonGroup>
        </div>
      </div>

      {/* Info banner for SameDay */}
      {activeTab === "SameDay" && (
        <Card
          className="d-inline-flex align-items-center mb-3"
          style={{
            backgroundColor: "#FFF8F2",
            border: "1px solid #F5CBA7",
            borderRadius: "8px",
            padding: "0.75rem 1rem",
            boxShadow: "none",
          }}
        >
          <FaHistory
            style={{
              color: "#E67E22",
              marginRight: "0.5rem",
              flexShrink: 0,
            }}
          />
          <span style={{ color: "#E67E22", fontWeight: 500 }}>
            Last 7 {format(new Date(), "EEEE")}s • Same-day-of-week patterns
          </span>
        </Card>
      )}

      {/* 🔹 ServiceRenderer */}
      <ServiceRenderer
        queryHook={SelectedHook}
        queryKey={["periodBreakdown", activeTab, startDateCS, endDateCS]}
        queryArgs={[
          1,
          {
            // startdt: startDateCS,
            // enddt: endDateCS,
            startdt: startDate,
            enddt: endDate,
            outlet: 1,
            userId: 7
          },
        ]}
        formatter={(raw) => periodDataBreakdownFormatter(raw, activeTab)}
      >
        {({ cards, table }) => (
          <>
            {/* Cards */}
            <div
              style={{
                display: "flex",
                overflowX: "auto",
                // paddingLeft: "0.5rem",
                // paddingRight: "0.5rem",
                marginBottom: "1rem",
                gap: "0.2rem",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE/Edge
              }}
            >
              <style>
                {`
      div::-webkit-scrollbar {
        display: none;
      }
    `}
              </style>

              {cards.map((card, idx) => (
                <PeriodBreakDownCard key={idx} card={card} idx={idx} />
              ))}
            </div>


            {/* Table */}
            <div style={{ maxHeight: "60vh", overflow: "auto" }}>
              <PeriodDataBreakDownTable
                data={{ table }}
                filters={{ startDate: startDateCS, endDate: endDateCS }}
                containerStyle={{ maxHeight: "60vh", overflowY: "auto" }}
              />
            </div>
          </>
        )}
      </ServiceRenderer>
    </Card>
  );
}
// "use client"
// import React, { useEffect, useState } from "react";
// import ComponentHeader from "@/components/common/ComponentHeader";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
// import {
//   useOutletDailySummary,
//   useOutletWeeklySummary,
//   useOutletMonthlySummary,
//   useOutletSameDaySummary,
// } from "@/services/outlet-service";
// import { periodDataBreakdownFormatter } from "@/utils/data_formatters/dashboardFormatter";
// import { Button, ButtonGroup, Card, Container } from "react-bootstrap";
// import { subDays, subWeeks, subMonths, format } from "date-fns";
// import PeriodDataBreakDownTable from "@/components/common/dashboard/TablesSort/PeriodDataBreakDownTable";
// import PeriodBreakDownCard from "@/components/common/dashboard/card/PeriodBreakDownCard";
// import { FaHistory } from "react-icons/fa";

// // Hook selector
// const useDataFetchMethod = (view) => {
//   switch (view) {
//     case "Daily":
//       return useOutletDailySummary;
//     case "SameDay":
//       return useOutletSameDaySummary;
//     case "Weekly":
//       return useOutletWeeklySummary;
//     case "Monthly":
//       return useOutletMonthlySummary;
//     default:
//       return useOutletDailySummary;
//   }
// };

// export default function PeriodDataBreakdown() {
//   const [activeTab, setActiveTab] = useState("Daily");
//   const [startDateCS, setStartDateCS] = useState("");
//   const [endDateCS, setEndDateCS] = useState("");

//   // Calculate date range based on activeTab/view
//   const getDateRange = (view) => {
//     const today = new Date();
//     let startDatetemp;
//     switch (view) {
//       case "Daily":
//         startDatetemp = subDays(today, 7);
//         break;
//       case "Weekly":
//         startDatetemp = subWeeks(today, 5);
//         break;
//       case "Monthly":
//         startDatetemp = subMonths(today, 5);
//         break;
//       case "SameDay":
//         startDatetemp = subWeeks(today, 5);
//         break;
//       default:
//         startDatetemp = today;
//     }
//     setStartDateCS(format(startDatetemp, "yyyy-MM-dd"));
//     setEndDateCS(format(today, "yyyy-MM-dd"));
//   };

//   // Update date range on activeTab change
//   useEffect(() => {
//     getDateRange(activeTab);
//   }, [activeTab]);

//   const SelectedHook = useDataFetchMethod(activeTab);

//   return (
//     <Container fluid className="bg-white p-2 card">
//       <ComponentHeader
//         title={"Period Data Breakdown"}
//         description={"Detailed metrics across different time periods"}
//         isShowArrows={true}
//         isExpandable={true}
//       />

//       {/* Tabs */}
//       <div className="d-flex justify-content-center mb-3">
//         <ButtonGroup
//           style={{ backgroundColor: "rgb(245, 199, 143)", width: "90vw" }}
//         >
//           {["Daily", "SameDay", "Weekly", "Monthly"].map((tab) => (
//             <Button
//               key={tab}
//               style={{
//                 width: "24vw",
//                 borderRadius: "10px",
//                 backgroundColor: activeTab === tab ? "rgb(254,69,37)" : "",
//               }}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab}
//             </Button>
//           ))}
//         </ButtonGroup>
//       </div>
//       {activeTab === "SameDay" && (
//         <Card
//           className="d-inline align-items-center"
//           style={{
//             backgroundColor: "#FFF8F2", // light peach bg
//             border: "1px solid #F5CBA7", // orange border
//             borderRadius: "8px",
//             padding: "0.75rem 1rem",
//             boxShadow: "none",
//           }}
//         >
//           <FaHistory
//             style={{
//               color: "#E67E22",
//               marginRight: "0.5rem",
//               flexShrink: 0,
//             }}
//           />
//           <span style={{ color: "#E67E22", fontWeight: 500 }}>
//             Last 7 {format(new Date(), "EEEE")}s • Same-day-of-week patterns
//           </span>
//         </Card>
//       )}
//       <ServiceRenderer
//         queryHook={SelectedHook}
//         queryKey={["periodBreakdown", activeTab, startDateCS, endDateCS]}
//         queryArgs={[
//           1,
//           {
//             startdt: startDateCS,
//             enddt: endDateCS,
//           },
//         ]}
//         formatter={(raw) => periodDataBreakdownFormatter(raw, activeTab)}
//       >
//         {({ cards, table }) => (
//           <>
//             {/* Cards */}
//             <div
//               className="d-flex overflow-auto px-2 hide-scrollbar"
//               style={{ gap: "1rem" }}
//             >
//               {cards.map((card, idx) => (
//                 <PeriodBreakDownCard key={idx} card={card} idx={idx} />
//               ))}
//             </div>
//             {/* Table */}
//             <div style={{ maxHeight: "60vh", overflow: "auto" }}>
//               {/* Pass the height to the table so the header can stick */}
//               <PeriodDataBreakDownTable
//                 data={{ table }}
//                 filters={{startDate:startDateCS,endDate:endDateCS}}
//                 containerStyle={{ maxHeight: "60vh", overflowY: "auto" }}
//               />
//             </div>
//           </>
//         )}
//       </ServiceRenderer>
//     </Container>
//   );
// }

// "use client";

// import PeriodBreakDownCard from "@/components/common/card/PeriodBreakDownCard";
// import ComponentHeader from "@/components/common/ComponentHeader";
// import PeriodDataBreakDownTable from "@/components/common/TablesSort/PeriodDataBreakDownTable";
// import React, { useState, useRef, useEffect } from "react";
// import {
//   Container,
//   Button,
//   ButtonGroup,
// } from "react-bootstrap";

// // Mock data to simulate fetching different time periods
// const mockData = {
//   Daily: {
//     cards: [
//       { title: "COST RATIO", value: "61.3%", change: "-2.1%", color: "danger" },
//       {
//         title: "AVERAGE DAILY SALES",
//         value: "₹46,285",
//         change: "+8.3%",
//         color: "success",
//       },
//       {
//         title: "AVERAGE DAILY CONSUMPTION",
//         value: "₹28,357",
//         change: "+5.7%",
//         color: "success",
//       },
//       {
//         title: "AVERAGE DAILY WASTE",
//         value: "₹1,245",
//         change: "-12.4%",
//         color: "danger",
//       },
//     ],
//     table: [
//       {
//         date: "Dec 8 (Today)",
//         day: "Sunday",
//         sales: "₹52,400",
//         consumption: "₹31,200",
//         waste: "₹890",
//         ratio: "59.5%",
//       },
//       {
//         date: "Dec 8 (Today)",
//         day: "Sunday",
//         sales: "₹52,400",
//         consumption: "₹31,200",
//         waste: "₹890",
//         ratio: "59.5%",
//       },
//       {
//         date: "Dec 8 (Today)",
//         day: "Sunday",
//         sales: "₹52,400",
//         consumption: "₹31,200",
//         waste: "₹890",
//         ratio: "59.5%",
//       },
//       {
//         date: "Dec 8 (Today)",
//         day: "Sunday",
//         sales: "₹52,400",
//         consumption: "₹31,200",
//         waste: "₹890",
//         ratio: "59.5%",
//       },
//       {
//         date: "Dec 8 (Today)",
//         day: "Sunday",
//         sales: "₹52,400",
//         consumption: "₹31,200",
//         waste: "₹890",
//         ratio: "59.5%",
//       },
//       {
//         date: "Dec 8 (Today)",
//         day: "Sunday",
//         sales: "₹52,400",
//         consumption: "₹31,200",
//         waste: "₹890",
//         ratio: "59.5%",
//       },
//       {
//         date: "Dec 7",
//         day: "Saturday",
//         sales: "₹48,200",
//         consumption: "₹29,100",
//         waste: "₹1,150",
//         ratio: "60.4%",
//       },
//       {
//         date: "Dec 6",
//         day: "Friday",
//         sales: "₹45,800",
//         consumption: "₹27,800",
//         waste: "₹1,320",
//         ratio: "60.7%",
//       },
//       {
//         date: "Dec 5",
//         day: "Thursday",
//         sales: "₹44,100",
//         consumption: "₹26,900",
//         waste: "₹1,480",
//         ratio: "61.0%",
//       },
//       {
//         date: "Dec 4",
//         day: "Wednesday",
//         sales: "₹47,600",
//         consumption: "₹28,400",
//         waste: "₹1,200",
//         ratio: "59.7%",
//       },
//       {
//         date: "Dec 3",
//         day: "Tuesday",
//         sales: "₹46,900",
//         consumption: "₹28,100",
//         waste: "₹1,380",
//         ratio: "59.9%",
//       },
//     ],
//   },
//   Weekly: {
//     cards: [
//       { title: "COST RATIO", value: "60.5%", change: "-1.5%", color: "danger" },
//       {
//         title: "AVERAGE WEEKLY SALES",
//         value: "₹3,24,500",
//         change: "+6.2%",
//         color: "success",
//       },
//       {
//         title: "AVERAGE WEEKLY CONSUMPTION",
//         value: "₹1,98,700",
//         change: "+4.1%",
//         color: "success",
//       },
//       {
//         title: "AVERAGE WEEKLY WASTE",
//         value: "₹7,890",
//         change: "-9.4%",
//         color: "danger",
//       },
//     ],
//     table: [
//       {
//         date: "Week 1",
//         day: "",
//         sales: "₹3,40,000",
//         consumption: "₹2,10,000",
//         waste: "₹7,800",
//         ratio: "61.0%",
//       },
//       {
//         date: "Week 2",
//         day: "",
//         sales: "₹3,20,000",
//         consumption: "₹1,95,000",
//         waste: "₹7,500",
//         ratio: "60.3%",
//       },
//     ],
//   },
//   // Same Days and Monthly data would be added here
// };

// export default function PeriodDataBreakdown() {
//   const [activeTab, setActiveTab] = useState("Daily");
//   const data = mockData[activeTab] || { cards: [], table: [] }; // Handle cases where data is missing

// const myScrollRef = useRef(null);
//   return (
//     <Container fluid className="bg-white p-2 card">
//       {/* <style>{hideScrollbarStyle}</style> */}
//       <ComponentHeader
//         title={"Period Data Breakdown"}
//         description={"Detailed metrics across different time periods"}
//         isShowArrows={true}
//         scrollRef={myScrollRef}
//         isExpandable={true}
//       />
//       {/* Tabs */}
//       <div className="d-flex justify-content-center mb-3">
//         <ButtonGroup
//           style={{ backgroundColor: "rgb(245, 199, 143)", width: "90vw" }}
//         >
//           {["Daily", "Same Days", "Weekly", "Monthly"].map((tab) => (
//             <Button
//               key={tab}
//               variant={activeTab === tab ? "rgb(254,69,37)" : ""}
//               className="me-2"
//               style={{
//                 width: "24vw",
//                 borderRadius: "10px",
//                 backgroundColor: activeTab === tab ? "rgb(254,69,37)" : "",
//               }}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab}
//             </Button>
//           ))}
//         </ButtonGroup>
//       </div>

//       <div className="d-block card p-1 mb-3 bg-warning text-primary">
//         Last 7 Saturdays • Same-day-of-week patterns
//       </div>

//       {/* Card Slider Controls */}
//       <div className="d-flex align-items-center mb-3">
//         <div
//           ref={myScrollRef}
//           className="d-flex overflow-auto px-2 hide-scrollbar"
//           style={{ scrollBehavior: "smooth", gap: "1rem" }}
//         >
//           {data.cards.map((card, idx) => (
//             <PeriodBreakDownCard key={idx} card={card} idx={idx} />
//           ))}
//         </div>
//       </div>

//       {/* Table with Sticky Header */}
//       <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
//         <PeriodDataBreakDownTable data={data} />
//       </div>
//     </Container>
//   );
// }
