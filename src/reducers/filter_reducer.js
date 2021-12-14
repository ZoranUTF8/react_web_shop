import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {

  switch (action.type) {

    case LOAD_PRODUCTS: {
      return {
        ...state,
        all_products: [...action.payload], // copy the values instead the memory location using the ...
        filtered_products: [...action.payload]
      }
    }

    case SET_GRIDVIEW: {
      return {
        ...state,
        grid_view: true
      }
    }

    case SET_LISTVIEW: {
      return {
        ...state,
        grid_view: false
      }

    }

    case UPDATE_SORT: {
      return {
        ...state,
        sort: action.payload
      }
    }

    case SORT_PRODUCTS: {
      const {
        sort,
        filtered_products
      } = state;

      let tempProducts = [...filtered_products];

      switch (sort) {
        case "price-lowest":
          tempProducts = tempProducts.sort((curr, next) => curr.price - next.price)
          break;
        case "price-highest":
          tempProducts = tempProducts.sort((curr, next) => next.price - curr.price)
          break;
        case "name-a":
          tempProducts = tempProducts.sort((curr, next) => {
            return curr.name.localeCompare(next.name);
          })
          break;
        case "name-z":
          tempProducts = tempProducts.sort((curr, next) => {
            return next.name.localeCompare(curr.name);
          })
          break;

        default:
          console.log("No such option. filter reducer line 69");
          break;
      }

      return {
        ...state,
        filtered_products: tempProducts
      }
    }

    default:
      throw new Error(`Error in filter reducer line 22.`);

  }
}

export default filter_reducer