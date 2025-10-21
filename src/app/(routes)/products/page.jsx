"use client";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { useProductsContext } from "@/contexts/ProductsContext";
import ItemsSupplierProductsHeader from "@/components/common/ItemsSupplierProductsHeader";
import ProdcutsContent from "@/features/products/ProductsContent";
import { FaBoxOpen, FaBullseye, FaCube, FaUserClock } from "react-icons/fa";
import SecondNavBar from "../dashboard/@Navbar/page";
import DurationFilters from "@/features/dashboard/DurationFilters";
import { useProduct } from "@/services/product-service";

function ProductsPage() {
  const [activeTab, setActiveTab] = useState("Home");
  const [productsHeaderData, setProductsHeaderData] = useState(null);
  const [durationFilter, setDurationFilter] = useState("today"); // lowercase for consistency

  const { startDate, endDate, setStartDate, setEndDate } = useProductsContext();
  const {
    setStartDate: setStartDateDashboard,
    setEndDate: setEndDateDashboard,
  } = useDashboardContext();

  const useAppContext = useProductsContext();
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

    const { data: productsData, error } = useProduct(74, {
      outlet: 1,
      userId: 7,
    });
  
    // Format the header data when productsData changes
    useEffect(() => {
      // if (!productsData ) return;
      const formatted = {
        title: productsData?.name,
        subtitle: `${productsData?.departmentName} • ${
          productsData?.masterProductName
        } ${productsData?.variation} ₹${productsData?.price.toFixed(1)}`,
        price: <div>{`Margin Cost:₹${productsData?.margin?.toFixed(
          1
        )} • Margin:${productsData?.marginPercentage?.toFixed(
          2
        )}% • Prep Time:${productsData?.preparationTime} Mins • Pieces:${
          productsData?.pieceCount
        } (${productsData?.pieceQuantity} ${productsData?.pieceUnit} Each)`}</div>,
      };
      setProductsHeaderData(formatted); // Assuming you want only the first item
    }, [productsData]);
    if (error) console.error("Error fetching items:", error);

  const navTabs = ["Home", "Sales", "Ingredients", "Cost"];
  const filters = ["Today", "Yesterday", "This Week", "This Month", "Custom"];

  return (
    <div style={{ background: "#f9fafc", minHeight: "100vh",width:'99.5%' }} className="mt-1">
      {productsHeaderData?.title ? (
        <ItemsSupplierProductsHeader
          title={productsHeaderData?.title}
          subtitle={productsHeaderData?.subtitle}
          price={productsHeaderData?.price}
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
      <div className="p-2 d-md-none">
        <DurationFilters useAppContext={useAppContext} />
      </div>
      <SecondNavBar
        tabs={navTabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        useAppContext={useAppContext}
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
