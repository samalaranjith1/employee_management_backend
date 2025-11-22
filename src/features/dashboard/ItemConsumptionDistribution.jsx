"use client";

import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import { FaClock } from "react-icons/fa";

import ItemConsumptionDistributionCard from "@/components/common/dashboard/card/ItemConsumptionDistributionCard";
import ComponentHeader from "@/components/common/ComponentHeader";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { consumptionDistributionDataFormatter } from "@/utils/data_formatters/dashboardFormatter";
import { useItemsConsumptionDistribution } from "@/services/item-service";

import ItemConsumptionDistributionTable from "@/components/common/dashboard/TablesSort/ItemConsumptionDistributionTable";
import { IconTarget } from "@tabler/icons-react";

export default function ItemConsumptionDistribution() {
  const { startDate, endDate } = useDashboardContext();
  const myScrollRef = useRef(null);

  return (
    <Container fluid className="p-2 pt-1">
      {/* Header */}
      <ComponentHeader
        title={"Item Consumption Distribution"}
        description={"Sales vs Consumption with cost efficiency tracking"}
        titleColor={"#000"}
        cardBgColor={"none"}
        isShowArrows={true}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={<div style={{
          background: '#fd4621',
          borderRadius: '12px',
          padding: '8px',
          display: 'inline-block'
        }}>
          <IconTarget stroke={2} color="#fff" size={20} />
        </div>}
        text={""}
      />

      {/* ✅ ServiceRenderer handles loading/error/data */}
      <ServiceRenderer
        queryHook={useItemsConsumptionDistribution}
        queryKey={[
          "itemsConsumptionDistribution",
          1,
          { startdt: startDate, enddt: endDate },
        ]}
        queryFn={() =>
          useItemsConsumptionDistribution(1, {
            startdt: startDate,
            enddt: endDate,
          }).queryFn
        }
        queryArgs={[
          { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
        ]}
        formatter={consumptionDistributionDataFormatter}
        shimmerCount={3}
      >
        {({ summaryCards, tableData }) => (
          <>
            {/* Cards */}
            <ItemConsumptionDistributionCard
              summary={summaryCards}
              scrollRef={myScrollRef}
            />

            {/* Table */}
            <ItemConsumptionDistributionTable
              data={tableData} />
          </>
        )}
      </ServiceRenderer>
    </Container>
  );
}

// "use client";
// import ItemConsumptionDistributionCard from "@/components/common/card/ItemConsumptionDistributionCard";
// import ComponentHeader from "@/components/common/ComponentHeader";
// import ItemConsumptionDistributionTable from "@/components/common/TablesSort/ItemConsumptionDistributionTable";
// import ProductPerformanceTable from "@/components/common/TablesSort/ProductPerformanceTable";
// import React, { useRef, useState, useEffect } from "react";
// import { Container, Card, Table, Badge } from "react-bootstrap";
// import {
//   FaClock,
// } from "react-icons/fa";

// export default function ItemConsumptionDistribution() {
//   const summary = [
//     { label: "Total Items", value: 124, amount: "₹90,417", color: "#E8F0FF" },
//     {
//       label: "High Consumption",
//       value: 26,
//       amount: "₹62,498",
//       color: "#E8F8F0",
//     },
//     {
//       label: "Medium Consumption",
//       value: 32,
//       amount: "₹18,317",
//       color: "#FFF8E1",
//     },
//     { label: "Low Consumption", value: 66, amount: "₹9,601", color: "#FFEAEA" },
//     { label: "Extra Category", value: 10, amount: "₹4,210", color: "#E8F0FF" },
//   ];

//   const data = [
//     {
//       percentile: "80 Percentile",
//       items: 2,
//       percentItems: "1.6%",
//       value: 16366.02,
//       percentValue: "18.1%",
//       classification: "High Consumption",
//       color: "red",
//     },
//     {
//       percentile: "80 Percentile",
//       items: 2,
//       percentItems: "1.6%",
//       value: 16366.02,
//       percentValue: "18.1%",
//       classification: "High Consumption",
//       color: "red",
//     },
//     {
//       percentile: "80 Percentile",
//       items: 2,
//       percentItems: "1.6%",
//       value: 16366.02,
//       percentValue: "18.1%",
//       classification: "High Consumption",
//       color: "red",
//     },
//     {
//       percentile: "80 Percentile",
//       items: 2,
//       percentItems: "1.6%",
//       value: 16366.02,
//       percentValue: "18.1%",
//       classification: "High Consumption",
//       color: "red",
//     },
//     {
//       percentile: "80 Percentile",
//       items: 2,
//       percentItems: "1.6%",
//       value: 16366.02,
//       percentValue: "18.1%",
//       classification: "High Consumption",
//       color: "red",
//     },
//     {
//       percentile: "70 Percentile",
//       items: 2,
//       percentItems: "1.6%",
//       value: 8730,
//       percentValue: "9.7%",
//       classification: "High Consumption",
//       color: "red",
//     },
//     {
//       percentile: "60 Percentile",
//       items: 3,
//       percentItems: "2.4%",
//       value: 9511.07,
//       percentValue: "10.5%",
//       classification: "High Consumption",
//       color: "red",
//     },
//     {
//       percentile: "50 Percentile",
//       items: 5,
//       percentItems: "4.0%",
//       value: 9858.7,
//       percentValue: "10.9%",
//       classification: "High Consumption",
//       color: "red",
//     },
//     {
//       percentile: "40 Percentile",
//       items: 6,
//       percentItems: "4.8%",
//       value: 8557.15,
//       percentValue: "9.5%",
//       classification: "High Consumption",
//       color: "red",
//     },
//     {
//       percentile: "30 Percentile",
//       items: 8,
//       percentItems: "6.5%",
//       value: 9475.4,
//       percentValue: "10.5%",
//       classification: "High Consumption",
//       color: "red",
//     },
//     {
//       percentile: "20 Percentile",
//       items: 12,
//       percentItems: "9.7%",
//       value: 9627.65,
//       percentValue: "10.7%",
//       classification: "Medium Consumption",
//       color: "orange",
//     },
//     {
//       percentile: "10 Percentile",
//       items: 20,
//       percentItems: "16.1%",
//       value: 8689.7,
//       percentValue: "9.6%",
//       classification: "Medium Consumption",
//       color: "orange",
//     },
//     {
//       percentile: "Below 10 Percentile",
//       items: 66,
//       percentItems: "53.2%",
//       value: 9601.25,
//       percentValue: "10.6%",
//       classification: "Low Consumption",
//       color: "green",
//     },
//   ];

//   const getBadgeVariant = (classification) => {
//     if (classification === "High Consumption")
//       return { bg: "#FFEAEA", color: "#E53935" };
//     if (classification === "Medium Consumption")
//       return { bg: "#FFF8E1", color: "#FBC02D" };
//     if (classification === "Low Consumption")
//       return { bg: "#E8F8F0", color: "#43A047" };
//     return { bg: "#EEE", color: "#000" };
//   };
// const myScrollRef = useRef(null);
//   return (
//     <Container fluid className="p-2 pt-1">
//       {/* Header */}
//       <ComponentHeader
//         title={"Item Consumption Distribution"}
//         description={"Sales vs Consumption with cost efficiency tracking"}
//         titleColor={"rgb(255,79,22)"}
//         cardBgColor={"none"}
//         isShowArrows={true}
//         scrollRef={myScrollRef}
//         isExpandable={true}
//         titleIcon={<FaClock color="rgb(255,79,22)" size={24} />}
//         text={""}
//       />

//       {/* Cards */}
//       <ItemConsumptionDistributionCard
//         summary={summary}
//         scrollRef={myScrollRef}
//       />

//       {/* Table */}
//       <ProductPerformanceTable data={data} />
//     </Container>
//   );
// }
