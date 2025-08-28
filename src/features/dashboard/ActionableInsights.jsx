"use client";

import ComponentHeader from "@/components/common/ComponentHeader";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { useOutletActionableInsights } from "@/services/outlet-service";
import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import ActionableCard from "@/components/common/dashboard/card/ActionableCard";

const ActionableInsights = () => {
  const { startDate, endDate } = useDashboardContext();
  const myScrollRef = useRef(null);

  const priorityColors = {
    high: "#FF3B30",
    medium: "#FFCC00",
    low: "#FF9F0A",
  };
  const bgColor = {
    high: "#fef2f2",
    medium: "#fffbeb",
    low: "#e6f1fe",
  };
  const textColor = "black";

  return (
    <Container fluid className="shadow-sm">
      <ComponentHeader
        title={"Actionable Insights"}
        description={"Critical issues requiring immediate attention"}
        titleColor={"rgb(255,79,22)"}
        cardBgColor={"none"}
        isShowArrows={true}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={""}
        text={`5 Active`}
      />
      <ServiceRenderer
        queryHook={useOutletActionableInsights}
        queryArgs={[1, { startdt: startDate, enddt: endDate }]}
        formatter={(data) => data?.list || []} // normalize to array
        shimmerCount={3}
      >
        {(cardsData, refetch) =>
          cardsData &&
          cardsData.length > 0 && (
            <>
              {/* <ComponentHeader
                title={"Actionable Insights"}
                description={"Critical issues requiring immediate attention"}
                titleColor={"rgb(255,79,22)"}
                cardBgColor={"none"}
                isShowArrows={true}
                scrollRef={myScrollRef}
                isExpandable={true}
                titleIcon={""}
                text={`${cardsData.length} Active`}
              /> */}
              <div
                style={{
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                <div
                  ref={myScrollRef}
                  className="d-flex mt-2 gap-2 mb-2"
                  style={{
                    gap: `1rem`,
                    paddingBottom: "0.5rem",
                    overflowX: "auto",
                    msOverflowStyle: "none", // IE, Edge
                    scrollbarWidth: "none", // Firefox
                    WebkitOverflowScrolling: "touch", // iOS smooth scrolling
                  }}
                >
                  {cardsData.map((data, index) => (
                    <ActionableCard
                      scrollRef={myScrollRef}
                      key={index}
                      data={data}
                      priorityColors={priorityColors}
                      bgColor={bgColor}
                      textColor={textColor}
                    />
                  ))}
                </div>
              </div>
            </>
          )
        }
      </ServiceRenderer>
    </Container>
  );
};

export default ActionableInsights;

// "use client";

// import ActionableCard from "@/components/common/card/ActionableCard";
// import ComponentHeader from "@/components/common/ComponentHeader";
// import { useDashboardContext } from "@/contexts/DashboardContext";
// import { useOutletActionableInsights } from "@/services/outlet-service";
// import React, { useRef, useEffect } from "react";
// import { Container } from "react-bootstrap";

// const ActionableInsights = () => {
//     const { startDate ,endDate} = useDashboardContext();
//   // const cardsData = [
//   //   {
//   //     id: "20250804-20250804-2",
//   //     typeId: 1,
//   //     startDate: "2025-08-04",
//   //     endDate: "2025-08-04",
//   //     title: "Overall",
//   //     message:
//   //       "Closing stock is not updated for \u003Cb\u003E1\u003C/b\u003E out of 10 Departments",
//   //     priority: "low",
//   //     url: "https://flavourheaven.in/tools/manage_kitchen_closing_stock.html?startdt=2025-08-04&enddt=2025-08-04",
//   //     seq: 2,
//   //   },
//   //   {
//   //     id: "20250804-20250804-3",
//   //     typeId: 2,
//   //     startDate: "2025-08-04",
//   //     endDate: "2025-08-04",
//   //     title: "Overconsumption of TANDOOR",
//   //     message:
//   //       "Overconsumption: \u003Cb\u003ERs. 1090\u003C/b\u003E; Purchase: \u003Cb\u003ERs. 2340\u003C/b\u003E; Budget Rs. \u003Cb\u003E1250\u003C/b\u003E; COST - 56.17%; NET COST - 45.87%",
//   //     priority: "low",
//   //     url: "https://flavourheaven.in/tools/kitchen_consumption_detail.html?startdt=2025-08-04&enddt=2025-08-04&departments=3",
//   //     seq: 1,
//   //   },
//   //   {
//   //     id: "20250804-20250804-4",
//   //     typeId: 2,
//   //     startDate: "2025-08-04",
//   //     endDate: "2025-08-04",
//   //     title: "Items Overconsumed in TANDOOR",
//   //     message:
//   //       'Over consumption of \u003Ci\u003EWHOLE CHICKEN BIRD ( 800 GRM)\u003C/i\u003E: \u003Cb\u003E2000GM (Rs.418)\u003C/b\u003E"; Purchase Quantity \u003Cb\u003E2000GM\u003C/b\u003E; Sold Items worth of \u003Cb\u003E0GM\u003C/b\u003E',
//   //     priority: "high",
//   //     url: "https://flavourheaven.in/tools/sales_dashboard.html?limit=20&startdt=2025-08-04&enddt=2025-08-04&departments=3&storeitems=24",
//   //     seq: 2,
//   //   },
//   //   {
//   //     id: "20250804-20250804-5",
//   //     typeId: 2,
//   //     startDate: "2025-08-04",
//   //     endDate: "2025-08-04",
//   //     title: "Items Overconsumed in TANDOOR",
//   //     message:
//   //       'Over consumption of \u003Ci\u003ECASHEW NUTS 1/4\u003C/i\u003E: \u003Cb\u003E428GM (Rs.291)\u003C/b\u003E"; Purchase Quantity \u003Cb\u003E520GM\u003C/b\u003E; Sold Items worth of \u003Cb\u003E92GM\u003C/b\u003E',
//   //     priority: "high",
//   //     url: "https://flavourheaven.in/tools/sales_dashboard.html?limit=20&startdt=2025-08-04&enddt=2025-08-04&departments=3&storeitems=91",
//   //     seq: 3,
//   //   },
//   //   {
//   //     id: "20250804-20250804-6",
//   //     typeId: 2,
//   //     startDate: "2025-08-04",
//   //     endDate: "2025-08-04",
//   //     title: "Items Overconsumed in TANDOOR",
//   //     message:
//   //       'Over consumption of \u003Ci\u003EALUMINUIM FOIL\u003C/i\u003E: \u003Cb\u003E1PKT (Rs.290)\u003C/b\u003E"; Purchase Quantity \u003Cb\u003E1PKT\u003C/b\u003E; Sold Items worth of \u003Cb\u003E0PKT\u003C/b\u003E',
//   //     priority: "high",
//   //     url: "https://flavourheaven.in/tools/sales_dashboard.html?limit=20&startdt=2025-08-04&enddt=2025-08-04&departments=3&storeitems=144",
//   //     seq: 4,
//   //   },
//   //   {
//   //     id: "20250804-20250804-7",
//   //     typeId: 2,
//   //     startDate: "2025-08-04",
//   //     endDate: "2025-08-04",
//   //     title: "Overconsumption of BEVERAGES",
//   //     message:
//   //       "Overconsumption: \u003Cb\u003ERs. 2576\u003C/b\u003E; Purchase: \u003Cb\u003ERs. 3561\u003C/b\u003E; Budget Rs. \u003Cb\u003E985\u003C/b\u003E; COST - 289.1%; NET COST - 299.34%",
//   //     priority: "low",
//   //     url: "https://flavourheaven.in/tools/kitchen_consumption_detail.html?startdt=2025-08-04&enddt=2025-08-04&departments=8",
//   //     seq: 5,
//   //   },
//   //   {
//   //     id: "20250804-20250804-8",
//   //     typeId: 2,
//   //     startDate: "2025-08-04",
//   //     endDate: "2025-08-04",
//   //     title: "Items Overconsumed in BEVERAGES",
//   //     message:
//   //       'Over consumption of \u003Ci\u003EGAS\u003C/i\u003E: \u003Cb\u003E1CYLINDER (Rs.1820)\u003C/b\u003E"; Purchase Quantity \u003Cb\u003E1CYLINDER\u003C/b\u003E; Sold Items worth of \u003Cb\u003E0CYLINDER\u003C/b\u003E',
//   //     priority: "high",
//   //     url: "https://flavourheaven.in/tools/sales_dashboard.html?limit=20&startdt=2025-08-04&enddt=2025-08-04&departments=8&storeitems=51",
//   //     seq: 6,
//   //   },
//   //   {
//   //     id: "20250804-20250804-9",
//   //     typeId: 2,
//   //     startDate: "2025-08-04",
//   //     endDate: "2025-08-04",
//   //     title: "Items Overconsumed in BEVERAGES",
//   //     message:
//   //       'Over consumption of \u003Ci\u003ESPRITE 250 ML (1 UNIT)\u003C/i\u003E: \u003Cb\u003E30BOTTLE (Rs.537)\u003C/b\u003E"; Purchase Quantity \u003Cb\u003E30BOTTLE\u003C/b\u003E; Sold Items worth of \u003Cb\u003E0BOTTLE\u003C/b\u003E',
//   //     priority: "high",
//   //     url: "https://flavourheaven.in/tools/sales_dashboard.html?limit=20&startdt=2025-08-04&enddt=2025-08-04&departments=8&storeitems=398",
//   //     seq: 7,
//   //   },
//   //   {
//   //     id: "20250804-20250804-10",
//   //     typeId: 2,
//   //     startDate: "2025-08-04",
//   //     endDate: "2025-08-04",
//   //     title: "Items Overconsumed in BEVERAGES",
//   //     message:
//   //       'Over consumption of \u003Ci\u003ECOCACOLA 250ML (1 UNIT)\u003C/i\u003E: \u003Cb\u003E24BOTTLE (Rs.429)\u003C/b\u003E"; Purchase Quantity \u003Cb\u003E34BOTTLE\u003C/b\u003E; Sold Items worth of \u003Cb\u003E10BOTTLE\u003C/b\u003E',
//   //     priority: "high",
//   //     url: "https://flavourheaven.in/tools/sales_dashboard.html?limit=20&startdt=2025-08-04&enddt=2025-08-04&departments=8&storeitems=407",
//   //     seq: 8,
//   //   },
//   // ];
//   let cardsData = [];

//   const {
//     data,
//     isLoading: isLoading,
//     isError: isError,
//     error: error,
//     refetch: refetch,
//   } = useOutletActionableInsights(1, {
//     startdt: startDate,
//     enddt: endDate,
//   });
//   useEffect(() => {
//     refetch();
//   }, []);
//   if (isLoading && cardsData.length > 0) return <p>Loading users...</p>;
//   if (!isLoading) {
//     cardsData.push(data?.list);
//   }
//   if (isError) return <p>Error: {error.message}</p>;

//   const priorityColors = {
//     high: "#FF3B30",
//     medium: "#FFCC00",
//     low: "#FF9F0A",
//   };
//   const bgColor = {
//     high: "#fef2f2",
//     medium: "#fffbeb",
//     low: "#e6f1fe",
//   };
//   const textColor = "black";
//   const myScrollRef = useRef(null);

//   return (
//     <Container fluid className="shadow-sm">
//       {cardsData && cardsData.length > 0 && (
//         <ComponentHeader
//           title={"Actionable Insights"}
//           description={"Critical issues requiring immediate attention"}
//           titleColor={"rgb(255,79,22)"}
//           cardBgColor={"none"}
//           isShowArrows={true}
//           scrollRef={myScrollRef}
//           isExpandable={true}
//           titleIcon={""}
//           text={"5 Active"}
//         />
//       )}

//       {cardsData && cardsData.length > 0 && (
//         <div
//           style={{
//             overflow: "hidden",
//             width: "100%",
//           }}
//         >
//           <div
//             ref={myScrollRef}
//             className="d-flex mt-2 gap-2 mb-2"
//             style={{
//               gap: `1rem`, // Use the defined gap
//               paddingBottom: "0.5rem",
//               overflowX: "auto",
//               msOverflowStyle: "none", // IE, Edge
//               scrollbarWidth: "none", // Firefox
//               WebkitOverflowScrolling: "touch", // For smooth scrolling on iOS
//             }}
//           >
//             {cardsData.map((data, index) => (
//               <ActionableCard
//                 scrollRef={myScrollRef}
//                 key={index}
//                 data={data}
//                 priorityColors={priorityColors}
//                 bgColor={bgColor}
//                 textColor={textColor}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default ActionableInsights;
