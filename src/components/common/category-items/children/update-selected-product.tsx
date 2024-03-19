/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useContext, useEffect } from 'react';
import merge from 'lodash/merge';
import { ProductContext } from '../product-context';

const UpdateSelectedProduct = (props) => {
  const { selectedValue } = props;
  const { setSelectedProductValues } = useContext(ProductContext);

  useEffect(() => {
    if (selectedValue) {
      // @ts-ignore
      setSelectedProductValues((prev) => {
        if (prev) {
          return new Map(Object.entries(merge({}, Object.fromEntries(prev), Object.fromEntries(selectedValue))));
        }
        return new Map(selectedValue);
      });
    }
  }, [selectedValue, setSelectedProductValues]);
  return null;
};

export default UpdateSelectedProduct;
