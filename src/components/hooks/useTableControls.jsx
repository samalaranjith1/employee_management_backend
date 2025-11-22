import { useCallback, useState } from "react";
import { useExportToExcel } from "./useExportToExcel";
import { useFilteredData } from "./useFilteredData";

export function useTableControls({
  data,
  columns,
  searchFields = [],
  filtersConfig = {},
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState(
    Object.keys(filtersConfig).reduce(
      (acc, key) => ({ ...acc, [key]: "All" }),
      {}
    )
  );

  const { exportToExcel } = useExportToExcel();

  const filteredData = useFilteredData({
    data,
    filters,
    searchTerm,
    searchFields,
  });

  const handleExport = useCallback(() => {
    exportToExcel({ data: filteredData, columns, fileName: "Export.xlsx" });
  }, [exportToExcel, filteredData, columns]);

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    filteredData,
    handleExport,
  };
}
