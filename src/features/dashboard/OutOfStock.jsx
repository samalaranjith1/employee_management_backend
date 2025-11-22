"use client";

import React, { useRef } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import OutOfStockTopCards from "@/components/common/dashboard/card/OutOfStockTopCards";
import OutOfStockTable from "@/components/common/dashboard/TablesSort/OutOfStockTable";
import ComponentHeader from "@/components/common/ComponentHeader";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { useItemsBelowMOQSummary } from "@/services/item-service";
import { outOfOfficeDataFormatter } from "@/utils/data_formatters/dashboardFormatter";
import { handleNavigation } from "@/utils";
import { useRouter } from "next/navigation";
import { FaExclamationTriangle, FaExpand } from "react-icons/fa";
import { IconAlertTriangle, IconArrowsMaximize } from "@tabler/icons-react";

export default function InventoryDashboard() {
  const { startDate, endDate, isMobile } = useDashboardContext();
  const myScrollRef = useRef(null);
  const router = useRouter()

  const getBadgeStyle = (status) => {
    const base = {
      padding: "4px 10px",
      borderRadius: "8px",
      fontSize: "0.8rem",
      fontWeight: "500",
      display: "inline-block",
    };
    if (status.toLowerCase() === "orange") {
      return { ...base, background: "#fff7ea", color: "#cc6629" };
    }
    if (status.toLowerCase() === "red") {
      return { ...base, background: "#fff0f0", color: "#dc2620" };
    }
    if (status.toLowerCase() === "green") {
      return { ...base, background: "#ddf4ebff", color: "#07fc17f8" };
    }
    return base;
  };

  const cardBase = {
    flex: "0 0 25vw",
    display: 'flex',
    flexShrink: 1,
    minWidth: isMobile ? "88vw" : '30vw',
    borderRadius: "12px",
    padding: "1rem",
    color: "#000",
  };

  const iconStyle = { fontSize: "2rem", marginBottom: "0.5rem" };

  return (
    <Container fluid className="p-2">
      <ComponentHeader
        title={"Out of Stock"}
        description={"Monitor inventory levels and prevent stockouts"}
        titleColor={"#232425"}
        cardBgColor={"none"}
        isShowArrows={true}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={<div style={{
          background: '#e5276e', // pink-red gradient
          borderRadius: '12px',
          padding: '8px',
          display: 'inline-block'
        }}>
          <IconAlertTriangle stroke={2} color="#fff" size={20} />
        </div>}
        text={""}
      />

      {/* ✅ ServiceRenderer takes care of loading, error, retry, no data */}
      <ServiceRenderer
        queryHook={useItemsBelowMOQSummary}
        queryKey={[
          "itemsBelowMOQSummary",
          1,
          { startdt: startDate, enddt: endDate },
        ]}
        queryFn={() =>
          useItemsBelowMOQSummary(1, {
            startdt: startDate,
            enddt: endDate,
          }).queryFn
        }
        queryArgs={[
          { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
        ]}
        formatter={outOfOfficeDataFormatter}
        shimmerCount={3}
      >
        {(formattedData, refetch) => (
          <>
            {/* Top Cards */}
            <div
              onClick={() =>
                handleNavigation({
                  router,
                  url: "sp/ware_house_analytics",
                  params: { startDate: startDate, endDate: endDate },
                })
              }
              style={{ cursor: "pointer", width: '100%' }}
            >
              <OutOfStockTopCards
                cardBase={cardBase}
                cardsData={formattedData?.cardsData}
                iconStyle={iconStyle}
                scrollRef={myScrollRef}
              />
            </div>

            {/* Horizontal Card Tables */}
            <Container fluid className="mt-2 ">
              <Row className="p-0">
                <Col md={6} style={{
                  border:'2px solid #eee',
                  borderRadius:'10px'
                }}>
                  <div className="d-flex align-items-center justify-content-between p-1">
                    {/* Column 1: Icon */}
                    {/* <div style={{
                      background: '#e6276e', // pink-red gradient
                      borderRadius: '12px',
                      padding: '8px',
                      display: 'inline-block'
                    }}>
                      <IconAlertTriangle stroke={2} color="#fff" size={20} />
                    </div> */}

                    {/* Column 2: Title + Description */}
                    <div className="ms-3 flex-grow-1">
                      <h6 style={{
                        fontSize: '18px',
                        fontWeight: "600",
                        color: '#232425',
                        marginTop: '+5px'
                      }}>Items</h6>
                      {/* <p className="mb-0 text-muted">Monitor inventory levels and prevent stock out</p> */}
                    </div>

                    {/* Column 3: Number */}
                    {/* <div className="text-end">
                      <IconArrowsMaximize />
                    </div> */}
                  </div>

                  <OutOfStockTable
                    data={formattedData?.items || []}
                    getBadgeStyle={getBadgeStyle}
                  />
                </Col>
                <Col md={6} style={{
                  border:'2px solid #eee',
                  borderRadius:'10px'
                }}>
                  <div className="d-flex align-items-center justify-content-between p-1">
                    {/* Column 1: Icon */}
                    {/* <div style={{
                      background: '#833dd5', // pink-red gradient
                      borderRadius: '12px',
                      padding: '8px',
                      display: 'inline-block'
                    }}>
                      <IconAlertTriangle stroke={2} color="#fff" size={20} />
                    </div> */}

                    {/* Column 2: Title + Description */}
                    <div className="ms-3 flex-grow-1">
                      <h6 style={{
                        fontSize: '18px',
                        fontWeight: "600",
                        color: '#232425',
                        marginTop: '+5px'
                      }}>Base Items</h6>
                      {/* <p className="mb-0 text-muted">Monitor inventory levels and prevent stock out</p> */}
                    </div>

                    {/* Column 3: Number */}
                    {/* <div className="text-end">
                      <IconArrowsMaximize />
                    </div> */}
                  </div>
                  <OutOfStockTable
                    data={formattedData?.baseItems || []}
                    getBadgeStyle={getBadgeStyle}
                  />
                </Col>
              </Row>
            </Container>
          </>
        )}
      </ServiceRenderer>
    </Container>
  );
}

// "use client";

// import React, { useRef } from "react";
// import { Container, Card, Row, Col } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import OutOfStockTopCards from "@/components/common/card/OutOfStockTopCards";
// import OutOfStockTable from "@/components/common/TablesSort/OutOfStockTable";
// import ComponentHeader from "@/components/common/ComponentHeader";

// const InventoryDashboard = () => {
//   const items = [
//     {
//       name: "Chicken Breast",
//       moq: "50 kg",
//       stock: "2 kg",
//       status: "Critical",
//       category: "Poultry",
//       size: "1 KG",
//       code: "#1040",
//       closing: "2025-01-10",
//     },
//     {
//       name: "Chicken Breast",
//       moq: "50 kg",
//       stock: "2 kg",
//       status: "Critical",
//       category: "Poultry",
//       size: "1 KG",
//       code: "#1040",
//       closing: "2025-01-10",
//     },
//     {
//       name: "Chicken Breast",
//       moq: "50 kg",
//       stock: "2 kg",
//       status: "Critical",
//       category: "Poultry",
//       size: "1 KG",
//       code: "#1040",
//       closing: "2025-01-10",
//     },
//     {
//       name: "Chicken Breast",
//       moq: "50 kg",
//       stock: "2 kg",
//       status: "Critical",
//       category: "Poultry",
//       size: "1 KG",
//       code: "#1040",
//       closing: "2025-01-10",
//     },
//     {
//       name: "Chicken Breast",
//       moq: "50 kg",
//       stock: "2 kg",
//       status: "Critical",
//       category: "Poultry",
//       size: "1 KG",
//       code: "#1040",
//       closing: "2025-01-10",
//     },
//     {
//       name: "Fresh Salmon",
//       moq: "25 kg",
//       stock: "0 kg",
//       status: "Out of Stock",
//       category: "Seafood",
//       size: "1 KG",
//       code: "#2395",
//       closing: "2025-01-09",
//     },
//     {
//       name: "Premium Coffee Beans",
//       moq: "10 kg",
//       stock: "1 kg",
//       status: "Critical",
//       category: "Beverages",
//       size: "1 KG",
//       code: "#23750",
//       closing: "2025-01-12",
//     },
//   ];

//   const baseItems = [
//     {
//       name: "Basmati Rice",
//       moq: "100 kg",
//       stock: "5 kg",
//       status: "Critical",
//       category: "Grains",
//       size: "1 KG",
//       code: "#192",
//       closing: "2025-01-11",
//     },
//     {
//       name: "Basmati Rice",
//       moq: "100 kg",
//       stock: "5 kg",
//       status: "Critical",
//       category: "Grains",
//       size: "1 KG",
//       code: "#192",
//       closing: "2025-01-11",
//     },
//     {
//       name: "Basmati Rice",
//       moq: "100 kg",
//       stock: "5 kg",
//       status: "Critical",
//       category: "Grains",
//       size: "1 KG",
//       code: "#192",
//       closing: "2025-01-11",
//     },
//     {
//       name: "Basmati Rice",
//       moq: "100 kg",
//       stock: "5 kg",
//       status: "Critical",
//       category: "Grains",
//       size: "1 KG",
//       code: "#192",
//       closing: "2025-01-11",
//     },
//     {
//       name: "Cooking Oil",
//       moq: "50 liters",
//       stock: "0 liters",
//       status: "Out of Stock",
//       category: "Oils",
//       size: "1 LITERS",
//       code: "#287",
//       closing: "2025-01-09",
//     },
//     {
//       name: "Wheat Flour",
//       moq: "75 kg",
//       stock: "2 kg",
//       status: "Critical",
//       category: "Grains",
//       size: "1 KG",
//       code: "#154",
//       closing: "2025-01-10",
//     },
//   ];

//   const getBadgeStyle = (status) => {
//     const base = {
//       padding: "4px 10px",
//       borderRadius: "8px",
//       fontSize: "0.8rem",
//       fontWeight: "500",
//       display: "inline-block",
//     };
//     if (status.toLowerCase() === "critical") {
//       return { ...base, background: "#FFF0D5", color: "#E78C27" };
//     }
//     if (status.toLowerCase() === "out of stock") {
//       return { ...base, background: "#FFD6D9", color: "#E74C3C" };
//     }
//     return base;
//   };
//   const cardBase = {
//     // Adjusted flex basis to use vw units for desktop
//     flex: "0 0 30vw",
//     minWidth: "250px", // Keep a minimum width to prevent content from collapsing
//     borderRadius: "12px",
//     padding: "1rem",
//     color: "#000",
//   };

//   const iconStyle = { fontSize: "2rem", marginBottom: "0.5rem" };
// const myScrollRef = useRef(null)
//   return (
//     <Container fluid className="p-2">
//       <ComponentHeader
//         title={"Out of Stock"}
//         description={"Monitor inventory levels and prevent stockouts"}
//         titleColor={"rgb(255,79,22)"}
//         cardBgColor={"none"}
//         isShowArrows={true}
//         scrollRef={myScrollRef}
//         isExpandable={true}
//         titleIcon={""}
//         text={''}
//       />
//       {/* Top Cards */}
//       <OutOfStockTopCards cardBase={cardBase} iconStyle={iconStyle}
//       scrollRef={myScrollRef} />

//       {/* Horizontal Card Tables */}
//       <Card className="p-2">
//         <Row className="p-0">
//           <Col md={6}>
//             <h5 style={{ fontWeight: "bold" }}>Items</h5>
//             <OutOfStockTable data={items} getBadgeStyle={getBadgeStyle} />
//           </Col>
//           <Col md={6}>
//             <h5 style={{ fontWeight: "bold" }}>Base Items</h5>
//             <OutOfStockTable data={baseItems} getBadgeStyle={getBadgeStyle} />
//           </Col>
//         </Row>
//       </Card>
//     </Container>
//   );
// };

// export default InventoryDashboard;
