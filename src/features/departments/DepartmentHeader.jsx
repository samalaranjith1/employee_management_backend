"use client";

import React from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { FaArrowLeft, FaCog } from "react-icons/fa";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useDepartment } from "@/services/department-service";
import { departmentHeaderDataFormatter } from "@/utils/data_formatters/departmentPage";
import { useDepartmentContext } from "@/contexts/DepartmentContext";

export default function DepartmentHeader({ departmentId =2, onManageClick }) {
  const { startDate, endDate } = useDepartmentContext();

  // ✅ Prevent rendering until departmentId is valid
  if (!departmentId) {
    return (
      <div
        style={{
          background: "linear-gradient(135deg, #F56A2A, #F23C13)",
          color: "#fff",
          padding: "1.5rem 0px",
          // borderBottomLeftRadius: "12px",
          // borderBottomRightRadius: "12px",
        }}
      >
        <Container fluid>
          <div className="d-flex align-items-center">
            <Spinner
              animation="border"
              variant="light"
              size="sm"
              className="me-2"
            />
            <span>Loading Department...</span>
          </div>
        </Container>
      </div>
    );
  }
console.log(departmentId)
  return (
    <ServiceRenderer
      queryHook={useDepartment}
      queryKey={[
        "departmentSummary",
        departmentId,
        { startdt: startDate, enddt: endDate },
      ]}
      queryFn={() =>
        useDepartment(departmentId, {
          startdt: startDate,
          enddt: endDate,
        }).queryFn
      }
      queryArgs={[
        departmentId,
        { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
      ]}
      formatter={departmentHeaderDataFormatter}
      shimmerCount={1}
    >
      {(headerData) => (
        <div
          style={{
            background: "linear-gradient(135deg, #F56A2A, #F23C13)",
            color: "#fff",
            padding: "1.5rem 2rem",
            // borderBottomLeftRadius: "12px",
            // borderBottomRightRadius: "12px",
            // margin:'0 5px'
          }}
        >
          <Container fluid>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              {/* Left side */}
              <div
                style={{
                  flex: "1 1 auto",
                  minWidth: "220px",
                }}
              >
                <div className="d-flex align-items-center mb-1">
                  <FaArrowLeft size={20} className="me-2" />
                  <span style={{ fontSize: "1rem", fontWeight: "500" }}>
                    Department
                  </span>
                </div>

                {/* Title + Mobile Icon Row */}
                <div className="d-flex align-items-center justify-content-between">
                  <h3 className="fw-bold mb-1">
                    {headerData?.name || "Unknown Department"}
                  </h3>

                  {/* Mobile Button (same row as title) */}
                  <Button
                    variant="outline-light"
                    className="d-flex d-md-none"
                    style={{
                      background: "#fff",
                      color: "#F23C13",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #eee",
                    }}
                    onClick={onManageClick}
                  >
                    <FaCog />
                  </Button>
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    opacity: 0.95,
                  }}
                >
                  <span>
                    Goal:{" "}
                    <strong className="fw-bold">
                      {headerData?.costToSalePercentageGoal ?? 0}% <span className="fw-normal">of Sale</span>
                    </strong>
                  </span>{" "}
                  • <span>Products: <span className="fw-bold">{headerData?.productsCount ?? 0}</span></span> •{" "}
                  <span>Team: <span className="fw-bold">{headerData?.teamSize ?? 0}</span></span> •{" "}
                  <span>Type: <span className="fw-bold">{headerData?.type ?? "-"}</span></span>
                </div>
              </div>

              {/* Right side (Desktop only) */}
              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  flex: "0 0 auto",
                }}
              >
                {/* Desktop Button */}
                <Button
                  variant="outline-light"
                  className="d-none d-md-flex align-items-center"
                  style={{
                    background: "#fff",
                    color: "#F23C13",
                    fontWeight: "500",
                    borderRadius: "8px",
                    border: "1px solid #eee",
                  }}
                  onClick={onManageClick}
                >
                  <FaCog className="me-2" />
                  Manage Department Closing
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}
    </ServiceRenderer>
  );
}

// "use client";

// import React from "react";
// import { Button, Container } from "react-bootstrap";
// import { FaArrowLeft, FaCog } from "react-icons/fa";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
// import { useDepartment } from "@/services/department-service";
// import { departmentHeaderDataFormatter } from "@/utils/data_formatters/departmentPage";
// import { useDepartmentContext } from "@/contexts/DepartmentContext";

// export default function DepartmentHeader({ departmentId, onManageClick }) {
//   const { startDate, endDate } = useDepartmentContext();

//   return (
//     <ServiceRenderer
//       queryHook={useDepartment}
//       queryKey={[
//         "departmentSummary",
//         departmentId,
//         { startdt: startDate, enddt: endDate },
//       ]}
//       queryFn={() =>
//         useDepartment(departmentId, {
//           startdt: startDate,
//           enddt: endDate,
//         }).queryFn
//       }
//       queryArgs={[
//         2,
//         { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
//       ]}
//       formatter={departmentHeaderDataFormatter}
//       shimmerCount={1}
//     >
//       {(headerData) => (
//         <div
//           style={{
//             background: "linear-gradient(135deg, #F56A2A, #F23C13)",
//             color: "#fff",
//             padding: "1.5rem 2rem",
//             borderBottomLeftRadius: "12px",
//             borderBottomRightRadius: "12px",
//           }}
//         >
//           <Container fluid>
//             <div
//               className="d-flex justify-content-between align-items-center flex-wrap gap-3"
//               style={{
//                 position: "relative",
//               }}
//             >
//               {/* Left side */}
//               <div
//                 style={{
//                   flex: "1 1 auto",
//                   minWidth: "220px",
//                 }}
//               >
//                 <div className="d-flex align-items-center mb-1">
//                   <FaArrowLeft size={20} className="me-2" />
//                   <span style={{ fontSize: "1rem", fontWeight: "500" }}>
//                     Department
//                   </span>
//                 </div>

//                 <h3 className="fw-bold mb-1">{headerData.name}</h3>

//                 <div
//                   style={{
//                     fontSize: "0.95rem",
//                     fontWeight: "500",
//                     opacity: 0.95,
//                   }}
//                 >
//                   <span>
//                     Goal:{" "}
//                     <strong>
//                       {headerData.costToSalePercentageGoal}% of Sale
//                     </strong>
//                   </span>{" "}
//                   • <span>Products: {headerData.productsCount}</span> •{" "}
//                   <span>Team: {headerData.teamSize}</span> •{" "}
//                   <span>Type: {headerData.type}</span>
//                 </div>
//               </div>

//               {/* Right side */}
//               <div
//                 style={{
//                   marginLeft: "auto",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "flex-end",
//                   flex: "0 0 auto",
//                 }}
//               >
//                 {/* Desktop Button */}
//                 <Button
//                   variant="outline-light"
//                   className="d-none d-md-flex align-items-center"
//                   style={{
//                     background: "#fff",
//                     color: "#F23C13",
//                     fontWeight: "500",
//                     borderRadius: "8px",
//                     border: "1px solid #eee",
//                   }}
//                   onClick={onManageClick}
//                 >
//                   <FaCog className="me-2" />
//                   Manage Department Closing
//                 </Button>

//                 {/* Mobile Button (right aligned) */}
//                 <div
//                   className="d-flex d-md-none"
//                   style={{
//                     position: "absolute",
//                     right: "0",
//                     top: "50%",
//                     transform: "translateY(-50%)",
//                   }}
//                 >
//                   <Button
//                     variant="outline-light"
//                     style={{
//                       background: "#fff",
//                       color: "#F23C13",
//                       borderRadius: "50%",
//                       width: "40px",
//                       height: "40px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       border: "1px solid #eee",
//                     }}
//                     onClick={onManageClick}
//                   >
//                     <FaCog />
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </Container>
//         </div>
//       )}
//     </ServiceRenderer>
//   );
// }
// "use client";

// import React from "react";
// import { Button, Container } from "react-bootstrap";
// import { FaArrowLeft, FaCog } from "react-icons/fa";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
// import { useDepartment } from "@/services/department-service";
// import { departmentHeaderDataFormatter } from "@/utils/data_formatters/departmentPage";
// import { useDepartmentContext } from "@/contexts/DepartmentContext";

// export default function DepartmentHeader({ departmentId, onManageClick }) {
//   const { startDate, endDate } = useDepartmentContext();

//   return (
//     <ServiceRenderer
//       queryHook={useDepartment}
//       queryKey={[
//         "departmentSummary",
//         departmentId,
//         { startdt: startDate, enddt: endDate },
//       ]}
//       queryFn={() =>
//         useDepartment(departmentId, {
//           startdt: startDate,
//           enddt: endDate,
//         }).queryFn
//       }
//       queryArgs={[
//         2,
//         { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
//       ]}
//       formatter={departmentHeaderDataFormatter}
//       shimmerCount={1}
//     >
//       {(headerData) => (
//         <div
//           style={{
//             background: "linear-gradient(135deg, #F56A2A, #F23C13)",
//             color: "#fff",
//             padding: "1.5rem 2rem",
//             borderBottomLeftRadius: "12px",
//             borderBottomRightRadius: "12px",
//           }}
//         >
//           <Container fluid>
//             <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
//               {/* Left side */}
//               <div>
//                 <div className="d-flex align-items-center mb-1">
//                   <FaArrowLeft size={20} className="me-2" />
//                   <span style={{ fontSize: "1rem", fontWeight: "500" }}>
//                     Department
//                   </span>
//                 </div>

//                 <h3 className="fw-bold mb-1">{headerData.name}</h3>

//                 <div
//                   style={{
//                     fontSize: "0.95rem",
//                     fontWeight: "500",
//                     opacity: 0.95,
//                   }}
//                 >
//                   <span>
//                     Goal:{" "}
//                     <strong>
//                       {headerData.costToSalePercentageGoal}% of Sale
//                     </strong>
//                   </span>{" "}
//                   • <span>Products: {headerData.productsCount}</span> •{" "}
//                   <span>Team: {headerData.teamSize}</span> •{" "}
//                   <span>Type: {headerData.type}</span>
//                 </div>
//               </div>

//               {/* Right side */}
//               <div>
//                 {/* Desktop Button */}
//                 <Button
//                   variant="outline-light"
//                   className="d-none d-md-flex align-items-center"
//                   style={{
//                     background: "#fff",
//                     color: "#F23C13",
//                     fontWeight: "500",
//                     borderRadius: "8px",
//                     border: "1px solid #eee",
//                   }}
//                   onClick={onManageClick}
//                 >
//                   <FaCog className="me-2" />
//                   Manage Department Closing
//                 </Button>

//                 {/* Mobile Button */}
//                 <Button
//                   variant="outline-light"
//                   className="d-flex d-md-none"
//                   style={{
//                     background: "#fff",
//                     color: "#F23C13",
//                     borderRadius: "50%",
//                     width: "40px",
//                     height: "40px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     border: "1px solid #eee",
//                   }}
//                   onClick={onManageClick}
//                 >
//                   <FaCog />
//                 </Button>
//               </div>
//             </div>
//           </Container>
//         </div>
//       )}
//     </ServiceRenderer>
//   );
// }
// "use client";
// import { Button } from "react-bootstrap";
// import { FaArrowLeft, FaCog } from "react-icons/fa";

// function DepartmentHeader({ department, onManageClick }) {
//   return (
//     <div
//       style={{
//         background: "linear-gradient(135deg, #F56A2A, #F23C13)",
//         color: "#fff",
//         padding: "1.2rem 2rem",
//         borderBottomLeftRadius: "12px",
//         borderBottomRightRadius: "12px",
//       }}
//     >
//       <div className="d-flex justify-content-between align-items-center">
//         <div className="d-flex align-items-center">
//           <FaArrowLeft size={20} className="me-2" />
//           <span style={{ fontSize: "1rem", fontWeight: "500" }}>
//             Department
//           </span>
//         </div>

//         {/* Desktop Button */}
//         <Button
//           variant="outline-light"
//           className="d-none d-md-flex align-items-center"
//           style={{
//             background: "#fff",
//             color: "#F23C13",
//             fontWeight: "500",
//             borderRadius: "8px",
//             border: "1px solid #eee",
//           }}
//           onClick={onManageClick}
//         >
//           <FaCog className="me-2" />
//           Manage Department Closing
//         </Button>

//         {/* Mobile Button */}
//         <Button
//           variant="outline-light"
//           className="d-flex d-md-none"
//           style={{
//             background: "#fff",
//             color: "#F23C13",
//             borderRadius: "50%",
//             width: "40px",
//             height: "40px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             border: "1px solid #eee",
//           }}
//           onClick={onManageClick}
//         >
//           <FaCog />
//         </Button>
//       </div>

//       <h3 className="mt-2" style={{ fontWeight: "700" }}>
//         {department}
//       </h3>
//     </div>
//   );
// }

// export default DepartmentHeader;
