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
        shoppingCart: state.shoppingCart.filter((cartItem) => {
          return cartItem !== action.payload;
        }),
      };

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
