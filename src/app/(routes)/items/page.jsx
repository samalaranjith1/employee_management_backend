"use client";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { useItemsContext } from "@/contexts/ItemsContext";
import ItemsSupplierProductsHeader from "@/components/common/ItemsSupplierProductsHeader";
import ItemsContent from "@/features/items/ItemsContent";
import SecondNavBar from "../dashboard/@Navbar/page";
import DurationFilters from "@/features/dashboard/DurationFilters";

function ItemsPage() {
  const [activeTab, setActiveTab] = useState("Home");
  const [durationFilter, setDurationFilter] = useState("today"); // lowercase for consistency
  const { startDate, endDate, setStartDate, setEndDate } = useItemsContext();

  const {
    setStartDate: setStartDateDashboard,
    setEndDate: setEndDateDashboard,
  } = useDashboardContext();
  const useAppContext = useItemsContext()

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
      setDurationFilter("Today");
    } else if (isSameDay(start, yesterday) && isSameDay(end, yesterday)) {
      setDurationFilter("Yesterday");
    } else if (isSameDay(start, startOfWeek) && isSameDay(end, today)) {
      setDurationFilter("This Week");
    } else if (isSameDay(start, startOfMonth) && isSameDay(end, today)) {
      setDurationFilter("This Month");
    } else {
      setDurationFilter("Custom");
    }
  }, [startDate, endDate]);

  const navTabs = [
    "Home",
    "Insights",
    "Purchase",
    "Consumption",
    "Products",
    "Price Trends",
    "Stock Trends",
  ];

  return (
    <div
      style={{ background: "#f9fafc", minHeight: "100vh" }}
      className="mt-5 pt-2"
    >
      <ItemsSupplierProductsHeader
        title="Gold Drop Oil"
        subtitle="Indian Grocery • 1000 GM"
        price="₹115.7"
        tabs={navTabs}
        onFilterChange={(filter) => console.log("Filter Changed:", filter)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setDurationFilter={setDurationFilter}
        durationFilter={durationFilter}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        startDate={startDate}
        endDate={endDate}
      />
      <div className="p-2 d-md-none"><DurationFilters useAppContext={useAppContext} /></div>
      <SecondNavBar tabs={navTabs} activeTab={activeTab} setActiveTab={setActiveTab} useAppContext={useAppContext} />
      <Container fluid className="mt-4">
        <ItemsContent activeTab={activeTab} durationFilter={durationFilter} />
      </Container>
    </div>
  );
}

export default ItemsPage;

// "use client";
// import React, { useEffect, useState } from "react";
// import { Container } from "react-bootstrap";
// import { useDashboardContext } from "@/contexts/DashboardContext";
// import { useItemsContext } from "@/contexts/ItemsContext";
// import ItemsSupplierProductsHeader from "@/components/common/ItemsSupplierProductsHeader";
// import ItemsContent from "@/features/items/ItemsContent";

// function ItemsPage() {
//   const [activeTab, setActiveTab] = useState("Home");
//   const [durationFilter, setDurationFilter] = useState("Today");
//   const { startDate, endDate, setStartDate, setEndDate } = useItemsContext();

//   const {
//     setStartDate: setStartDateDashboard,
//     setEndDate: setEndDateDashboard,
//   } = useDashboardContext();
//   useEffect(() => {
//     setStartDateDashboard(startDate);
//     setEndDateDashboard(endDate);
//   }, [startDate, endDate]);

//   const navTabs = [
//     "Home",
//     "Insights",
//     "Purchase",
//     "Consumption",
//     "Products",
//     "Price Trends",
//     "Stock Trends",
//   ];

//   return (
//     <div
//       style={{ background: "#f9fafc", minHeight: "100vh" }}
//       className="mt-5 pt-2"
//     >
//       <ItemsSupplierProductsHeader
//         title="Gold Drop Oil"
//         subtitle="Indian Grocery • 1000 GM"
//         price="₹115.7"
//         tabs={navTabs}
//         onFilterChange={(filter) => console.log("Filter Changed:", filter)}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         setDurationFilter={setDurationFilter}
//         durationFilter={durationFilter}
//         setStartDate={setStartDate}
//         setEndDate={setEndDate}
//         startDate={startDate}
//         endDate={endDate}
//       />
//       <Container fluid className="mt-4">
//         <ItemsContent activeTab={activeTab} durationFilter={durationFilter} />
//       </Container>
//     </div>
//   );
// }

// export default ItemsPage;
