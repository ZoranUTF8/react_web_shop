import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";

import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

import { useProductsContext } from "./products_context";

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    //? when te products change we get them and send to the filter reducer
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    // ? when produts and sort and filters change than run sort products
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };
  //? update sort when the select value changes
  const updateSort = (evt) => {
    const value = evt.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };
  //? When filters change we invoke it
  const updateFilters = (evt) => {
    let name = evt.target.name;
    let value = evt.target.value;

    //? Get the category from the button pressed
    if (name === "category") {
      value = evt.target.textContent;
    }

    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };
  //? Sets back filters to defaults
  const clearFilters = () => {};
  //! main return
  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
