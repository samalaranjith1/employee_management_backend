"use client";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { useProductsContext } from "@/contexts/ProductsContext";
import ItemsSupplierProductsHeader from "@/components/common/ItemsSupplierProductsHeader";
import ProdcutsContent from "@/features/products/ProductsContent";
import { FaBoxOpen, FaBullseye, FaCube, FaUserClock } from "react-icons/fa";

function ProductsPage() {
  const [activeTab, setActiveTab] = useState("Home");
  const [durationFilter, setDurationFilter] = useState("today"); // lowercase for consistency

  const { startDate, endDate, setStartDate, setEndDate } = useProductsContext();
  const {
    setStartDate: setStartDateDashboard,
    setEndDate: setEndDateDashboard,
  } = useDashboardContext();

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

  const navTabs = ["Home", "Sales", "Ingredients", "Cost"];
  const filters = ["Today", "Yesterday", "This Week", "This Month", "Custom"];

  // 🔹 RawData for cards
  const rawData = [
    {
      title: "Margin Cost",
      value: "₹106",
      icon: <FaBullseye />,
      color: "#2ecc71",
    },
    { title: "Margin", value: "67.72%", icon: <FaCube />, color: "#3498db" },
    {
      title: "Prep Time",
      value: "5 Mins",
      icon: <FaUserClock />,
      color: "#e67e22",
    },
    {
      title: "Pieces",
      value: "5 (15 GM Each)",
      icon: <FaBoxOpen />,
      color: "#9b59b6",
    },
  ];

  return (
    <div style={{ background: "#f9fafc", minHeight: "100vh" }} className="mt-5">
      <ItemsSupplierProductsHeader
        title="Butter Chicken (Half)"
        subtitle="North Indian • Butter Chicken • Half • ₹320"
        showBackButton
        tabs={navTabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        durationFilter={durationFilter}
        setDurationFilter={setDurationFilter}
        filters={filters}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        rawData={rawData}
        startDate={startDate}
        endDate={endDate}
      />

      <Container fluid className="mt-4">
        <ProdcutsContent
          activeTab={activeTab}
          durationFilter={durationFilter}
        />
      </Container>
    </div>
  );
}

export default ProductsPage;

// "use client";
// import React, { useEffect, useState } from "react";
// import { Container } from "react-bootstrap";
// import { useDashboardContext } from "@/contexts/DashboardContext";
// import ItemsSupplierProductsHeader from "@/components/common/ItemsSupplierProductsHeader";
// import { FaBoxOpen, FaBullseye, FaCube, FaUserClock } from "react-icons/fa";
// import ProdcutsContent from "@/features/products/ProductsContent";
// import { useProductsContext } from "@/contexts/ProductsContext";

// function ProductsPage() {
//   const [activeTab, setActiveTab] = useState("Home");
//   const [durationFilter, setDurationFilter] = useState("Today");

//   const { startDate, endDate, setStartDate, setEndDate } = useProductsContext();

//   const {
//     setStartDate: setStartDateDashboard,
//     setEndDate: setEndDateDashboard,
//   } = useDashboardContext();

//   useEffect(() => {
//     setStartDateDashboard(startDate);
//     setEndDateDashboard(endDate);
//   }, [startDate, endDate]);

//   const navTabs = ["Home", "Sales", "Ingredients", "Cost"];
//   const filters = ["Today", "Yesterday", "This Week", "This Month", "Custom"];

//   // 🔹 RawData for cards (you can fetch these values dynamically later)
//   const rawData = [
//     {
//       title: "Margin Cost",
//       value: "₹106",
//       icon: <FaBullseye />, // icon key
//       color: "#2ecc71",
//     },
//     {
//       title: "Margin",
//       value: "67.72%",
//       icon: <FaCube />,
//       color: "#3498db",
//     },
//     {
//       title: "Prep Time",
//       value: "5 Mins",
//       icon: <FaUserClock />,
//       color: "#e67e22",
//     },
//     {
//       title: "Pieces",
//       value: "5 (15 GM Each)",
//       icon: <FaBoxOpen />,
//       color: "#9b59b6",
//     },
//   ];

//   return (
//     <div style={{ background: "#f9fafc", minHeight: "100vh" }} className="mt-5">
//       <ItemsSupplierProductsHeader
//         title="Butter Chicken (Half)"
//         subtitle="North Indian • Butter Chicken • Half • ₹320"
//         showBackButton
//         tabs={navTabs}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         durationFilter={durationFilter}
//         setDurationFilter={setDurationFilter}
//         filters={filters}
//         setStartDate={setStartDate}
//         setEndDate={setEndDate}
//         rawData={rawData} // ✅ pass rawData
//         startDate={startDate}
//         endDate={endDate}
//       />

//       <Container fluid className="mt-4">
//         <ProdcutsContent
//           activeTab={activeTab}
//           durationFilter={durationFilter}
//         />
//       </Container>
//     </div>
//   );
// }

// export default ProductsPage;
