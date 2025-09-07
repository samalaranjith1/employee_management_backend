// hooks/useFilteredData.js
import { useMemo } from "react";

/**
 * A universal filtering hook for arrays of objects
 *
 * @param {Array} data - The data array to filter
 * @param {Object} options
 * @param {Object} options.filters - Key-value pairs for filtering (e.g., { status: 'active' })
 * @param {string} options.searchTerm - Global search term
 * @param {Array} options.searchFields - Keys to search in (e.g., ['name', 'email'])
 * @param {Function} options.customFilter - Optional custom filter callback (item => boolean)
 */
export function useFilteredData({
  data = [],
  filters = {},
  searchTerm = "",
  searchFields = [],
  customFilter,
}) {
  return useMemo(() => {
    let result = [...data];

    // 🔹 Apply filters
Object.entries(filters).forEach(([key, value]) => {
  if (value && value !== "All") {
    result = result.filter(
      (item) => String(item[key]).toLowerCase() === String(value).toLowerCase()
    );
  }
});

    // 🔹 Apply search across multiple fields
    if (searchTerm.trim() && searchFields.length > 0) {
      const search = searchTerm.toLowerCase();
      result = result.filter((item) =>
        searchFields.some((field) =>
          String(item[field] ?? "")
            .toLowerCase()
            .includes(search)
        )
      );
    }

    // 🔹 Apply custom filter callback
    if (typeof customFilter === "function") {
      result = result.filter(customFilter);
    }

    return result;
  }, [data, filters, searchTerm, searchFields, customFilter]);
}
