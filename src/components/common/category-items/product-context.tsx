import React, { createContext, useCallback, useMemo, useState } from 'react';

export interface ProductContextType {
  selectedCategoryId?: number | string;
  selectedProducts?: Map<string, any>;
  updateSelectedCategoryId?: (categoryId: number | string) => void;
  setSelectedProducts?: (product: any, value: any) => void;
  setSelectedProductValues?: (value: Map<string, any>) => void;
}

const ProductContext = createContext<ProductContextType>({});

const ProductProvider = (props) => {
  const { initSelectedValue, children } = props;
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [selectedProducts, setSelectedProductValues] = useState<Map<string, any>>(initSelectedValue);

  const updateSelectedCategoryId = useCallback((categoryId) => {
    setSelectedCategoryId(categoryId);
  }, []);

  const setSelectedProducts = useCallback((productItem, value) => {
    const { categoryId, id } = productItem || {};
    if (!categoryId || !id) {
      return;
    }
    const selectItemKey = `${categoryId}-${id}`;
    let selectCount;
    let selectedValue;
    if (typeof value === 'number') {
      selectCount = value;
    } else if (typeof value === 'object') {
      selectCount = value.quantity;
      selectedValue = value;
    }
    setSelectedProductValues((prev) =>
      new Map(prev).set(selectItemKey, { ...productItem, selectCount, selectedValue })
    );
  }, []);

  const providerValue = useMemo(
    () => ({
      selectedCategoryId,
      selectedProducts,
      updateSelectedCategoryId,
      setSelectedProducts,
      setSelectedProductValues,
    }),
    [setSelectedProducts, selectedCategoryId, selectedProducts, updateSelectedCategoryId]
  );

  return <ProductContext.Provider value={providerValue}>{children}</ProductContext.Provider>;
};

export { ProductContext, ProductProvider };
