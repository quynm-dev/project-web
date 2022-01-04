const rootReducer = (state, action = {}) => {
  switch (action.type) {
    case 'addToShoppingCart':
      return {
        ...state,
        shoppingCart: [...state.shoppingCart, action.payload],
      };

    case 'removeFromShoppingCart':
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter((shoppingCartItem) => {
          return shoppingCartItem.productId !== action.payload;
        }),
      };

    case 'editCartItem': {
      return {
        ...state,
        shoppingCart: state.shoppingCart.map((shoppingCartItem) => {
          if (shoppingCartItem.productId === action.payload.productId) {
            return action.payload;
          }
          return shoppingCartItem;
        }),
      };
    }

    case 'payment': {
      return {
        ...state,
        shoppingCart: [],
      };
    }

    case 'login':
      return {
        ...state,
        user: {
          token: action.payload.token,
          id: action.payload.userId,
          role: action.payload.userRole,
        },
      };

    case 'removeAllFromShoppingCart':
      return {
        ...state,
        shoppingCart: [],
      };

    default:
      return state;
  }
};

export default rootReducer;
