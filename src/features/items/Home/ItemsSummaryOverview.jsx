"use client";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { summeryOverviewDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";
import { useItemSummary } from "@/services/item-service";
import { useItemsContext } from "@/contexts/ItemsContext";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import {
  ItemsSummaryOverviewTopCardsFirstRow,
  ItemsSummaryOverviewTopCardsSecondRow,
} from "@/components/common/items/cards/ItemsSummaryOverviewTopCards";
import ItemsSummaryOverviewSubCards from "@/components/common/items/cards/ItemsSummaryOverviewSubCards";
import { IconChartHistogram } from "@tabler/icons-react";

export default function ItemsSummaryOverview() {
  const { startDate, endDate } = useItemsContext();

  return (
    <ServiceRenderer
      queryHook={useItemSummary}
      queryKey={["itemSummary", { startdt: startDate, enddt: endDate }]}
      queryFn={() =>
        useItemSummary({ startdt: startDate, enddt: endDate }).queryFn
      }
      queryArgs={[74, { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 }]}
      formatter={summeryOverviewDataFormatter}
      shimmerCount={1}
    >
      {(formatted) => (
        <Container fluid className="p-2 card bg-light">
          {/* Header */}
          <Row className="align-items-center mb-4">
            {/* Column 1: Icon */}
            <Col xs="auto">
              <div
                style={{
                  background: 'linear-gradient(135deg, #F86F2D 60%, #F63E1D 100%)',
                  borderRadius: '12px',
                  padding: '8px',
                  display: 'inline-block',
                }}
              >
                <IconChartHistogram stroke={2} color="#fff" size={20} />
              </div>
            </Col>

            {/* Column 2: Title and Subtitle */}
            <Col style={{marginLeft:'-14px'}}>
              <h5 className=" mb-1" style={{fontWeight:700, fontSize:"18px", color:"#232425"}}>{formatted.header.title}</h5>
              {/* <p className="text-muted small mb-0">{formatted.header.subtitle}</p> */}
            </Col>
          </Row>

          {/* Top Cards */}
          <ItemsSummaryOverviewTopCardsFirstRow
            cards={formatted.cards.slice(0, 3)}
          />
          <ItemsSummaryOverviewTopCardsSecondRow
            cards={formatted.cards.slice(3)}
          />

          {/* Footer */}
          <ItemsSummaryOverviewSubCards footer={formatted.footer} />
        </Container>
      )}
    </ServiceRenderer>
  );
} // "use client";

// import React from "react";
// import { Container, Row, Col, Card } from "react-bootstrap";
// import { summeryOverviewDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";
// import { useItemSummary } from "@/services/item-service";
// import { useItemsContext } from "@/contexts/ItemsContext";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";

// export default function ItemsSummaryOverview() {
//   const { startDate, endDate } = useItemsContext();

//   return (
//     <ServiceRenderer
//       queryHook={useItemSummary}
//       queryKey={["itemSummary", { startdt: startDate, enddt: endDate }]}
//       queryFn={() =>
//         useItemSummary({ startdt: startDate, enddt: endDate }).queryFn
//       }
//       queryArgs={[75,{ startdt: startDate, enddt: endDate }]}
//       formatter={summeryOverviewDataFormatter}
//       shimmerCount={1}
//     >
//       {(formatted) => (
//         <Container fluid className="p-2 card bg-light">
//           {/* Header */}
//           <div className="mb-4">
//             <h5 className="fw-bold">{formatted.header.title}</h5>
//             <p className="text-muted small">{formatted.header.subtitle}</p>
//           </div>

//           {/* Top Cards */}
//           <Row className="g-3">
//             {formatted.cards.slice(0, 3).map((card) => (
//               <Col md={4} key={card.id}>
//                 <Card
//                   style={{ backgroundColor: card.bg }}
//                   className="p-3 border-0 shadow-sm h-100"
//                 >
//                   <h6 className="fw-bold d-flex align-items-center">
//                     {card.icon}
//                     {card.title}
//                   </h6>
//                   <div className="mt-2">
//                     {card.rows.map((row, i) => (
//                       <div
//                         key={i}
//                         className="d-flex justify-content-between small mb-1"
//                       >
//                         <span className="text-muted">{row.label}</span>
//                         <span className="fw-semibold">{row.value}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </Card>
//               </Col>
//             ))}
//           </Row>

//           {/* Bottom Cards */}
//           <Row className="g-3 mt-2">
//             {formatted.cards.slice(3).map((card) => (
//               <Col md={4} key={card.id}>
//                 <Card
//                   style={{ backgroundColor: card.bg }}
//                   className="p-3 border-0 shadow-sm h-100"
//                 >
//                   <h6 className="fw-bold d-flex align-items-center">
//                     {card.icon}
//                     {card.title}
//                   </h6>
//                   <div className="mt-2">
//                     {card.rows.map((row, i) => (
//                       <div
//                         key={i}
//                         className="d-flex justify-content-between small mb-1"
//                       >
//                         <span className="text-muted">{row.label}</span>
//                         <span className="fw-semibold">{row.value}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </Card>
//               </Col>
//             ))}
//           </Row>

//           {/* Footer */}
//           <Row className="g-3 mt-3">
//             {formatted.footer.map((foot) => (
//               <Col key={foot.id}>
//                 <Card
//                   className="p-3 border-0 shadow-sm h-100 rounded-4 text-center"
//                   style={{ backgroundColor: foot.bg }}
//                 >
//                   <h6 className="fw-bold d-flex align-items-center justify-content-center mb-1">
//                     {foot.icon} {foot.label}
//                   </h6>
//                   <p className="mb-0 fw-semibold">{foot.value}</p>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </Container>
//       )}
//     </ServiceRenderer>
//   );
// }

// // import React from "react";
// // import { Container, Row, Col, Card } from "react-bootstrap";
// // import { summeryOverviewDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";

// // export default function ItemsSummaryOverview({
// //   apiData = {
// //     id: "75",
// //     item: {
// //       id: "75",
// //       outletId: "1",
// //       name: "HALDI",
// //       unit: "GM",
// //       unitQuantity: "500",
// //       unitPrice: 127,
// //       categoryId: 7,
// //       categoryName: "Indian Grocery",
// //       disabled: false,
// //       alias: "HALDI - 500GM",
// //       moq: 733,
// //       itemTypeId: 1,
// //       itemType: "Store Item",
// //       itemDescription: null,
// //       perishable: false,
// //       shelfLifeDays: 0,
// //       hsnCode: null,
// //       brandName: null,
// //       storageLocation: null,
// //       createdBy: null,
// //       updatedBy: null,
// //     },
// //     summary: {
// //       dt: "2025-08-04",
// //       startDate: "2025-08-04",
// //       endDate: "2025-08-04",
// //       purchaseQuantity: 0,
// //       purchaseValue: 0,
// //       purchaseItemCount: 0,
// //       supplierCount: 0,
// //       consumptionQuantity: 750,
// //       consumptionValue: 202.5,
// //       consumedItemCount: 75,
// //       consumedDepartmentCount: 3,
// //       consumptionOpeningQuantity: 0,
// //       consumptionOpeningValue: 0,
// //       purchaseClosingQuantity: 0,
// //       purchaseClosingValue: 0,
// //       purchaseClosingItemCount: 0,
// //       consumptionClosingQuantity: 0,
// //       consumptionClosingValue: 0,
// //       consumedClosingItemCount: 0,
// //       consumedClosingDepartmentCount: 0,
// //       leftOverStockValue: 812.7,
// //       startingStockValue: 1015.2,
// //       saleQuantity: 224.66,
// //       salePrice: 60.66,
// //       netConsumptionQuantity: 750,
// //       netConsumptionValue: 202.5,
// //       saleToConsumptionQuantityDifference: -525.34,
// //       saleToConsumptionMargin: -141.84,
// //       saleToConsumptionMarginPercentage: -70.04,
// //     },
// //   },
// // }) {
// //   const formatted = summeryOverviewDataFormatter(apiData);

// //   return (
// //     <Container fluid className="p-2 card bg-light">
// //       {/* Header */}
// //       <div className="mb-4">
// //         <h5 className="fw-bold">{formatted.header.title}</h5>
// //         <p className="text-muted small">{formatted.header.subtitle}</p>
// //       </div>

// //       {/* Top Cards */}
// //       <Row className="g-3">
// //         {formatted.cards.slice(0, 3).map((card) => (
// //           <Col md={4} key={card.id}>
// //             <Card
// //               style={{ backgroundColor: card.bg }}
// //               className="p-3 border-0 shadow-sm h-100"
// //             >
// //               <h6 className="fw-bold d-flex align-items-center">
// //                 {card.icon}
// //                 {card.title}
// //               </h6>
// //               <div className="mt-2">
// //                 {card.rows.map((row, i) => (
// //                   <div
// //                     key={i}
// //                     className="d-flex justify-content-between small mb-1"
// //                   >
// //                     <span className="text-muted">{row.label}</span>
// //                     <span className="fw-semibold">{row.value}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //             </Card>
// //           </Col>
// //         ))}
// //       </Row>

// //       {/* Bottom Cards */}
// //       <Row className="g-3 mt-2">
// //         {formatted.cards.slice(3).map((card) => (
// //           <Col md={4} key={card.id}>
// //             <Card
// //               style={{ backgroundColor: card.bg }}
// //               className="p-3 border-0 shadow-sm h-100"
// //             >
// //               <h6 className="fw-bold d-flex align-items-center">
// //                 {card.icon}
// //                 {card.title}
// //               </h6>
// //               <div className="mt-2">
// //                 {card.rows.map((row, i) => (
// //                   <div
// //                     key={i}
// //                     className="d-flex justify-content-between small mb-1"
// //                   >
// //                     <span className="text-muted">{row.label}</span>
// //                     <span className="fw-semibold">{row.value}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //             </Card>
// //           </Col>
// //         ))}
// //       </Row>

// //       {/* Footer */}
// //       <Row className="g-3 mt-3">
// //         {formatted.footer.map((foot) => (
// //           <Col key={foot.id}>
// //             <Card
// //               className="p-3 border-0 shadow-sm h-100 rounded-4 text-center"
// //               style={{ backgroundColor: foot.bg }}
// //             >
// //               <h6 className="fw-bold d-flex align-items-center justify-content-center mb-1">
// //                 {foot.icon} {foot.label}
// //               </h6>
// //               <p className="mb-0 fw-semibold">{foot.value}</p>
// //             </Card>
// //           </Col>
// //         ))}
// //       </Row>
// //     </Container>
// //   );
// // }
