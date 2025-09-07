"use client";

import React, { useRef } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RecipesCards from "@/components/common/dashboard/card/RecipesCards";
import RecipesTable from "@/components/common/dashboard/TablesSort/RecipesTable";
import ComponentHeader from "@/components/common/ComponentHeader";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useProductsRecipesSummary } from "@/services/product-service";
import { recipesDataFormatter } from "@/utils/data_formatters/dashboardFormatter";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { FaChartLine, FaExclamationTriangle } from "react-icons/fa";

const RecipesDashboard = () => {
  const myScrollRef = useRef(null);
  const { startDate, endDate } = useDashboardContext();

  return (
    <Container fluid className="mt-0 p-2">
      <ComponentHeader
        title={"Recipes"}
        description={
          "Analyze product profitability and optimize menu offerings"
        }
        titleColor={"rgba(22, 20, 20, 1)"}
        cardBgColor={"none"}
        isShowArrows={true}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={""}
        text={""}
      />

      <ServiceRenderer
        queryHook={useProductsRecipesSummary}
        queryKey={[
          "productsRecipesSummary",
          1,
          { startdt: startDate, enddt: endDate },
        ]}
        queryFn={() =>
          useProductsRecipesSummary(1, { startdt: startDate, enddt: endDate })
            .queryFn
        }
        queryArgs={[
          { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
        ]}
        formatter={recipesDataFormatter}
        shimmerCount={3}
      >
        {(recipesData, refetch) => (
          <div
            className="m-0 p-3"
            style={{
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            {/* ✅ Top Cards with same style as ConsumptionSummary */}
            <div
              ref={myScrollRef}
              className="d-flex"
              style={{
                gap: "16px",
                paddingBottom: "0.5rem",
                overflowX: "auto",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {recipesData?.topCards?.map((card, idx) => (
                <RecipesCards
                  card={card}
                  idx={idx}
                  key={idx}
                  widthDesktop={"30vw"}
                />
              ))}
            </div>
            <Row className="mt-4">
              {/* Loss Making Products Section */}
              <Col md={6} className="mb-4">
                <div className="card-header border-0 pb-2 p-1 d-flex justify-content-between align-items-center" style={{backgroundColor:"rgb(240,240,240"}}>
                  <div>
                    <h6 className="card-title mb-0">Loss Making Products</h6>
                    <p className="card-text text-muted mb-0">
                      Monitor inventory levels and prevent stockouts
                    </p>
                  </div>
                  <div>
                    <FaExclamationTriangle color="#FF6347" size={24} />
                  </div>
                </div>
                <RecipesTable
                  data={recipesData?.lossProducts || []}
                  bgColor={"#FFF5F5"}
                />
              </Col>

              {/* Profitable Products Section */}
              <Col md={6} className="mb-4">
                <div className="card-header border-0 pb-2 p-1 d-flex justify-content-between align-items-center" style={{backgroundColor:"rgb(240,240,240"}}>
                  <div>
                    <h6 className="card-title mb-0">Profitable Products</h6>
                    <p className="card-text text-muted mb-0">
                      Monitor inventory levels and prevent stockouts
                    </p>
                  </div>
                  <div>
                    <FaChartLine color="#32CD32" size={24} />
                  </div>
                </div>
                <RecipesTable
                  data={recipesData?.profitProducts || []}
                  bgColor={"#F0FFF4"}
                />
              </Col>
            </Row>
          </div>
        )}
      </ServiceRenderer>
    </Container>
  );
};

export default RecipesDashboard;

// "use client";

// import React, { useRef } from "react";
// import { Row, Col, Container } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import RecipesCards from "@/components/common/card/RecipesCards";
// import RecipesTable from "@/components/common/TablesSort/RecipesTable";
// import ComponentHeader from "@/components/common/ComponentHeader";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
// import { useProductsRecipesSummary } from "@/services/product-service";
// import { recipesDataFormatter } from "@/utils/data_formatters/dashboardFormatter";
// import { useDashboardContext } from "@/contexts/DashboardContext";

// const RecipesDashboard = () => {
//   const myScrollRef = useRef(null);
//   const { startDate, endDate } = useDashboardContext();

//   return (
//     <Container fluid className="mt-0 p-2">
//       <ComponentHeader
//         title={"Recipes"}
//         description={
//           "Analyze product profitability and optimize menu offerings"
//         }
//         titleColor={"rgb(255,79,22)"}
//         cardBgColor={"none"}
//         isShowArrows={true}
//         scrollRef={myScrollRef}
//         isExpandable={true}
//         titleIcon={""}
//         text={""}
//       />

//       <ServiceRenderer
//         queryHook={useProductsRecipesSummary}
//         queryKey={[
//           "productsRecipesSummary",
//           1,
//           { startdt: startDate, enddt: endDate },
//         ]}
//         queryFn={() =>
//           useProductsRecipesSummary(1, { startdt: startDate, enddt: endDate })
//             .queryFn
//         }
//         queryArgs={[{ startdt: startDate, enddt: endDate ,outlet:1,userId:7}]}
//         formatter={recipesDataFormatter}
//         shimmerCount={3}
//       >
//         {(recipesData, refetch) => (
//           <div
//             ref={myScrollRef}
//             className="m-0 p-3"
//             style={{
//               border: "none",
//               borderRadius: "12px",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//             }}
//           >
//             <div className="top-cards-container">
//               {recipesData?.topCards?.map((card, idx) => (
//                 <RecipesCards card={card} idx={idx} key={idx} />
//               ))}
//             </div>

//             <Row className="mt-4">
//               <Col md={6} className="mb-4">
//                 <RecipesTable
//                   title={"Loss Making Products"}
//                   data={recipesData?.lossProducts || []}
//                   bgColor={"#FFF5F5"}
//                 />
//               </Col>
//               <Col md={6} className="mb-4">
//                 <RecipesTable
//                   title={"Profitable Products"}
//                   data={recipesData?.profitProducts || []}
//                   bgColor={"#F0FFF4"}
//                 />
//               </Col>
//             </Row>
//           </div>
//         )}
//       </ServiceRenderer>

//       <style>{`
//         .top-cards-container {
//           display: flex;
//           gap: 1rem;
//           overflow-x: auto;
//           padding-bottom: 0.5rem;
//           -webkit-overflow-scrolling: touch;
//         }
//         .top-card-wrapper {
//           flex: 0 0 auto;
//         }
//         @media (max-width: 768px) {
//           .top-card-wrapper {
//             width: 85vw;
//           }
//         }
//         @media (min-width: 769px) {
//           .top-cards-container {
//             flex-wrap: wrap;
//             overflow-x: visible;
//           }
//           .top-card-wrapper {
//             flex: 1 1 calc(33.333% - 1rem);
//           }
//         }
//       `}</style>
//     </Container>
//   );
// };

// export default RecipesDashboard;

// "use client";

// import React, { useRef } from "react";
// import { Card, Row, Col, Container } from "react-bootstrap";
// import {
//   FaArrowUp,
//   FaMinus,
//   FaArrowDown,
//   FaExpand,
//   FaBolt,
// } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";
// import RecipesCards from "@/components/common/card/RecipesCards";
// import RecipesTable from "@/components/common/TablesSort/RecipesTable";
// import ComponentHeader from "@/components/common/ComponentHeader";

// const RecipesDashboard = () => {
//   const topCards = [
//     {
//       title: "Profitable Products",
//       products: 36,
//       sales: "10,000",
//       share: "11.8%",
//       label: "High Margin",
//       icon: <FaArrowUp />,
//       bg: "#E6F8EE",
//       labelColor: "#28A745",
//       textColor: "#1E4620",
//     },
//     {
//       title: "Moderate Products",
//       products: 30,
//       sales: "40,000",
//       share: "47.1%",
//       label: "Medium Margin",
//       icon: <FaMinus />,
//       bg: "#FFF8E1",
//       labelColor: "#F4B400",
//       textColor: "#4E3B00",
//     },
//     {
//       title: "Loss Making Products",
//       products: 12,
//       sales: "35,000",
//       share: "41.2%",
//       label: "Low Margin",
//       icon: <FaArrowDown />,
//       bg: "#FFE6E6",
//       labelColor: "#D32F2F",
//       textColor: "#5C0000",
//     },
//   ];

//   const lossProducts = [
//     {
//       product: "Mutton Rogan Josh",
//       subtitle: "Non-Veg Curry • ₹750",
//       items: 280,
//       stock: "In Stock",
//       cost: "₹163,800",
//       sales: "₹210,000",
//       costPct: "78.0%",
//       costPctColor: "#F87171",
//     },
//     {
//       product: "Fish Curry (Pomfret)",
//       subtitle: "Seafood • ₹680",
//       items: 195,
//       stock: "Low Stock",
//       cost: "₹96,525",
//       sales: "₹132,600",
//       costPct: "72.8%",
//       costPctColor: "#F87171",
//     },
//     {
//       product: "Mutton Rogan Josh",
//       subtitle: "Non-Veg Curry • ₹750",
//       items: 280,
//       stock: "In Stock",
//       cost: "₹163,800",
//       sales: "₹210,000",
//       costPct: "78.0%",
//       costPctColor: "#F87171",
//     },
//     {
//       product: "Fish Curry (Pomfret)",
//       subtitle: "Seafood • ₹680",
//       items: 195,
//       stock: "Low Stock",
//       cost: "₹96,525",
//       sales: "₹132,600",
//       costPct: "72.8%",
//       costPctColor: "#F87171",
//     },
//     {
//       product: "Mutton Rogan Josh",
//       subtitle: "Non-Veg Curry • ₹750",
//       items: 280,
//       stock: "In Stock",
//       cost: "₹163,800",
//       sales: "₹210,000",
//       costPct: "78.0%",
//       costPctColor: "#F87171",
//     },
//     {
//       product: "Fish Curry (Pomfret)",
//       subtitle: "Seafood • ₹680",
//       items: 195,
//       stock: "Low Stock",
//       cost: "₹96,525",
//       sales: "₹132,600",
//       costPct: "72.8%",
//       costPctColor: "#F87171",
//     },
//   ];

//   const profitProducts = [
//     {
//       product: "Butter Chicken",
//       subtitle: "Non-Veg Curry • ₹450",
//       items: 2850,
//       stock: "In Stock",
//       cost: "₹413,250",
//       sales: "₹1,282,500",
//       costPct: "32.2%",
//       costPctColor: "#4ADE80",
//     },
//     {
//       product: "Dal Makhani",
//       subtitle: "Veg Curry • ₹320",
//       items: 2420,
//       stock: "In Stock",
//       cost: "₹229,900",
//       sales: "₹774,400",
//       costPct: "29.7%",
//       costPctColor: "#4ADE80",
//     },
//   ];

//   const myScrollRef= useRef(null)
//   return (
//     <Container fluid className="mt-0  p-2">
//       <ComponentHeader
//         title={"Recipes"}
//         description={
//           "Analyze product profitability and optimize menu offerings"
//         }
//         titleColor={"rgb(255,79,22)"}
//         cardBgColor={"none"}
//         isShowArrows={true}
//         scrollRef={myScrollRef}
//         isExpandable={true}
//         titleIcon={""}
//         text={""}
//       />

//       <div
//         ref={myScrollRef}
//         className="m-0 p-3"
//         style={{
//           border: "none",
//           borderRadius: "12px",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//         }}
//       >
//         <div className="top-cards-container">
//           {topCards.map((card, idx) => (
//             <RecipesCards card={card} idx={idx} key={idx} />
//           ))}
//         </div>

//         <Row className="mt-4">
//           <Col md={6} className="mb-4">
//             <RecipesTable
//               title={"Loss Making Products"}
//               data={lossProducts}
//               bgColor={"#FFF5F5"}
//             />
//           </Col>
//           <Col md={6} className="mb-4">
//             <RecipesTable
//               title={"Profitable Products"}
//               data={profitProducts}
//               bgColor={"#F0FFF4"}
//             />
//           </Col>
//         </Row>
//       </div>

//       <style>{`
//         .top-cards-container {
//           display: flex;
//           gap: 1rem;
//           overflow-x: auto;
//           padding-bottom: 0.5rem;
//           -webkit-overflow-scrolling: touch;
//         }
//         .top-card-wrapper {
//           flex: 0 0 auto;
//         }
//         @media (max-width: 768px) {
//           .top-card-wrapper {
//             width: 85vw;
//           }
//         }
//         @media (min-width: 769px) {
//           .top-cards-container {
//             flex-wrap: wrap;
//             overflow-x: visible;
//           }
//           .top-card-wrapper {
//             flex: 1 1 calc(33.333% - 1rem);
//           }
//         }
//       `}</style>
//     </Container>
//   );
// };

// export default RecipesDashboard;
