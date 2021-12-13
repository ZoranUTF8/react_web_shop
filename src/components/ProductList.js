import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filtered_products, grid_view } = useFilterContext();

  if (filtered_products < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Žao nam je, nijedan proizvod ne odgovara vašoj pretrazi
      </h5>
    );
  }
  else if(!grid_view){
    return <ListView filtered_products={filtered_products} />
  }

  return <GridView products={filtered_products}>product list</GridView>;
};

export default ProductList;
