// hooks/useTableSort.js
import { sortData } from "@/utils";
import { useState, useMemo } from "react";

export function useTableSort(data) {
  const [sortKey, setSortKey] = useState(null);
  const [direction, setDirection] = useState("asc");

  const handleSort = (key) => {
    if (sortKey === key) {
      setDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setDirection("asc");
    }
  };

  const sortedData = useMemo(
    () => (sortKey ? sortData(data, sortKey, direction) : data),
    [data, sortKey, direction]
  );

  return { sortedData, sortKey, direction, handleSort };
}
