"use client";

import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import ComponentHeader from "@/components/common/ComponentHeader";
import ConsumptionForecastTable from "@/components/common/department/TablesSort/ConsumptionForecastTable";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useDepartmentContext } from "@/contexts/DepartmentContext";
import { useProductsSalesForecastList } from "@/services/product-service";
import { departmentConsumptionForecastDataFormatter } from "@/utils/data_formatters/departmentPage";

export default function DepartmentConsumptionForeCast() {
  const myScrollRef = useRef(null);
  const { startDate, endDate } = useDepartmentContext();

  return (
    <Container fluid className="mt-2" style={{ background: "#fff" }}>
      {/* Optional Header */}
      {/* <ComponentHeader
        title={"Consumption Forecast"}
        description={"Daily consumption forecast by item"}
        titleColor={"fw-bold text-primary fs-4"}
        isShowArrows={true}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={<FaUtensils className="me-2" color="blue" size={24} />}
      /> */}

      <ServiceRenderer
        queryHook={useProductsSalesForecastList}
        queryKey={["consumptionForecast"]}
        queryArgs={[
          { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
        ]}
        formatter={departmentConsumptionForecastDataFormatter}
      >
        {(data) => (
          <div>
            <ConsumptionForecastTable tableData={data.tableData} />
          </div>
        )}
      </ServiceRenderer>
    </Container>
  );
}

// "use client";

// import { departmentConsumptionForecastDataFormatter } from "@/utils/data_formatters/departmentPage";
// import React from "react";
// import { Table, Container } from "react-bootstrap";
// import { FaUtensils } from "react-icons/fa";

// const DepartmentConsumptionForeCast = ({ apiResponse }) => {
//   const { tableData } = departmentConsumptionForecastDataFormatter(apiResponse);

//   return (
//     <Container className="mt-4 p-0">
//       {/* Table */}
//       <Table hover responsive className="bg-white rounded shadow-sm">
//         <thead className="bg-light">
//           <tr>
//             <th>DAY</th>
//             <th>ITEM</th>
//             <th>TOTAL QUANTITY</th>
//             <th>TOTAL PRICE</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tableData.map((row, index) => (
//             <tr key={index}>
//               <td>{row.day}</td>
//               <td>
//                 <div className="d-flex flex-column">
//                   <span>{row.name}</span>
//                   <small className="text-muted">
//                     {row.category} • {row.unitQuantity} {row.unit} • ₹
//                     {row.unitPrice}
//                   </small>
//                 </div>
//               </td>
//               <td>
//                 <strong>
//                   {row.quantity} {row.unit.toLowerCase()}
//                 </strong>
//               </td>
//               <td>
//                 <strong>₹{row.totalPrice.toFixed(0)}</strong>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default DepartmentConsumptionForeCast;
