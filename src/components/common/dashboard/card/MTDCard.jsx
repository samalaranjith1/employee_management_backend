"use client";
import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import CommonCard from "./CommonCard";
import { useRouter } from "next/navigation";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { handleNavigation } from "@/utils";

export default function MTDCard({ idx, isMobile, card, getVariantBgColor }) {
  const router = useRouter();
  const { dashboardFilter } = useDashboardContext();
  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={() =>
        handleNavigation({
          router,
          url: card.routeUrl,
          params: dashboardFilter,
        })
      }
    >
      <CommonCard key={idx} minWidth="280px">
        <div className="d-flex justify-content-between align-items-center">
          <small className="fw-bold text-muted">{card.title}</small>
          <Badge bg={card.trendColor} pill>
            {card.percentageChange}
          </Badge>
        </div>
        <h4 className="fw-bold mt-2">
          {card.value}{" "}
          {card.trend === "up" ? (
            <span className="text-success">
              <FaCaretUp />
            </span>
          ) : (
            <span className="text-danger">
              <FaCaretDown />
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
              <Col className="fw-medium">{row.label}</Col>
              <Col className="fw-bold text-end">{row.value}</Col>
            </Row>
          </div>
        ))}
      </CommonCard>
    </div>
  );
}
