"use client";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { FaBullseye, FaBox, FaUsers, FaExchangeAlt } from "react-icons/fa";

import DepartmentHeader from "@/features/departments/DepartmentHeader";
import DepartmentCards from "@/features/departments/DepartmentCards";
import DepartmentFilters from "@/features/departments/DepartmentFilters";
import DepartmentTabs from "@/features/departments/DepartmentTabs";
import DepartmentContent from "@/features/departments/DepartmentContent";
import DepartmentClosingCanvas from "@/features/departments/DepartmentClosingCanvas";
import { useDepartmentContext } from "@/contexts/DepartmentContext";
import { useDashboardContext } from "@/contexts/DashboardContext";
import SecondNavBar from "../dashboard/@Navbar/page";
import DurationFilter from "@/features/dashboard/DurationFilters";
import DurationFilters from "@/features/dashboard/DurationFilters";

function DepartmentPage() {
  const [showCanvas, setShowCanvas] = useState(false);
  const [activeKey, setActiveKey] = useState("home");
  const [durationFilter, setDurationFilter] = useState("today");

  const { startDate, endDate, setStartDate, setEndDate } =
    useDepartmentContext();
  const {
    setStartDate: setStartDateDashboard,
    setEndDate: setEndDateDashboard,
  } = useDashboardContext();

  const useAppContext= useDepartmentContext()
  // Sync with dashboard context
  useEffect(() => {
    setStartDateDashboard(startDate);
    setEndDateDashboard(endDate);
  }, [startDate, endDate]);

  // Automatically update durationFilter based on startDate and endDate
useEffect(() => {
  if (!startDate || !endDate) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const start = new Date(startDate);
  const end = new Date(endDate);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  // Monday as start of week
  const day = today.getDay(); // 0 = Sunday, 1 = Monday ...
  const diff = day === 0 ? -6 : 1 - day;
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() + diff);

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  if (isSameDay(start, today) && isSameDay(end, today)) {
    setDurationFilter("today");
  } else if (isSameDay(start, yesterday) && isSameDay(end, yesterday)) {
    setDurationFilter("yesterday");
  } else if (isSameDay(start, startOfWeek) && isSameDay(end, today)) {
    setDurationFilter("this_week");
  } else if (isSameDay(start, startOfMonth) && isSameDay(end, today)) {
    setDurationFilter("this_month");
  } else {
    setDurationFilter("custom");
  }
}, [startDate, endDate]);


  const rawData = {
    department: "North Indian",
    cards: [
      {
        title: "Goal",
        value: "30% of Sale",
        icon: <FaBullseye />,
        color: "#4CAF50",
      },
      { title: "Products", value: "156", icon: <FaBox />, color: "#1976D2" },
      { title: "Team", value: "3", icon: <FaUsers />, color: "#FF9800" },
      {
        title: "Type",
        value: "Purchase and Sale",
        icon: <FaExchangeAlt />,
        color: "#9C27B0",
      },
    ],
  };

  const navTabs = [
    "Home",
    "Actionable Insights",
    "Products",
    "Sales",
    "Consumption",
    "Closing",
    "Sales-Forecast",
    "Consumption-Forecast",
  ];

  return (
    <div style={{ background: "#f9fafc", minHeight: "100vh",width:'99.5%' }} className="mt-1">
      <DepartmentHeader
        departmentId={2}
        onManageClick={() => setShowCanvas(true)}
      />
      {/* <div className="p-2 d-md-none">
        <DurationFilters useAppContext={useAppContext} />
      </div> */}
      <Container fluid className="mt-4">
        {/* <DepartmentCards cards={rawData.cards} /> */}
        {/* <DepartmentFilters
          durationFilter={durationFilter}
          setDurationFilter={setDurationFilter}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          navTabs={navTabs}
          activeKey={activeKey}
          setActiveKey={setActiveKey}
        /> */}
        <SecondNavBar
          tabs={navTabs}
          activeTab={activeKey}
          setActiveTab={setActiveKey}
          useAppContext={useAppContext}
        />
        {/* 
        <DepartmentTabs
          navTabs={navTabs}
          activeKey={activeKey}
          setActiveKey={setActiveKey}
        /> */}
        <DepartmentContent
          activeKey={activeKey}
          durationFilter={durationFilter}
          startDate={startDate}
          endDate={endDate}
        />
      </Container>
      <DepartmentClosingCanvas
        show={showCanvas}
        onClose={() => setShowCanvas(false)}
      />
    </div>
  );
}

export default DepartmentPage;
// "use client";
// import React, { useEffect, useState } from "react";
// import { Container } from "react-bootstrap";
// import { FaBullseye, FaBox, FaUsers, FaExchangeAlt } from "react-icons/fa";

// import DepartmentHeader from "@/features/departments/DepartmentHeader";
// import DepartmentCards from "@/features/departments/DepartmentCards";
// import DepartmentFilters from "@/features/departments/DepartmentFilters";
// import DepartmentTabs from "@/features/departments/DepartmentTabs";
// import DepartmentContent from "@/features/departments/DepartmentContent";
// import DepartmentClosingCanvas from "@/features/departments/DepartmentClosingCanvas";
// import { useDepartmentContext } from "@/contexts/DepartmentContext";
// import { useDashboardContext } from "@/contexts/DashboardContext";

// function DepartmentPage() {
//   const [showCanvas, setShowCanvas] = useState(false);
//   const [activeKey, setActiveKey] = useState("home");
//   const [durationFilter, setDurationFilter] = useState("today");
//   const {startDate,endDate,setStartDate,setEndDate} =useDepartmentContext()
//   const {  setStartDate:setStartDateDashboard, setEndDate:setEndDateDashboard } =
//     useDashboardContext();
//     useEffect(()=>{
//       setStartDateDashboard(startDate);
//       setEndDateDashboard(endDate);
//     },[startDate,endDate])

//   const rawData = {
//     department: "North Indian",
//     cards: [
//       {
//         title: "Goal",
//         value: "30% of Sale",
//         icon: <FaBullseye />,
//         color: "#4CAF50",
//       },
//       { title: "Products", value: "156", icon: <FaBox />, color: "#1976D2" },
//       { title: "Team", value: "3", icon: <FaUsers />, color: "#FF9800" },
//       {
//         title: "Type",
//         value: "Purchase and Sale",
//         icon: <FaExchangeAlt />,
//         color: "#9C27B0",
//       },
//     ],
//   };

//   const navTabs = [
//     "Home",
//     "Actionable Insights",
//     "Products",
//     "Sales",
//     "Consumption",
//     "Closing",
//     "Sales-Forecast",
//     "Consumption-Forecast",
//   ];

//   return (
//     <div
//       style={{ background: "#f9fafc", minHeight: "100vh" }}
//       className="mt-5 pt-2"
//     >
//       <DepartmentHeader
//         department={rawData.department}
//         onManageClick={() => setShowCanvas(true)}
//       />
//       <Container fluid className="mt-4">
//         <DepartmentCards cards={rawData.cards} />
//         <DepartmentFilters
//           durationFilter={durationFilter}
//           setDurationFilter={setDurationFilter}
//           startDate={startDate}
//           setStartDate={setStartDate}
//           endDate={endDate}
//           setEndDate={setEndDate}
//           navTabs={navTabs}
//           activeKey={activeKey}
//           setActiveKey={setActiveKey}
//         />
//         <DepartmentTabs
//           navTabs={navTabs}
//           activeKey={activeKey}
//           setActiveKey={setActiveKey}
//         />
//         <DepartmentContent
//           activeKey={activeKey}
//           durationFilter={durationFilter}
//           startDate={startDate}
//           endDate={endDate}
//         />
//       </Container>
//       <DepartmentClosingCanvas
//         show={showCanvas}
//         onClose={() => setShowCanvas(false)}
//       />
//     </div>
//   );
// }

// export default DepartmentPage;
