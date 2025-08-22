"use client";

import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ConsumptionCard from "@/components/common/card/ConsumptionCard";
import ComponentHeader from "@/components/common/ComponentHeader";
import { useOutletSummary } from "@/services/outlet-service";
import { consumptionSummaryFormatter } from "@/utils/data_formatters/dashboardFormatter";
import { useDashboardContext } from "@/contexts/DashboardContext";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";

export default function ConsumptionSummarry() {
  const { startDate, endDate } = useDashboardContext();
  const myScrollRef = useRef(null);

  return (
    <Container fluid>
      <ComponentHeader
        title={"Consumption Summary"}
        description={"Real-time consumption metrics and performance indicators"}
        titleColor={"rgb(255,92,0)"}
        cardBgColor={"none"}
        isShowArrows={true}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={""}
      />

      {/* ✅ ServiceRenderer takes care of loading, error, retry, no data */}
      <ServiceRenderer
        queryHook={useOutletSummary}
        queryKey={["outletSummary", 1, { startdt: startDate, enddt: endDate }]}
        queryFn={() =>
          useOutletSummary(1, { startdt: startDate, enddt: endDate }).queryFn
        }
        queryArgs={[1, { startdt: startDate, enddt: endDate }]}
        formatter={consumptionSummaryFormatter}
        shimmerCount={3}
      >
        {(cardsData, refetch) => (
          <div
            ref={myScrollRef}
            className="d-flex"
            style={{
              gap: `16px`,
              paddingBottom: "0.5rem",
              overflowX: "auto",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {cardsData?.map((card, idx) => (
              <ConsumptionCard key={idx} {...card} />
            ))}
          </div>
        )}
      </ServiceRenderer>
    </Container>
  );
}

// "use client";

// import React, { useRef, useEffect } from "react";
// import { Container } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import ConsumptionCard from "@/components/common/card/ConsumptionCard";
// import ComponentHeader from "@/components/common/ComponentHeader";
// import { useOutletSummary } from "@/services/outlet-service";
// import { consumptionSummaryFormatter } from "@/utils/data_formatters/dashboardFormatter";
// import { useDashboardContext } from "@/contexts/DashboardContext";

// export default function ConsumptionSummarry() {
//   const { startDate ,endDate} = useDashboardContext();
//   const myScrollRef = useRef(null);
//   let cardsData=[]

//   // const cardsData = [
//   //   {
//   //     title: "CONSUMPTION %",
//   //     percentage: "41%",
//   //     percentageChange: "+2.1%",
//   //     icon: <FaUtensils size={36} color="#bc4b00" />,
//   //     textColor: "#bc4b00",
//   //     bgColor: "rgb(255,247,237)",
//   //     rows: [
//   //       { label: "Sale", value: "₹75,000" },
//   //       { label: "Consumption", value: "₹25,000" },
//   //       {
//   //         label: "Net Consumption",
//   //         value: "₹20,000 (35%)",
//   //         // highlightBg: "#ffdcc0",
//   //       },
//   //     ],
//   //   },
//   //   {
//   //     title: "CONSUMPTION",
//   //     percentage: "₹25,000",
//   //     percentageChange: "-1.5%",
//   //     icon: <FaChartLine size={36} color="#1d40af" />,
//   //     textColor: "#1d40af",
//   //     bgColor: "rgb(238,245,255)",
//   //     rows: [
//   //       { label: "Opening Stock", value: "₹15,000" },
//   //       { label: "Closing Stock", value: "₹5,000" },
//   //       {
//   //         label: "Net Consumption",
//   //         value: "₹20,000",
//   //         // highlightBg: "#bbd0ff",
//   //       },
//   //     ],
//   //   },
//   //   {
//   //     title: "NET SALES",
//   //     percentage: "₹75,000",
//   //     percentageChange: "+8.3%",
//   //     icon: <FaCoffee size={36} color="#5b21b6" />,
//   //     textColor: "#5b21b6",
//   //     bgColor: "rgb(250,245,255)",
//   //     rows: [
//   //       { label: "Total Sales", value: "₹85,000" },
//   //       { label: "Discount", value: "₹10,000" },
//   //       { label: "Tax", value: "₹4,000" },
//   //       {
//   //         label: "Dine in",
//   //         value: "₹65,000",
//   //         // highlightBg: "#e9d5ff"
//   //       },
//   //       { label: "Online", value: "₹10,000" },
//   //     ],
//   //   },
//   // ];

//   //service calls
// const {
//   data,
//   isLoading: isLoading,
//   isError: isError,
//   error: error,
//   refetch: refetch,
// } = useOutletSummary(1, {
//   startdt: startDate,
//   enddt: endDate,
// });
// useEffect(()=>{
//   refetch();
// },[])
//   if (isLoading && cardsData.length>0) return (
//     <p>
//       Loading users...
//     </p>
//   );
//   if(!isLoading){
// cardsData.push(consumptionSummaryFormatter(data));
//   }

//   if (isError) return <p>Error: {error.message}</p>;

//   return (
//     <Container fluid>
//       <ComponentHeader
//         title={"Consumption Summary"}
//         description={"Real-time consumption metrics and performance indicators"}
//         titleColor={"rgb(255,92,0)"}
//         cardBgColor={"none"}
//         isShowArrows={true}
//         scrollRef={myScrollRef}
//         isExpandable={true}
//         titleIcon={""}
//       />
//       <div
//         ref={myScrollRef}
//         className="d-flex"
//         style={{
//           gap: `16px`,
//           paddingBottom: "0.5rem",
//           overflowX: "auto",
//           msOverflowStyle: "none",
//           scrollbarWidth: "none",
//           WebkitOverflowScrolling: "touch",
//         }}
//       >
//         {cardsData[0]?.map((card, idx) => (
//           <ConsumptionCard key={idx} {...card} />
//         ))}
//       </div>
//     </Container>
//   );
// }
