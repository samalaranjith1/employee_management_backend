"use client";

import React, { useRef, useState, useEffect } from "react";
import { Card } from "react-bootstrap";

export default function MainComponentHoldingCard({ children }) {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const baseStyle = {
    margin: "0.5rem", // m-2 approx
    padding: "1rem", // p-3 approx
    borderRadius: "0.25rem",
    backgroundColor: "white",
    boxShadow: "0 0 0 rgba(0,0,0,0)",
    transform: "translateY(0)",
    opacity: 1,
    transition: "box-shadow 0.3s ease, transform 0.3s ease",
    willChange: "box-shadow, transform",
    backfaceVisibility: "hidden", // added to reduce blur
  };

  const visibleStyle = {
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    transform: "translate3d(0, -4px, 0)", // changed to translate3d for better GPU rendering
  };

  return (
    <Card
      className="m-2 shadow-lg"
      style={{ border: "2px solid rgba(253,133,65,0.5)" }}
    >
      {children}
    </Card>
  );
}
