"use client";

import React from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";

export default function ServiceRenderer({
  queryHook,
  queryArgs = [],
  formatter,
  shimmerCount = 3,
  children,
}) {
  const { data, isLoading, isError, refetch } = queryHook(...queryArgs);

  /** Shimmer loader */
  const ShimmerLoader = ({ shimmerCount }) => (
    <>
      {/* Mobile: horizontal scroll, one card ~90vw */}
      <div
        className="d-flex d-md-none"
        style={{
          overflowX: "auto",
          gap: "1rem",
          paddingBottom: "0.5rem",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {Array.from({ length: shimmerCount }).map((_, i) => (
          <div key={i} style={{ flex: "0 0 90vw", maxWidth: "80vw" }}>
            <Card className="shadow-sm h-100 p-3 loader-card">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <span className="placeholder col-6"></span>
                <span
                  className="placeholder"
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                ></span>
              </div>
              <div className="placeholder-glow">
                <span className="placeholder col-7 mb-2"></span>
                <span className="placeholder col-4 mb-2"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8 mt-2"></span>
                <span className="placeholder col-5 mt-2"></span>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Desktop/Tablet: keep grid */}
      <Row className="d-none d-md-flex">
        {Array.from({ length: shimmerCount }).map((_, i) => (
          <Col key={i} xs={12} md={12 / shimmerCount} className="mb-3">
            <Card className="shadow-sm h-100 p-3 loader-card">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <span className="placeholder col-6"></span>
                <span
                  className="placeholder"
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                ></span>
              </div>
              <div className="placeholder-glow">
                <span className="placeholder col-7 mb-2"></span>
                <span className="placeholder col-4 mb-2"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8 mt-2"></span>
                <span className="placeholder col-5 mt-2"></span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );

  /** Error state */
  if (isError) {
    return (
      <Container fluid className="py-3">
        <Alert
          variant="danger"
          className="d-flex justify-content-between align-items-center"
        >
          <span>Something went wrong while fetching data.</span>
          <Button variant="primary" size="sm" onClick={() => refetch()}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  /** Loading state */
  if (isLoading) {
    return (
      <Container fluid className="py-3">
        <ShimmerLoader shimmerCount={shimmerCount} />
      </Container>
    );
  }

  /** Apply formatter */
  const formattedData = formatter ? formatter(data) : data;

  /** Check empty arrays recursively */
  const hasEmptyArray = (val, seen = new WeakSet()) => {
    if (Array.isArray(val)) {
      return val.length === 0 || val.some((item) => hasEmptyArray(item, seen));
    }
    if (val && typeof val === "object") {
      if (seen.has(val)) return false;
      seen.add(val);
      return Object.values(val).some(
        (item) => Array.isArray(item) && hasEmptyArray(item, seen)
      );
    }
    return false;
  };

  /** No data checks */
  const noData =
    !formattedData ||
    (Array.isArray(formattedData) && formattedData.length === 0) ||
    hasEmptyArray(formattedData);

  if (noData) {
    return (
      <Container fluid className="py-3">
        <Alert variant="info">
          No data available for the selected filters.
        </Alert>
      </Container>
    );
  }

  /** ✅ Success state */
  return children(formattedData, refetch);
}

// "use client";

// import React from "react";
// import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";

// export default function ServiceRenderer({
//   queryHook,
//   queryKey = [],
//   queryFn,
//   queryArgs,
//   formatter,
//   shimmerCount = 3,
//   children,
// }) {
//   // Run the query hook with dynamic key & fn
//   const { data, isLoading, isError, refetch } = queryHook(...queryArgs);

//   /** Shimmer loader (responsive) */
//   const ShimmerLoader = ({ shimmerCount }) => (
//     <Row>
//       {Array.from({ length: shimmerCount }).map((_, i) => (
//         <Col
//           key={i}
//           xs={12} // mobile: one card per row
//           md={12 / shimmerCount} // desktop: equal split
//           className="mb-3"
//         >
//           <Card className="shadow-sm h-100 p-3 loader-card">
//             <div className="d-flex justify-content-between align-items-start mb-3">
//               {/* Left Title Placeholder */}
//               <span className="placeholder col-6"></span>
//               {/* Right Icon Placeholder */}
//               <span
//                 className="placeholder"
//                 style={{ width: "30px", height: "30px", borderRadius: "50%" }}
//               ></span>
//             </div>

//             {/* Body placeholders */}
//             <div className="placeholder-glow">
//               <span className="placeholder col-7 mb-2"></span>
//               <span className="placeholder col-4 mb-2"></span>
//               <span className="placeholder col-6"></span>
//               <span className="placeholder col-8 mt-2"></span>
//               <span className="placeholder col-5 mt-2"></span>
//             </div>
//           </Card>
//         </Col>
//       ))}
//     </Row>
//   );

//   /** Error state */
//   if (isError) {
//     return (
//       <Container fluid className="py-3">
//         <Alert
//           variant="danger"
//           className="d-flex justify-content-between align-items-center"
//         >
//           <span>Something went wrong while fetching data.</span>
//           <Button variant="primary" size="sm" onClick={() => refetch()}>
//             Try Again
//           </Button>
//         </Alert>
//       </Container>
//     );
//   }

//   /** Loading state */
//   if (isLoading) {
//     return (
//       <Container fluid className="py-3">
//         <ShimmerLoader shimmerCount ={shimmerCount}/>
//       </Container>
//     );
//   }

//   /** No data */
//   if (!data || (Array.isArray(data) && data.length === 0)) {
//     return (
//       <Container fluid className="py-3">
//         <Alert variant="info">
//           No data available for the selected filters.
//         </Alert>
//       </Container>
//     );
//   }

//   /** Apply formatter if provided */
//   const formattedData = formatter ? formatter(data) : data;

//   /** ✅ Success state → render children */
//   return children(formattedData, refetch);
// }

//below code works perfect
// "use client";

// import React from "react";
// import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";

// export default function ServiceRenderer({
//   queryHook,
//   queryParams = [],
//   formatter,
//   shimmerCount = 3,
//   children,
// }) {
//   // Call the queryHook with params
//   const { data, isLoading, isError, refetch } = queryHook(1,{...queryParams});

//   /** Shimmer loader (responsive) */
// const ShimmerLoader = ({ shimmerCount=3}) => (
//   <Row>
//     {Array.from({ length: shimmerCount }).map((_, i) => (
//       <Col
//         key={i}
//         xs={12} // mobile: one card per row
//         md={12 / shimmerCount} // desktop: equal split
//         className="mb-3"
//       >
//         <Card className="shadow-sm h-100 p-3 loader-card">
//           <div className="d-flex justify-content-between align-items-start mb-3">
//             {/* Left Title Placeholder */}
//             <span className="placeholder col-6"></span>
//             {/* Right Icon Placeholder */}
//             <span
//               className="placeholder"
//               style={{ width: "30px", height: "30px", borderRadius: "50%" }}
//             ></span>
//           </div>

//           {/* Body placeholders */}
//           <div className="placeholder-glow">
//             <span className="placeholder col-7 mb-2"></span>
//             <span className="placeholder col-4 mb-2"></span>
//             <span className="placeholder col-6"></span>
//             <span className="placeholder col-8 mt-2"></span>
//             <span className="placeholder col-5 mt-2"></span>
//           </div>
//         </Card>
//       </Col>
//     ))}
//   </Row>
// );

//   /** Error state */
//   if (isError) {
//     return (
//       <Container fluid className="py-3">
//         <Alert
//           variant="danger"
//           className="d-flex justify-content-between align-items-center"
//         >
//           <span>Something went wrong while fetching data.</span>
//           <Button variant="outline-light" size="sm" onClick={() => refetch()}>
//             Try Again
//           </Button>
//         </Alert>
//       </Container>
//     );
//   }

//   /** Loading state */
//   if (isLoading) {
//     return (
//       <Container fluid className="py-3">
//         <ShimmerLoader />
//       </Container>
//     );
//   }

//   /** No data */
//   if (!data || (Array.isArray(data) && data.length === 0)) {
//     return (
//       <Container fluid className="py-3">
//         <Alert variant="info">
//           No data available for the selected filters.
//         </Alert>
//       </Container>
//     );
//   }

//   /** Apply formatter if provided */
//   const formattedData = formatter ? formatter(data) : data;

//   /** ✅ Success state → return raw children (don't wrap in Container) */
//   return children(formattedData);
// }
