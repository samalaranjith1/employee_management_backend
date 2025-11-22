"use client";

import ComponentHeader from "@/components/common/ComponentHeader";
import SalesForeCastTableBudget from "@/components/common/department/TablesSort/SalesForeCastTableBudget";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useDepartmentContext } from "@/contexts/DepartmentContext";
import { useDepartmentsBudgetDailyList } from "@/services/department-service";
import { departmentSalesForeCastBudgetDataFormatter } from "@/utils/data_formatters/departmentPage";
import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import { FaChartLine } from "react-icons/fa";

export default function DepartmentSalesForecastBudget() {
  const myScrollRef = useRef(null);
  const { startDate, endDate } = useDepartmentContext();

  return (
    <Container fluid className="mt-2" style={{ background: "#fff" }}>
      {/* <ComponentHeader
        title="Sales Forecast Budget"
        description="Daily budget and sales tracking"
        titleColor="rgba(0,0,0,0.85)"
        isShowArrows={true}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={<FaChartLine className="me-2" color="#0066cc" size={24} />}
      /> */}

      <ServiceRenderer
        queryHook={useDepartmentsBudgetDailyList}
        queryKey={["departmentsBudgetDaily"]}
        queryArgs={[
          { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
        ]}
        formatter={departmentSalesForeCastBudgetDataFormatter}
      >
        {(data) => (
          <div ref={myScrollRef} className="mt-3">
            {/* Uncomment below for scrollable top cards if needed */}
            {/* <div className="d-flex mb-3" style={{ overflowX: 'auto', gap: 16 }}>
              {data.topCardsData.map((card, i) => (
                <SalesForeCastCards key={i} {...card} />
              ))}
            </div> */}
            <SalesForeCastTableBudget tableData={data.tableData} />
          </div>
        )}
      </ServiceRenderer>
    </Container>
  );
}
// "use client";

// import ComponentHeader from "@/components/common/ComponentHeader";
// import SalesForeCastCards from "@/components/common/department/cards/SalesForeCastCards";
// import SalesForeCastTableBudget from "@/components/common/department/TablesSort/SalesForeCastTableBudget";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
// import { useDepartmentContext } from "@/contexts/DepartmentContext";
// import { useDepartmentsBudgetDailyList } from "@/services/department-service";
// import { departmentSalesForeCastBudgetDataFormatter } from "@/utils/data_formatters/departmentPage";
// import React, { useRef } from "react";
// import { Container } from "react-bootstrap";
// import { FaChartLine } from "react-icons/fa";

// export default function DepartmentSalesForecastBudget() {
//   const myScrollRef = useRef(null);
//   const { startDate, endDate } = useDepartmentContext();
//   return (
//     <Container fluid className="mt-2" style={{ background: "#fff" }}>
//       {/* <ComponentHeader
//         title={"Sales Forecast Budget"}
//         description={"Daily budget and sales tracking"}
//         titleColor={"fw-bold text-primary fs-4"}
//         isShowArrows={true}
//         scrollRef={myScrollRef}
//         isExpandable={true}
//         titleIcon={<FaChartLine className="me-2" color="blue" size={24} />}
//       /> */}

//       <ServiceRenderer
//         queryHook={useDepartmentsBudgetDailyList}
//         queryKey={["departmentsBudgetDaily"]}
//         queryArgs={[
//           // { startdt: "2025-06-06", enddt: "2025-08-27", outlet: 1, userId: 7 },
//           { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
//         ]}
//         formatter={departmentSalesForeCastBudgetDataFormatter}
//       >
//         {(data) => (
//           <>
//             {/* Horizontal scrollable top cards
//             <div
//               ref={myScrollRef}
//               className="d-flex mb-3"
//               style={{
//                 gap: "16px",
//                 paddingBottom: "0.5rem",
//                 overflowX: "auto",
//                 msOverflowStyle: "none",
//                 scrollbarWidth: "none",
//                 WebkitOverflowScrolling: "touch",
//               }}
//             >
//               {data.topCardsData.map((card, i) => (
//                 <SalesForeCastCards key={i} {...card} />
//               ))}
//             </div> */}

//             <div>
//               <SalesForeCastTableBudget tableData={data.tableData} />
//             </div>
//           </>
//         )}
//       </ServiceRenderer>
//     </Container>
//   );
// }
