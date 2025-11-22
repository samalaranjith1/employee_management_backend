"use client";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { useSuppliersContext } from "@/contexts/SuppliersContext";
import ItemsSupplierProductsHeader from "@/components/common/ItemsSupplierProductsHeader";
import SuppliersContent from "@/features/suppliers/SuppliersContent";
import DurationFilters from "@/features/dashboard/DurationFilters";
import SecondNavBar from "../dashboard/@Navbar/page";
import { useItem } from "@/services/item-service";
import { useSupplier } from "@/services/supplier-service";

function SuppliersPage() {
  const [activeTab, setActiveTab] = useState("Home");
  const [supplersHeaderData, setSuppliersHeaderData] = useState(null);
  const [durationFilter, setDurationFilter] = useState("today"); // lowercase for consistency

  const { startDate, endDate, setStartDate, setEndDate } =
    useSuppliersContext();
  const {
    setStartDate: setStartDateDashboard,
    setEndDate: setEndDateDashboard,
  } = useDashboardContext();
  const useAppContext = useSuppliersContext()

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
  const { data: suppliersData, error } = useSupplier(1, {
    outlet: 1,
    userId: 7,
  });

  // Format the header data when suppliersData changes
  useEffect(() => {
    // if (!suppliersData ) return;
    const formatted = {
      title: suppliersData?.name,
      subtitle: `${suppliersData?.city} • ${suppliersData?.state}`,
      price: ``,
    };
    setSuppliersHeaderData(formatted); // Assuming you want only the first item
  }, [suppliersData]);
  if (error) console.error("Error fetching items:", error);

  const navTabs = ["Home", "Items"];
  const filters = ["Today", "Yesterday", "This Week", "This Month", "Custom"];

  return (
    <div style={{ background: "#f9fafc", minHeight: "100vh", width: '99.5%' }} className="mt-1">
      {supplersHeaderData?.title ? (
        <ItemsSupplierProductsHeader
          title={supplersHeaderData?.title}
          subtitle={supplersHeaderData?.subtitle}
          showBackButton
          tabs={navTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          durationFilter={durationFilter}
          setDurationFilter={setDurationFilter}
          filters={filters}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          startDate={startDate}
          endDate={endDate}
        />
      ) : (
        <div
          style={{
            backgroundColor: "#d75921",
            color: "white",
            width: "100vw",
          }}
        >
          Loading...
        </div>
      )}
      {/* <div className="p-2 d-md-none">
        <DurationFilters useAppContext={useAppContext} />
      </div> */}
      <div className="mt-2">
      <SecondNavBar
        tabs={navTabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        useAppContext={useAppContext}
      />
      </div>
      <div fluid className="mt-2">
        <SuppliersContent
          activeTab={activeTab}
          durationFilter={durationFilter}
        />
      </div>
    </div>
  );
}

export default SuppliersPage;
// "use client";
// import React, { useEffect, useState } from "react";
// import { Container } from "react-bootstrap";
// import { useDashboardContext } from "@/contexts/DashboardContext";
// import { useSuppliersContext } from "@/contexts/SuppliersContext";
// import ItemsSupplierProductsHeader from "@/components/common/ItemsSupplierProductsHeader";
// import SuppliersContent from "@/features/suppliers/SuppliersContent";

// function SuppliersPage() {
//   const [activeTab, setActiveTab] = useState("Home");
//   const [durationFilter, setDurationFilter] = useState("today"); // lowercase for consistency

//   const { startDate, endDate, setStartDate, setEndDate } =
//     useSuppliersContext();
//   const {
//     setStartDate: setStartDateDashboard,
//     setEndDate: setEndDateDashboard,
//   } = useDashboardContext();

//   // Sync with dashboard context
//   useEffect(() => {
//     setStartDateDashboard(startDate);
//     setEndDateDashboard(endDate);
//   }, [startDate, endDate]);

//   // Automatically update durationFilter based on startDate and endDate
//   useEffect(() => {
//     if (!startDate || !endDate) return;

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const yesterday = new Date(today);
//     yesterday.setDate(today.getDate() - 1);

//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     start.setHours(0, 0, 0, 0);
//     end.setHours(0, 0, 0, 0);

//     const isSameDay = (d1, d2) =>
//       d1.getFullYear() === d2.getFullYear() &&
//       d1.getMonth() === d2.getMonth() &&
//       d1.getDate() === d2.getDate();

//     // Monday as start of week
//     const day = today.getDay(); // 0 = Sunday, 1 = Monday ...
//     const diff = day === 0 ? -6 : 1 - day;
//     const startOfWeek = new Date(today);
//     startOfWeek.setDate(today.getDate() + diff);

//     const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

//     if (isSameDay(start, today) && isSameDay(end, today)) {
//       setDurationFilter("Today");
//     } else if (isSameDay(start, yesterday) && isSameDay(end, yesterday)) {
//       setDurationFilter("Yesterday");
//     } else if (isSameDay(start, startOfWeek) && isSameDay(end, today)) {
//       setDurationFilter("This Week");
//     } else if (isSameDay(start, startOfMonth) && isSameDay(end, today)) {
//       setDurationFilter("This Month");
//     } else {
//       setDurationFilter("Custom");
//     }
//   }, [startDate, endDate]);

//   const navTabs = ["Home", "Items"];
//   const filters = ["Today", "Yesterday", "This Week", "This Month", "Custom"];

//   return (
//     <div style={{ background: "#f9fafc", minHeight: "100vh" }} className="mt-5">
//       <ItemsSupplierProductsHeader
//         title="SMart"
//         subtitle="Madhapur. Hyderabad. Telangana"
//         showBackButton
//         tabs={navTabs}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         durationFilter={durationFilter}
//         setDurationFilter={setDurationFilter}
//         filters={filters}
//         setStartDate={setStartDate}
//         setEndDate={setEndDate}
//         startDate={startDate}
//         endDate={endDate}
//       />

//       <Container fluid className="mt-4">
//         <SuppliersContent
//           activeTab={activeTab}
//           durationFilter={durationFilter}
//         />
//       </Container>
//     </div>
//   );
// }

// export default SuppliersPage;
// "use client";
// import React, { useEffect, useState } from "react";
// import { Container } from "react-bootstrap";
// import { useDashboardContext } from "@/contexts/DashboardContext";
// import { useSuppliersContext } from "@/contexts/SuppliersContext";
// import ItemsSupplierProductsHeader from "@/components/common/ItemsSupplierProductsHeader";
// import SuppliersContent from "@/features/suppliers/SuppliersContent";

// function SuppliersPage() {
//   const [activeTab, setActiveTab] = useState("Home");
//   const [durationFilter, setDurationFilter] = useState("Today");

//   const { startDate, endDate, setStartDate, setEndDate } =
//     useSuppliersContext();
//   const {
//     setStartDate: setStartDateDashboard,
//     setEndDate: setEndDateDashboard,
//   } = useDashboardContext();

//   // Sync with dashboard context
//   useEffect(() => {
//     setStartDateDashboard(startDate);
//     setEndDateDashboard(endDate);
//   }, [startDate, endDate]);

//   // Automatically update durationFilter based on startDate and endDate
//   useEffect(() => {
//     if (!startDate || !endDate) return;

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const yesterday = new Date(today);
//     yesterday.setDate(today.getDate() - 1);

//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     start.setHours(0, 0, 0, 0);
//     end.setHours(0, 0, 0, 0);

//     const isSameDay = (d1, d2) =>
//       d1.getFullYear() === d2.getFullYear() &&
//       d1.getMonth() === d2.getMonth() &&
//       d1.getDate() === d2.getDate();

//     // Monday as start of week
//     const day = today.getDay(); // 0 = Sunday, 1 = Monday ...
//     const diff = day === 0 ? -6 : 1 - day;
//     const startOfWeek = new Date(today);
//     startOfWeek.setDate(today.getDate() + diff);

//     const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

//     if (isSameDay(start, today) && isSameDay(end, today)) {
//       setDurationFilter("Today");
//     } else if (isSameDay(start, yesterday) && isSameDay(end, yesterday)) {
//       setDurationFilter("Yesterday");
//     } else if (isSameDay(start, startOfWeek) && isSameDay(end, today)) {
//       setDurationFilter("This Week");
//     } else if (isSameDay(start, startOfMonth) && isSameDay(end, today)) {
//       setDurationFilter("This Month");
//     } else {
//       setDurationFilter("Custom");
//     }
//   }, [startDate, endDate]);

//   const navTabs = ["Home", "Items"];
//   const filters = ["Today", "Yesterday", "This Week", "This Month", "Custom"];

//   return (
//     <div style={{ background: "#f9fafc", minHeight: "100vh" }} className="mt-5">
//       <ItemsSupplierProductsHeader
//         title="SMart"
//         subtitle="Madhapur. Hyderabad. Telangana"
//         showBackButton
//         tabs={navTabs}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         durationFilter={durationFilter}
//         setDurationFilter={setDurationFilter}
//         filters={filters}
//         setStartDate={setStartDate}
//         setEndDate={setEndDate}
//         startDate={startDate}
//         endDate={endDate}
//       />

//       <Container fluid className="mt-4">
//         <SuppliersContent
//           activeTab={activeTab}
//           durationFilter={durationFilter}
//         />
//       </Container>
//     </div>
//   );
// }

// export default SuppliersPage;

// "use client";
// import React, { useEffect, useState } from "react";
// import { Container } from "react-bootstrap";
// import { useDashboardContext } from "@/contexts/DashboardContext";
// import { useItemsContext } from "@/contexts/ItemsContext";
// import ItemsSupplierProductsHeader from "@/components/common/ItemsSupplierProductsHeader";
// import SuppliersContent from "@/features/suppliers/SuppliersContent";
// import { useSuppliersContext } from "@/contexts/SuppliersContext";

// function SuppliersPage() {
//   const [activeTab, setActiveTab] = useState("Home");
//   const [durationFilter, setDurationFilter] = useState("Today");

//   const { startDate, endDate, setStartDate, setEndDate } = useSuppliersContext();
//   const {
//     setStartDate: setStartDateDashboard,
//     setEndDate: setEndDateDashboard,
//   } = useDashboardContext();

//   useEffect(() => {
//     setStartDateDashboard(startDate);
//     setEndDateDashboard(endDate);
//   }, [startDate, endDate]);

//   const navTabs = ["Home", "Items"];
//   const filters = ["Today", "Yesterday", "This Week", "This Month", "Custom"];

//   return (
//     <div style={{ background: "#f9fafc", minHeight: "100vh" }} className="mt-5">
//       <ItemsSupplierProductsHeader
//         title="SMart"
//         subtitle="Madhapur. Hyderabad. Telangana"
//         showBackButton
//         tabs={navTabs}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         durationFilter={durationFilter}
//         setDurationFilter={setDurationFilter}
//         filters={filters}
//         setStartDate={setStartDate}
//         setEndDate={setEndDate}
//         startDate={startDate}
//         endDate={endDate}
//       />

//       <Container fluid className="mt-4">
//         <SuppliersContent
//           activeTab={activeTab}
//           durationFilter={durationFilter}
//         />
//       </Container>
//     </div>
//   );
// }

// export default SuppliersPage;
