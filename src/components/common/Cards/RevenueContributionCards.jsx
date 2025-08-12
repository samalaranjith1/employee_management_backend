import React from 'react'

function RevenueContributionCards({ card, idx, styles }) {
  return (
    <div
      key={idx}
      className="top-card"
      style={{
        ...styles.topCard,
        background: card.bg,
        color: card.color,
      }}
    >
      <div style={styles.icon}>{card.icon}</div>
      <div style={styles.value}>{card.value}</div>
      <div style={styles.title}>{card.title}</div>
      <div style={styles.desc}>{card.description}</div>
    </div>
  );
}

export default RevenueContributionCards