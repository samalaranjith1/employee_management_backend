"use client";

import SupplierDuesTable from "@/components/common/dashboard/TablesSort/SupplierDuesTable";
import React from "react";
import { Container } from "react-bootstrap";
import { FaRupeeSign, FaInfoCircle } from "react-icons/fa";
import { useSupplierDues } from "@/services/supplier-service";
import { supplierDuesDataFormatter } from "@/utils/data_formatters/dashboardFormatter"
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useDashboardContext } from "@/contexts/DashboardContext";

const SupplierDues = () => {
  const { startDate, endDate, dashboardFilter } = useDashboardContext();

  const styles = {
    mainCard: {
      borderRadius: "16px",
      padding: "0",
      backgroundColor: "#e2f15e24",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    },
    header: {
      backgroundColor: "#fef2f2",
      padding: "1rem 1.5rem",
      borderTopLeftRadius: "16px",
      borderTopRightRadius: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    headerLeft: {
      display: "flex",
      flexDirection: "column",
    },
    headerTitle: {
      fontSize: "1rem",
      fontWeight: "600",
      color: "#b91c1c",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    headerSubtitle: {
      fontSize: "0.85rem",
      color: "#9ca3af",
    },
    headerIcon: {
      backgroundColor: "#f43f5e",
      color: "#fff",
      borderRadius: "50%",
      padding: "0.5rem",
      fontSize: "1.25rem",
    },
    totalDueSection: {
      backgroundColor: "#fee2e2",
      padding: "1.5rem",
      borderRadius: "12px",
      margin: "1rem 1.5rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    totalDueText: {
      fontSize: "0.9rem",
      color: "#991b1b",
    },
    totalDueAmount: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#b91c1c",
    },
    supplierCount: {
      fontSize: "0.85rem",
      color: "#9ca3af",
    },
    tableHeader: {
      position: "sticky",
      top: 0,
      backgroundColor: "#fff",
      zIndex: 1,
      fontSize: "0.85rem",
      fontWeight: "600",
      color: "#991b1b",
      borderBottom: "2px solid #f1f5f9",
    },
    supplierName: {
      fontWeight: "600",
      fontSize: "0.9rem",
    },
    locationText: {
      fontSize: "0.8rem",
      color: "#9ca3af",
    },
    badge: {
      backgroundColor: "#f1f5f9",
      color: "#000",
      fontSize: "0.75rem",
      fontWeight: "500",
      borderRadius: "8px",
      padding: "0.25rem 0.5rem",
    },
    redAmount: {
      color: "#b91c1c",
      fontWeight: "600",
    },
  };

  return (
    <Container fluid style={styles.mainCard} className="m-2 p-2">
      <ServiceRenderer
        queryHook={useSupplierDues}
        queryKey={[
          "supplierDues",
          1,
          { startdt: startDate, enddt: endDate,  },
        ]}
        queryFn={() =>
          useSupplierDues({
            startdt: startDate,
            enddt: endDate,
            ...dashboardFilter,
          }).queryFn
        }
        queryArgs={[
          { startdt: startDate, enddt: endDate,outlet:1,userId:7 },
        ]}
        formatter={supplierDuesDataFormatter}
        shimmerCount={5}
      >
        {(formattedData) => (
          <>
            {/* Header */}
            <div style={styles.header}>
              <div style={styles.headerLeft}>
                <div style={styles.headerTitle}>
                  <FaInfoCircle /> Supplier Dues
                </div>
                <div style={styles.headerSubtitle}>
                  Outstanding payments and supplier dues tracking
                </div>
              </div>
              <div style={styles.headerIcon}>
                <FaRupeeSign />
              </div>
            </div>

            {/* Total Due */}
            <div style={styles.totalDueSection}>
              <div>
                <div style={styles.totalDueText}>Total Due as of today</div>
                <div style={styles.totalDueAmount}>
                  ₹{formattedData.summary?.totalDueAmount?.toLocaleString()}
                </div>
                <div style={styles.supplierCount}>
                  to {formattedData.summary?.suppliers} suppliers
                </div>
              </div>
            </div>

            {/* Table */}
            <div style={{ maxHeight: "65vh", overflowY: "auto" }}>
              <SupplierDuesTable styles={styles} data={formattedData.list} />
            </div>
          </>
        )}
      </ServiceRenderer>
    </Container>
  );
};

export default SupplierDues;

// "use client";

// import SupplierDuesTable from "@/components/common/dashboard/TablesSort/SupplierDuesTable";
// import React from "react";
// import { Container } from "react-bootstrap";
// import { FaRupeeSign, FaInfoCircle } from "react-icons/fa";

// const SupplierDues = () => {
//   const styles = {
//     mainCard: {
//       borderRadius: "16px",
//       // border: "none",
//       padding: "0",
//       backgroundColor: "#e2f15e24",
//       boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
//     },
//     header: {
//       backgroundColor: "#fef2f2",
//       padding: "1rem 1.5rem",
//       borderTopLeftRadius: "16px",
//       borderTopRightRadius: "16px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//     },
//     headerLeft: {
//       display: "flex",
//       flexDirection: "column",
//     },
//     headerTitle: {
//       fontSize: "1rem",
//       fontWeight: "600",
//       color: "#b91c1c",
//       display: "flex",
//       alignItems: "center",
//       gap: "0.5rem",
//     },
//     headerSubtitle: {
//       fontSize: "0.85rem",
//       color: "#9ca3af",
//     },
//     headerIcon: {
//       backgroundColor: "#f43f5e",
//       color: "#fff",
//       borderRadius: "50%",
//       padding: "0.5rem",
//       fontSize: "1.25rem",
//     },
//     totalDueSection: {
//       backgroundColor: "#fee2e2",
//       padding: "1.5rem",
//       borderRadius: "12px",
//       margin: "1rem 1.5rem",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },
//     totalDueText: {
//       fontSize: "0.9rem",
//       color: "#991b1b",
//     },
//     totalDueAmount: {
//       fontSize: "2rem",
//       fontWeight: "700",
//       color: "#b91c1c",
//     },
//     supplierCount: {
//       fontSize: "0.85rem",
//       color: "#9ca3af",
//     },
//     tableHeader: {
//       position: "sticky",
//       top: 0,
//       backgroundColor: "#fff",
//       zIndex: 1,
//       fontSize: "0.85rem",
//       fontWeight: "600",
//       color: "#991b1b",
//       borderBottom: "2px solid #f1f5f9",
//     },
//     supplierName: {
//       fontWeight: "600",
//       fontSize: "0.9rem",
//     },
//     locationText: {
//       fontSize: "0.8rem",
//       color: "#9ca3af",
//     },
//     badge: {
//       backgroundColor: "#f1f5f9",
//       color: "#000",
//       fontSize: "0.75rem",
//       fontWeight: "500",
//       borderRadius: "8px",
//       padding: "0.25rem 0.5rem",
//     },
//     redAmount: {
//       color: "#b91c1c",
//       fontWeight: "600",
//     },
//   };

//   const data = [
//     {
//       supplier: "Fresh Vegetables Co.",
//       category: "Vegetables",
//       location: "Mumbai",
//       thisMonth: 185000,
//       lastMonth: null,
//       total: 185000,
//       items: 325,
//       supplierId: 1,
//     },
//     {
//       supplier: "Spice World Ltd.",
//       category: "Spices",
//       location: "Delhi",
//       thisMonth: 145000,
//       lastMonth: null,
//       total: 145000,
//       items: 125,
//       supplierId: 1,
//     },
//     {
//       supplier: "Dairy Fresh Supply",
//       category: "Dairy",
//       location: "Pune",
//       thisMonth: 85000,
//       lastMonth: null,
//       total: 85000,
//       items: 145,
//       supplierId: 1,
//     },
//     {
//       supplier: "Rice & Grains Hub",
//       category: "Grains",
//       location: "Chennai",
//       thisMonth: 85000,
//       lastMonth: null,
//       total: 85000,
//       items: 185,
//       supplierId: 1,
//     },
//     {
//       supplier: "Bakery Supplies Inc.",
//       category: "Bakery",
//       location: "Kolkata",
//       thisMonth: 45000,
//       lastMonth: null,
//       total: 45000,
//       items: 95,
//       supplierId: 1,
//     },
//     {
//       supplier: "Meat Masters",
//       category: "Meat",
//       location: "Bangalore",
//       thisMonth: 25000,
//       lastMonth: null,
//       total: 25000,
//       items: 55,
//       supplierId: 1,
//     },
//     {
//       supplier: "Seafood Express",
//       category: "Seafood",
//       location: "Goa",
//       thisMonth: 20000,
//       lastMonth: null,
//       total: 20000,
//       items: 35,
//       supplierId: 1,
//     },
//     {
//       supplier: "Oil & Condiments",
//       category: "Oils",
//       location: "Hyderabad",
//       thisMonth: 10000,
//       lastMonth: null,
//       total: 10000,
//       items: 25,
//       supplierId: 1,
//     },
//   ];

//   return (
//     <Container fluid style={styles.mainCard} className="m-2 p-2 ">
//       {/* Header */}
//       <div style={styles.header}>
//         <div style={styles.headerLeft}>
//           <div style={styles.headerTitle}>
//             <FaInfoCircle /> Supplier Dues
//           </div>
//           <div style={styles.headerSubtitle}>
//             Outstanding payments and supplier dues tracking
//           </div>
//         </div>
//         <div style={styles.headerIcon}>
//           <FaRupeeSign />
//         </div>
//       </div>

//       {/* Total Due */}
//       <div style={styles.totalDueSection}>
//         <div>
//           <div style={styles.totalDueText}>Total Due as of today</div>
//           <div style={styles.totalDueAmount}>₹600,000</div>
//           <div style={styles.supplierCount}>to 8 suppliers</div>
//         </div>
//       </div>

//       {/* Table */}
//       <div style={{ maxHeight: "65vh", overflowY: "auto" }}>
//         <SupplierDuesTable styles={styles} data={data}/>
//       </div>
//     </Container>
//   );
// };

// export default SupplierDues;
