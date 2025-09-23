"use client";

import React, { useEffect, useState } from "react";
import { Badge, Col, Row } from "react-bootstrap";
import {
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaBolt,
} from "react-icons/fa";

function ComponentHeader({
  title,
  description,
  titleColor = "",
  cardBgColor = "transparent",
  expandLink = "",
  isShowArrows,
  scrollRef,
  isExpandable,
  text = "",
  titleIcon = null,
  handleExpandClick=()=>{},
}) {
  const CARD_GAP_PX = 16;
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const getScrollAmount = () => {
    if (scrollRef?.current) {
      const firstCard = scrollRef.current.querySelector(".card-item");
      if (firstCard) {
        return firstCard.offsetWidth + CARD_GAP_PX;
      }
    }
    return 240;
  };

  useEffect(() => {
    setIsClient(true);

    const checkScroll = () => {
      const el = scrollRef?.current;
      if (el) {
        setShowScrollButtons(el.scrollWidth > el.clientWidth);
      }
    };

    if (typeof window !== "undefined") {
      checkScroll();
      window.addEventListener("resize", checkScroll);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", checkScroll);
      }
    };
  }, [scrollRef]);

  const slideLeft = () => {
    if (scrollRef?.current) {
      scrollRef.current.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth",
      });
    }
  };

  const slideRight = () => {
    if (scrollRef?.current) {
      scrollRef.current.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth",
      });
    }
  };

  return (
    <Row
      className="d-flex align-items-center justify-content-between mb-3 pe-2 pt-1"
      style={{ backgroundColor: cardBgColor }}
    >
      <Col className="d-flex align-items-center">
        <div className="me-2">
          {titleIcon ? titleIcon : <FaBolt size={24} color="rgb(255,80,22)" />}
        </div>
        <div className="d-flex flex-column mt-2">
          <div
            className={titleColor}
            style={{ color: titleColor, fontWeight: "bold" }}
          >
            {title}
          </div>
          <div>{description}</div>
        </div>
      </Col>

      <Col xs="auto" className="d-flex align-items-center ms-auto gap-2">
        {text && <Badge>{text}</Badge>}

        {isClient && isShowArrows && showScrollButtons && (
          <div className="d-none d-md-flex gap-3 me-2">
            <FaChevronLeft
              size={18}
              className="text-muted"
              style={{ cursor: "pointer" }}
              onClick={slideLeft}
            />
            <FaChevronRight
              size={18}
              className="text-muted"
              style={{ cursor: "pointer" }}
              onClick={slideRight}
            />
          </div>
        )}
        {isExpandable && (
          <FaExpand
            size={24}
            color="rgb(255,80,22)"
            onClick={handleExpandClick}
          />
        )}
      </Col>
    </Row>
  );
}

export default ComponentHeader;

// "use client"; // This directive is crucial for client components in Next.js

// import React, { useEffect, useRef, useState } from "react";
// import { Badge, Col, Row } from "react-bootstrap";
// import {
//   FaBolt,
//   FaChevronLeft,
//   FaChevronRight,
//   FaExpand,
// } from "react-icons/fa";

// function ComponentHeader({
//   title,
//   description,
//   expandLink = "",
//   isShowArrows,
//   scrollRef,
//   isExpandable,
//   text =""// This ref should be passed from the parent to the scrollable container
// }) {
//   const CARD_GAP_PX = 16; // Assuming 1rem = 16px
//   const [showScrollButtons, setShowScrollButtons] = useState(false);
//   const [isClient, setIsClient] = useState(false); // New state to track if we are on the client

//   const getScrollAmount = () => {
//     // This function will only be called in contexts where scrollRef.current is valid
//     if (scrollRef.current) {
//       const firstCard = scrollRef.current.querySelector(".card-item");
//       if (firstCard) {
//         const cardWidth = firstCard.offsetWidth;
//         return cardWidth + CARD_GAP_PX;
//       }
//     }
//     return 240; // Fallback
//   };

//   useEffect(() => {
//     // Set isClient to true once component mounts on the client
//     // This ensures client-specific UI is only rendered after hydration
//     setIsClient(true);

//     const checkScroll = () => {
//       const el = scrollRef.current; // Use the passed scrollRef
//       if (el) {
//         // Only update state if the element exists (i.e., on client)
//         setShowScrollButtons(el.scrollWidth > el.clientWidth);
//       }
//     };

//     // Only run checkScroll and add event listener if on the client (browser environment)
//     if (typeof window !== "undefined") {
//       checkScroll();
//       window.addEventListener("resize", checkScroll);
//     }

//     return () => {
//       if (typeof window !== "undefined") {
//         window.removeEventListener("resize", checkScroll);
//       }
//     };
//   }, [scrollRef]); // Dependency on scrollRef ensures effect reruns if ref changes

//   const slideLeft = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({
//         left: -getScrollAmount(),
//         behavior: "smooth",
//       });
//     }
//   };

//   const slideRight = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({
//         left: getScrollAmount(),
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <Row className="d-flex align-items-center justify-content-between mb-3 pe-2 pt-1">
//       <Col className="d-flex align-items-center">
//         <div className="me-2">
//           <FaBolt size={24} color="rgb(255,80,22)" />
//         </div>
//         <div className="d-flex flex-column mt-2">
//           <div style={{ color: "rgb(255,80,22)", fontWeight: "bold" }}>
//             {title}
//           </div>
//           <div>{description}</div>
//         </div>
//       </Col>

//       <Col xs="auto" className="d-flex align-items-center ms-auto gap-2">
//         {isClient && isShowArrows && showScrollButtons && (
//           <div className="d-none d-md-flex gap-3 me-2">
//             <FaChevronLeft
//               size={18}
//               className="text-muted"
//               style={{ cursor: "pointer" }}
//               onClick={slideLeft}
//             />
//             <FaChevronRight
//               size={18}
//               className="text-muted"
//               style={{ cursor: "pointer" }}
//               onClick={slideRight}
//             />
//           </div>
//         )}
//         {isExpandable && <FaExpand size={24} color="rgb(255,80,22)" />}
//         {text && <Badge>{text}</Badge>}
//       </Col>
//     </Row>
//   );
// }

// export default ComponentHeader;
