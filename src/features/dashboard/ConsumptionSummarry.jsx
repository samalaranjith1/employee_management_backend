"use client";
import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ConsumptionCard from "@/components/common/dashboard/card/ConsumptionCard";
import ComponentHeader from "@/components/common/ComponentHeader";
import { useOutletSummary } from "@/services/outlet-service";
import { consumptionSummaryFormatter } from "@/utils/data_formatters/dashboardFormatter";
import { useDashboardContext } from "@/contexts/DashboardContext";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { handleNavigation } from "@/utils";
import { useRouter } from "next/navigation";
import { IconChartHistogram } from '@tabler/icons-react';

export default function ConsumptionSummarry() {
  const { startDate, endDate, dashboardFilter } = useDashboardContext();
  const myScrollRef = useRef(null);
  const router = useRouter();

  return (
    <Container fluid>
      <ComponentHeader
        title={"Consumption Summary"}
        description={"Real-time consumption metrics and performance indicators"}
        titleColor={"#535454"}
        cardBgColor={"none"}
        isShowArrows={true}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={<div style={{
          background: 'linear-gradient(90deg, #FF5D00 0%, #E7483B 100%)',
          borderRadius: '12px',
          padding: '8px',
          display: 'inline-block'
        }}>
          <IconChartHistogram stroke={2} color="#fff" size={24} />
        </div>}
        style={{ cursor: "pointer" }}
        handleExpandClick={() =>
          handleNavigation({
            router,
            url: "consumption_analytics",
            params: { startDate: startDate, endDate: endDate },
          })
        }
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
              gap: `4px`,
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

// import React, { useRef } from "react";
// import { Container } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import ConsumptionCard from "@/components/common/dashboard/card/ConsumptionCard";
// import ComponentHeader from "@/components/common/ComponentHeader";
// import { useOutletSummary } from "@/services/outlet-service";
// import { consumptionSummaryFormatter } from "@/utils/data_formatters/dashboardFormatter";
// import { useDashboardContext } from "@/contexts/DashboardContext";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
// import { handleNavigation } from "@/utils";
// import { useRouter } from "next/navigation";

// export default function ConsumptionSummarry() {
//   const { startDate, endDate,dashboardFilter } = useDashboardContext();
//   const myScrollRef = useRef(null);
//     const router = useRouter();

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
//         style={{ cursor: "pointer" }}
//         handleExpandClick={() =>
//           handleNavigation({
//             router,
//             url: "consumption_analytics",
//             params: { startDate: startDate, endDate: endDate },
//           })
//         }
//       />

//       {/* ✅ ServiceRenderer takes care of loading, error, retry, no data */}
//       <ServiceRenderer
//         queryHook={useOutletSummary}
//         queryKey={["outletSummary", 1, { startdt: startDate, enddt: endDate }]}
//         queryFn={() =>
//           useOutletSummary(1, { startdt: startDate, enddt: endDate }).queryFn
//         }
//         queryArgs={[1, { startdt: startDate, enddt: endDate }]}
//         formatter={consumptionSummaryFormatter}
//         shimmerCount={3}
//       >
//         {(cardsData, refetch) => (
//           <div
//             ref={myScrollRef}
//             className="d-flex"
//             style={{
//               gap: `16px`,
//               paddingBottom: "0.5rem",
//               overflowX: "auto",
//               msOverflowStyle: "none",
//               scrollbarWidth: "none",
//               WebkitOverflowScrolling: "touch",
//             }}
//           >
//             {cardsData?.map((card, idx) => (
//               <ConsumptionCard key={idx} {...card} />
//             ))}
//           </div>
//         )}
//       </ServiceRenderer>
//     </Container>
//   );
// }
