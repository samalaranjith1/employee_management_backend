"use client";
import React, { useEffect, useState } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { useItemsContext } from "@/contexts/ItemsContext";
import ItemsSupplierProductsHeader from "@/components/common/ItemsSupplierProductsHeader";
import ItemsContent from "@/features/items/ItemsContent";
import SecondNavBar from "../dashboard/@Navbar/page";
import DurationFilters from "@/features/dashboard/DurationFilters";
import { useItem } from "@/services/item-service";

function ItemsPage() {
  const [activeTab, setActiveTab] = useState("Home");
  const [itemsHeaderData, setItemsHeaderData] = useState(null);
  const [durationFilter, setDurationFilter] = useState("today");
  const { startDate, endDate, setStartDate, setEndDate } = useItemsContext();

  const {
    setStartDate: setStartDateDashboard,
    setEndDate: setEndDateDashboard,
  } = useDashboardContext();
  const useAppContext = useItemsContext();

  // Sync with dashboard context
  useEffect(() => {
    setStartDateDashboard(startDate);
    setEndDateDashboard(endDate);
  }, [startDate, endDate]);

  // Duration filter calculation
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

    const day = today.getDay(); // 0 = Sunday
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

  // ✅ Use the hook at top level
  const { data: itemsData, error } = useItem(74, {
    outlet: 1,
    userId: 7,
  });

  // Format the header data when itemsData changes
  useEffect(() => {
    // if (!itemsData ) return;
    const formatted = {
      title: itemsData?.name,
      subtitle: `${itemsData?.categoryName} • ${itemsData?.unitQuantity} ${itemsData?.unit}`,
      price: `₹${itemsData?.unitPrice.toFixed(1)}`,
    };
    setItemsHeaderData(formatted); // Assuming you want only the first item
  }, [itemsData]);
  if (error) console.error("Error fetching items:", error);

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
    <div style={{ background: "#f9fafc", minHeight: "100vh",width:'99.5%' }} className="mt-1">
      {itemsHeaderData?.title ? (
        <ItemsSupplierProductsHeader
          title={itemsHeaderData?.title}
          subtitle={itemsHeaderData?.subtitle}
          price={itemsHeaderData?.price}
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
      <SecondNavBar
        tabs={navTabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        useAppContext={useAppContext}
      />
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
// import SecondNavBar from "../dashboard/@Navbar/page";
// import DurationFilters from "@/features/dashboard/DurationFilters";
// import { useItemList, useItem } from "@/services/item-service";

// function ItemsPage() {
//   const [activeTab, setActiveTab] = useState("Home");
//   const [itemsHeaderData,setItemsHeaderData]=useState(null)
//   const [durationFilter, setDurationFilter] = useState("today"); // lowercase for consistency
//   const { startDate, endDate, setStartDate, setEndDate } = useItemsContext();

//   const {
//     setStartDate: setStartDateDashboard,
//     setEndDate: setEndDateDashboard,
//   } = useDashboardContext();
//   const useAppContext = useItemsContext()

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

//    const fetchItems = async () => {
//      try {
//        // Call the service
//        const res = useItem(74, {
//          outlet: 1,
//          userId: 7,
//        });

//        // Check for errors
//        if (!res || !res.data) return;

//        // Format the data
//        const formatted = res.data.map((item) => ({
//          title: item.name,
//          subtitle: `${item.categoryName} • ${item.unitQuantity} ${item.unit}`,
//          price: `₹${item.unitPrice.toFixed(1)}`,
//        }));
//        console.log("Formatted Item Data:", formatted[0], res);
//        setItemsHeaderData(formatted);
//      } catch (err) {
//        console.error("Error fetching items:", err);
//      }
//    };
//    useEffect(() => {
//      fetchItems();
//    }, []);
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
//         title={itemsHeaderData?.title}
//         subtitle={itemsHeaderData?.subtitle}
//         price={itemsHeaderData?.price}
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
//       <div className="p-2 d-md-none">
//         <DurationFilters useAppContext={useAppContext} />
//       </div>
//       <SecondNavBar
//         tabs={navTabs}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         useAppContext={useAppContext}
//       />
//       <Container fluid className="mt-4">
//         <ItemsContent activeTab={activeTab} durationFilter={durationFilter} />
//       </Container>
//     </div>
//   );
// }

// export default ItemsPage;

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
