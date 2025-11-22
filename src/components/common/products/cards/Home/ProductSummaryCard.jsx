import CommonCard from "@/components/common/dashboard/card/CommonCard";
import React from "react";

export default function ProductSummaryCard({
  title,
  value,
  description,
  icon,
  bgColor,
  textColor,
  borderColor,
}) {
  return (
    <CommonCard
      bgColor={bgColor}
      textColor={textColor}
      borderColor={borderColor}
    >
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div>
          <h6 style={{ margin: 0 }}>{title}</h6>
          <h4 style={{ margin: 0 }}>{value}</h4>
        </div>
        <div style={{ fontSize: "24px" }}>{icon}</div>
      </div>
      {description && (
        <p style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>
          {description}
        </p>
      )}
    </CommonCard>
  );
}
