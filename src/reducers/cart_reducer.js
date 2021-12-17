import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    
    case ADD_TO_CART: {

      const { id, color, amount, product } = action.payload;
      //? check if item is inside the cart already
      const tempItem = state.cart.find((i) => i.id === id + color);

      //? if item inside the cart than change amount
      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {

          if (cartItem.id === id + color) {
            let newAmount = cartItem.amount + amount;
            
            //? if item equal to max stock than just return the max amount
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            return { ...cartItem, amount: newAmount };
          } 
          else 
          {
            return cartItem;
          }
        })
        return { ...state, cart: tempCart };
      } else {
        //? create new item if not inside the cart already
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }
    }

    
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
