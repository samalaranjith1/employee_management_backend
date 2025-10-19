"use client";
import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import CommonCard from "./CommonCard";
import { useRouter } from "next/navigation";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { handleNavigation } from "@/utils";
import "@/app/globals.css";
export default function MTDCard({ idx, isMobile, card, getVariantBgColor }) {
  const router = useRouter();
  const { dashboardFilter ,startDate,endDate} = useDashboardContext();
  return (
    <div
      style={{ cursor: "pointer",border:"0.1px solid #eee",borderRadius:"12px" }}
      onClick={() =>
        handleNavigation({
          router,
          url: `sp/${card.routeUrl}`,
          params: { startDate: startDate, endDate: endDate },
        })
      }
    >
      <CommonCard key={idx} minWidth="280px">
        <div className="d-flex justify-content-between align-items-center">
          <small className="c_small_text_bold c_gray_3">{card.title}</small>
          {/* <Badge bg={card.trendColor} pill>
            {card.percentageChange}
          </Badge> */}
        </div>
        <h4 className="fw-bold mt-2 c_heading_5">
          {card.value}{" "}
          {card.trend === "up" ? (
            <span className="text-success">
              {/* <FaCaretUp /> */}
            </span>
          ) : (
            <span className="text-danger">
              {/* <FaCaretDown /> */}
            </span>
          )}
        </h4>
        {card.rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="p-2 rounded mt-3 mb-2"
            style={{ backgroundColor: getVariantBgColor(row.variant) }}
          >
            <Row>
              <Col className="fw-medium c_small_text_bold ">{row.label}</Col>
              <Col className="fw-bold text-end c_small_text_extra_bold ">{row.value}</Col>
            </Row>
          </div>
        ))}
      </CommonCard>
    </div>
  );
}
