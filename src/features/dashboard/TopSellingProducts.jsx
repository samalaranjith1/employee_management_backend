"use client";

import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaStar, FaBoxOpen, FaChartLine, FaShoppingCart } from "react-icons/fa";

import "bootstrap/dist/css/bootstrap.min.css";
import TopSellingProductsCards from "@/components/common/dashboard/card/TopSellingProductsCards";
import TopSellingProductsGraph from "@/components/common/dashboard/GraphWrapper/TopSellingProductsGraph";
import TopSellingProductsTable from "@/components/common/dashboard/TablesSort/TopSellingProductsTable";
import ComponentHeader from "@/components/common/ComponentHeader";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { useProductsUsageList } from "@/services/product-service";
import { topSellingProductsDataFormatter } from "@/utils/data_formatters/dashboardFormatter";
import { IconChartColumn, IconStar } from "@tabler/icons-react";

const TopSellingProducts = () => {
  const { startDate, endDate } = useDashboardContext();
  const myScrollRef = useRef(null);

  const [isMobile, setIsMobile] = useState("0");

  useEffect(() => {
    const updateMinWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };
    updateMinWidth();
    window.addEventListener("resize", updateMinWidth);
    return () => window.removeEventListener("resize", updateMinWidth);
  }, []);

  return (
    <Container fluid style={{ padding: 16 }}>
      {/* Header */}
      <ComponentHeader
        title={"Top Selling Products"}
        description={"Analyze best-performing menu items and sales trends"}
        titleColor={"#232425"}
        cardBgColor={"none"}
        isShowArrows={true}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={<div style={{
          background: '#8755ff', // purple gradient for Figma look
          borderRadius: '12px',
          padding: '8px',
          display: 'inline-block'
        }}>
          <IconStar stroke={2} color="#fff" size={20} fill='white' />
        </div>}
        text={""}
      />

      {/* ✅ ServiceRenderer wraps data fetching, error, retry, shimmer */}
      <ServiceRenderer
        queryHook={useProductsUsageList}
        queryKey={[
          "productsUsageList",
          1,
          { startdt: startDate, enddt: endDate },
        ]}
        queryFn={() =>
          useProductsUsageList(1, { startdt: startDate, enddt: endDate })
            .queryFn
        }
        queryArgs={[{ startdt: startDate, enddt: endDate, outlet: 1, userId: 7 }]}
        formatter={topSellingProductsDataFormatter}
        shimmerCount={3}
      >
        {(data, refetch) => {
          const { topCards, chartData, revenueSummary } = data || {};

          return (
            <>
              {/* Top cards row */}
              <Row
                ref={myScrollRef}
                className="g-3 mb-4 top-card-row flex-nowrap overflow-auto"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {topCards?.map((card, idx) => (
                  <div
                    style={{
                      minWidth: isMobile ? '95%' : '250px',
                      width: isMobile ? '95%' : '25%',
                      maxWidth: isMobile ? '95%' :'300px',
                      // backgroundColor: card.bg,
                      // color:card.textColor,
                    }}> 
                    <TopSellingProductsCards card={card} key={idx} idx={idx} /></div>

                ))}
              </Row>

              {/* Chart and summary */}
              <Row className="g-3">
                <Col lg={8} md={7} sm={12}>
                  <Card
                    style={{
                      borderRadius: 12,
                      padding: 18,
                      height: "100%",
                      boxShadow: "0 8px 20px rgba(20,30,60,0.04)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 12,
                      }}
                    >
                      <div style={{
                        background: '#3a65f3', // blue gradient for Figma match
                        borderRadius: '12px',
                        padding: '8px',
                        display: 'inline-block'
                      }}>
                        <IconChartColumn stroke={2} color="#fff" size={20} />
                      </div>
                      <h5 style={{ margin: 0, fontWeight: 600, marginLeft: '5px', color: '#232425' }}>
                        Sales vs Margin Trends
                      </h5>
                    </div>
                    <div
                      style={{
                        // width: isMobile ? "110vw" : "100%",
                        marginLeft: isMobile ? "-40px" : "0px",
                        height: 340,
                      }}
                    >
                      <TopSellingProductsGraph chartData={chartData} />
                    </div>
                  </Card>
                </Col>

                <Col lg={4} md={5} sm={12}>
                  <TopSellingProductsTable revenueSummary={revenueSummary} />
                </Col>
              </Row>
            </>
          );
        }}
      </ServiceRenderer>
    </Container>
  );
};

export default TopSellingProducts;

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Container, Row, Col, Card } from "react-bootstrap";
// import { FaStar, FaBoxOpen, FaChartLine, FaShoppingCart } from "react-icons/fa";

// import "bootstrap/dist/css/bootstrap.min.css";
// import TopSellingProductsCards from "@/components/common/card/TopSellingProductsCards";
// import TopSellingProductsGraph from "@/components/common/GraphWrapper/TopSellingProductsGraph";
// import TopSellingProductsTable from "@/components/common/TablesSort/TopSellingProductsTable";
// import ComponentHeader from "@/components/common/ComponentHeader";

// const TopSellingProducts = () => {
//   const topCards = [
//     {
//       id: 1,
//       title: "Total Products",
//       value: "236",
//       subtitle: "Active menu items",
//       icon: <FaBoxOpen />,
//       bg: "#EEF2FF",
//       iconBg: "#7C5CFF",
//       color: "#2E2EA8",
//     },
//     {
//       id: 2,
//       title: "No Orders",
//       value: "110",
//       subtitle: "Zero sales today",
//       icon: <FaStar />,
//       bg: "#F6F7F9",
//       iconBg: "#6C7A86",
//       color: "#222831",
//     },
//     {
//       id: 3,
//       title: "5+ Orders",
//       value: "8",
//       subtitle: "Popular items",
//       icon: <FaChartLine />,
//       bg: "#E9FFF3",
//       iconBg: "#07A875",
//       color: "#0F6A43",
//     },
//     {
//       id: 4,
//       title: "10+ Orders",
//       value: "8",
//       subtitle: "Best sellers",
//       icon: <FaShoppingCart />,
//       bg: "#FFF6E6",
//       iconBg: "#F29F05",
//       color: "#8A4B00",
//     },
//   ];

//   const chartData = [
//     { name: "Butter Chick...", sales: 200, margin: 120 },
//     { name: "Chicken Biry...", sales: 170, margin: 100 },
//     { name: "Dal Makhani", sales: 140, margin: 90 },
//     { name: "Paneer Butte...", sales: 125, margin: 85 },
//     { name: "Tandoori Chi...", sales: 150, margin: 95 },
//     { name: "Masala Chai", sales: 60, margin: 30 },
//   ];
//  const [isMobile, setIsMobile] = useState("0");

//   useEffect(() => {
//     const updateMinWidth = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     updateMinWidth();
//     window.addEventListener("resize", updateMinWidth);
//     return () => window.removeEventListener("resize", updateMinWidth);
//   }, []);
// const myScrollRef= useRef(null)
//   return (
//     <Container fluid style={{ padding: 16 }}>
//       {/* Header */}
//       <ComponentHeader
//         title={"Top Selling Products"}
//         description={"Analyze best-performing menu items and sales trends"}
//         titleColor={"rgba(91, 46, 234, 1) fs-4"}
//         cardBgColor={"none"}
//         isShowArrows={true}
//         scrollRef={myScrollRef}
//         isExpandable={true}
//         titleIcon={<FaChartLine color="#5B2EEA" size={24} />}
//         text={""}
//       />

//       {/* Top cards row */}
//       <Row
//         ref={myScrollRef}
//         className="g-3 mb-4 top-card-row flex-nowrap overflow-auto"
//         style={{
//           scrollbarWidth: "none",
//           msOverflowStyle: "none",
//         }}
//       >
//         {topCards.map((card, idx) => (
//           <TopSellingProductsCards
//             card={card}
//             key={idx}
//             idx={idx}
//           />
//         ))}
//       </Row>

//       {/* Chart and summary */}
//       <Row className="g-3">
//         <Col lg={8} md={7} sm={12}>
//           <Card
//             style={{
//               borderRadius: 12,
//               padding: 18,
//               height: "100%",
//               boxShadow: "0 8px 20px rgba(20,30,60,0.04)",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 marginBottom: 12,
//               }}
//             >
//               <div
//                 style={{
//                   width: 36,
//                   height: 36,
//                   borderRadius: 8,
//                   background: "#EEF2FF",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   marginRight: 12,
//                 }}
//               >
//                 <FaChartLine color="#6C5BFF" />
//               </div>
//               <h5 style={{ margin: 0, fontWeight: 700 }}>
//                 Sales vs Margin Trends
//               </h5>
//             </div>
//             <div
//               style={{
//                 width: isMobile ? "110vw" : "100%",
//                 marginLeft: isMobile ? "-40px" : "0px",
//                 height: 340,
//               }}
//             >
//               <TopSellingProductsGraph chartData={chartData} />
//             </div>
//           </Card>
//         </Col>

//         <Col lg={4} md={5} sm={12}>
//           <TopSellingProductsTable />
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default TopSellingProducts;
