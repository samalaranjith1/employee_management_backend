"use client";
import { useDepartmentsList } from "@/services/department-service";
import { useItemList } from "@/services/item-service";
import { useSuppliersList } from "@/services/supplier-service";
import { useMasterProductsList } from "@/services/master-product-service";
import { useProductsList } from "@/services/product-service";
import { useItemsCategories } from "@/services/item-service";

export function useOrgFilters() {
  // ✅ Departments
  const { data: departmentsData, isLoading: isDeptLoading } =
    useDepartmentsList({ outlet: 1, userId: 7 });

  // ✅ Items
  const { data: itemsData, isLoading: isItemsLoading } = useItemList({
    outlet: 1,
    userId: 7,
  });

  // ✅ Suppliers
  const { data: suppliersData, isLoading: isSuppliersLoading } =
    useSuppliersList({ outlet: 1, userId: 7 });

  // ✅ Master Products
  const { data: masterProductsData, isLoading: isMasterProductsLoading } =
    useMasterProductsList({ outlet: 1, userId: 7 });

  // ✅ Products
  const { data: productsData, isLoading: isProductsLoading } = useProductsList({
    outlet: 1,
    userId: 7,
  });

  // ✅ Item Categories
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useItemsCategories({ outlet: 1, userId: 7 });

  // 🔹 Normalize responses → dropdown options
  const departmentOptions =
    departmentsData?.list?.map((dept) => ({
      value: dept.id,
      label: dept.name,
    })) || [];

  const itemOptions =
    itemsData?.list?.map((item) => ({
      value: item.id,
      label: item.name,
    })) || [];

  const supplierOptions =
    suppliersData?.list?.map((supplier) => ({
      value: supplier.id,
      label: supplier.name,
    })) || [];

  const masterProductOptions =
    masterProductsData?.list?.map((mp) => ({
      value: mp.id,
      label: mp.name,
    })) || [];

  const productOptions =
    productsData?.list?.map((prod) => ({
      value: prod.id,
      label: prod.name,
    })) || [];

  const categoryOptions =
    categoriesData?.list?.map((cat) => ({
      value: cat.id,
      label: cat.name,
    })) || [];

  return {
    // loading states
    isDeptLoading,
    isItemsLoading,
    isSuppliersLoading,
    isMasterProductsLoading,
    isProductsLoading,
    isCategoriesLoading,

    // options
    departmentOptions,
    itemOptions,
    supplierOptions,
    masterProductOptions,
    productOptions,
    categoryOptions,
  };
}
