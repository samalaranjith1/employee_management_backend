"use client";

import ComponentHeader from "@/components/common/ComponentHeader";
import React, { useRef } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaTruck, FaCalendarAlt, FaShoppingCart } from "react-icons/fa";
import PurchaseDistributionGraph from "@/components/common/dashboard/GraphWrapper/PurchaseDistributionGraph";
import SupplierDetailsTable from "@/components/common/dashboard/TablesSort/SupplierDetailsTable";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { useSuppliersUsage } from "@/services/supplier-service";
import { supplierManagementDataFormatter } from "@/utils/data_formatters/dashboardFormatter";
import { handleNavigation } from "@/utils";
import { useRouter } from "next/navigation";
import { IconShoppingCart, IconTruck } from "@tabler/icons-react";

const SupplierManagement = () => {
  const router = useRouter()
  const styles = {
    container: {
      padding: "1rem",
      backgroundColor: "#f8fafc",
    },
    sectionCard: {
      borderRadius: "12px",
      border: "none",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      marginBottom: "1rem",
    },
    iconCircle: {
      backgroundColor: "#e0f2fe",
      borderRadius: "50%",
      width: "36px",
      height: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#1d4ed8",
    },
    purchaseCard: {
      backgroundColor: "#f1f5f9",
      borderRadius: "12px",
      padding: "1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    amount: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      color: "#0d4af1ff",
    },
    pieLegend: {
      display: "flex",
      gap: "1rem",
      flexWrap: "wrap",
      marginTop: "0.5rem",
    },
    legendItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.85rem",
    },
    legendDot: {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
    },
  };

  const { startDate, endDate } = useDashboardContext();
  const myScrollRef = useRef(null);

  return (
    <Card style={styles.container} className="m-2">
      <ComponentHeader
        title={"Supplier Management"}
        description={"Track purchases, payments, and supplier relationships"}
        titleColor={"black"}
        cardBgColor={"none"}
        isShowArrows={false}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={<div style={{
          background: '#3c62e8', // blue gradient for Figma look
          borderRadius: '12px',
          padding: '8px',
          display: 'inline-block'
        }}>
          <IconTruck stroke={2} color="#fff" size={24} />
        </div>}
      />

      {/* ✅ ServiceRenderer takes care of loading, error, retry, no data */}
      <ServiceRenderer
        queryHook={useSuppliersUsage}
        queryKey={["suppliersUsage", { startdt: startDate, enddt: endDate }]}
        queryFn={() =>
          useSuppliersUsage({ startdt: startDate, enddt: endDate }).queryFn
        }
        queryArgs={[
          { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
        ]}
        formatter={supplierManagementDataFormatter}
        shimmerCount={2}
      >
        {(formattedData, refetch) => (
          <Card style={styles.sectionCard}>
            <Card.Body>
              {/* <div className="d-flex align-items-center mb-3">
                <div style={styles.iconCircle}>
                  <FaCalendarAlt />
                </div>
                <div className="ms-2 fw-semibold">Purchase from Suppliers</div>
              </div> */}

              <div
                style={styles.purchaseCard}
                className="mb-4"
                onClick={() =>
                  handleNavigation({
                    router,
                    url: "sp/purchase_analytics",
                    params: { startDate: startDate, endDate: endDate },
                  })
                }
              >
                <div>
                  <div style={{ fontSize: "0.9rem", color: "#334155" }}>
                    Total Purchase
                  </div>
                  <div style={styles.amount}>
                    {formattedData.cardData[0].value}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#0667f0ff" }}>
                    from {formattedData.cardData[0].suppliers} suppliers
                  </div>
                </div>
                <div style={{
                  background: '#3b5eef', // blue gradient matching Figma style
                  borderRadius: '16px',
                  padding: '14px',
                  display: 'inline-block'
                }}>
                  <IconShoppingCart stroke={2} color="#fff" size={28} />
                </div>
              </div>

              <Row>
                <Col md={6}>
                  <PurchaseDistributionGraph
                    pieData={formattedData.pieData}
                    styles={styles}
                  />
                </Col>
                <Col md={6}>
                  <SupplierDetailsTable
                    supplierData={formattedData.supplierData}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}
      </ServiceRenderer>
    </Card>
  );
};

export default SupplierManagement;

// "use client";

// import ComponentHeader from "@/components/common/ComponentHeader";
// import React, { useRef } from "react";
// import { Card, Row, Col } from "react-bootstrap";
// import { FaTruck, FaCalendarAlt, FaShoppingCart } from "react-icons/fa";
// import PurchaseDistributionGraph from "@/components/common/GraphWrapper/PurchaseDistributionGraph";
// import SupplierDetailsTable from "@/components/common/TablesSort/SupplierDetailsTable";

// const SupplierManagement = () => {
//   const styles = {
//     container: {
//       padding: "1rem",
//       backgroundColor: "#f8fafc",
//     },
//     sectionCard: {
//       borderRadius: "12px",
//       border: "none",
//       boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//       marginBottom: "1rem",
//     },
//     iconCircle: {
//       backgroundColor: "#e0f2fe",
//       borderRadius: "50%",
//       width: "36px",
//       height: "36px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       color: "#1d4ed8",
//     },
//     purchaseCard: {
//       backgroundColor: "#f1f5f9",
//       borderRadius: "12px",
//       padding: "1rem",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },
//     amount: {
//       fontSize: "1.8rem",
//       fontWeight: "bold",
//       color: "#1e3a8a",
//     },
//     pieLegend: {
//       display: "flex",
//       gap: "1rem",
//       flexWrap: "wrap",
//       marginTop: "0.5rem",
//     },
//     legendItem: {
//       display: "flex",
//       alignItems: "center",
//       gap: "0.5rem",
//       fontSize: "0.85rem",
//     },
//     legendDot: {
//       width: "12px",
//       height: "12px",
//       borderRadius: "50%",
//     },
//   };

//   const pieData = [
//     { name: "Dairy Fresh Supply", value: 45, color: "#8b5cf6" },
//     { name: "Fresh Vegetables Co.", value: 85, color: "#3b82f6" },
//     { name: "Meat Masters", value: 35, color: "#14b8a6" },
//     { name: "Rice & Grains Hub", value: 20, color: "#22c55e" },
//   ];

//   const supplierData = [
//     {
//       supplier: "Fresh Vegetables Co.",
//       category: "Vegetables",
//       location: "Mumbai",
//       purchase: "₹85,000",
//       items: 125,
//     },
//     {
//       supplier: "Fresh Vegetables Co.",
//       category: "Vegetables",
//       location: "Mumbai",
//       purchase: "₹85,000",
//       items: 125,
//     },
//     {
//       supplier: "Fresh Vegetables Co.",
//       category: "Vegetables",
//       location: "Mumbai",
//       purchase: "₹85,000",
//       items: 125,
//     },
//     {
//       supplier: "Fresh Vegetables Co.",
//       category: "Vegetables",
//       location: "Mumbai",
//       purchase: "₹85,000",
//       items: 125,
//     },    {
//       supplier: "Fresh Vegetables Co.",
//       category: "Vegetables",
//       location: "Mumbai",
//       purchase: "₹85,000",
//       items: 125,
//     },
//     {
//       supplier: "Spice World Ltd.",
//       category: "Spices",
//       location: "Delhi",
//       purchase: "₹65,000",
//       items: 45,
//     },
//     {
//       supplier: "Dairy Fresh Supply",
//       category: "Dairy",
//       location: "Pune",
//       purchase: "₹45,000",
//       items: 85,
//     },
//     {
//       supplier: "Meat Masters",
//       category: "Meat",
//       location: "Bangalore",
//       purchase: "₹35,000",
//       items: 35,
//     },
//     {
//       supplier: "Rice & Grains Hub",
//       category: "Grains",
//       location: "Chennai",
//       purchase: "₹20,000",
//       items: 55,
//     },
//   ];

//   const myScrollRef = useRef(null);

//   return (
//     <Card style={styles.container} className="m-2">
//       <ComponentHeader
//         title={"Supplier Management"}
//         description={"Track purchases, payments, and supplier relationships"}
//         titleColor={"rgba(26, 59, 228, 1) fs-4"}
//         cardBgColor={"none"}
//         isShowArrows={false}
//         scrollRef={myScrollRef}
//         isExpandable={true}
//         titleIcon={<FaTruck size={20} color="rgba(26,59,228,1)" />}
//       />

//       <Card style={styles.sectionCard}>
//         <Card.Body>
//           <div className="d-flex align-items-center mb-3">
//             <div style={styles.iconCircle}>
//               <FaCalendarAlt />
//             </div>
//             <div className="ms-2 fw-semibold">Purchase from Suppliers</div>
//           </div>

//           <div style={styles.purchaseCard} className="mb-4">
//             <div>
//               <div style={{ fontSize: "0.9rem", color: "#334155" }}>
//                 Total Purchase
//               </div>
//               <div style={styles.amount}>₹250,000</div>
//               <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
//                 from 5 suppliers
//               </div>
//             </div>
//             <div
//               style={{
//                 backgroundColor: "#3b82f6",
//                 borderRadius: "50%",
//                 padding: "0.75rem",
//                 color: "#fff",
//               }}
//             >
//               <FaShoppingCart size={20} />
//             </div>
//           </div>

//           <Row>
//             <Col md={6}>
//               <PurchaseDistributionGraph pieData={pieData} styles={styles} />
//             </Col>
//             <Col md={6}>
//               <SupplierDetailsTable supplierData={supplierData} />
//             </Col>
//           </Row>
//         </Card.Body>
//       </Card>
//     </Card>
//   );
// };

// export default SupplierManagement;
