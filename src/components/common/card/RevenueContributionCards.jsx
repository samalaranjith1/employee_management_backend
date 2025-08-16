"use client";
import React from "react";
import CommonCard from "./CommonCard";

export default function RevenueContributionCards({ card, idx, styles }) {
  return (
    <CommonCard
      key={idx}
      bgColor={card.bg}
      textColor={card.color}
      style={styles.topCard}
    >
      <div style={styles.icon}>{card.icon}</div>
      <div style={styles.value}>{card.value}</div>
      <div style={styles.title}>{card.title}</div>
      <div style={styles.desc}>{card.description}</div>
    </CommonCard>
  );
}
