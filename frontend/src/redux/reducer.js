const initialState = {
  shoppingCart: [],
  user: {
    id: 0,
    token: '',
    role: 'user',
  },
};

const rootReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'addToCart':
      return {
        ...state,
        shoppingCart: state.shoppingCart
          ? [...state.shoppingCart, action.payload]
          : [action.payload],
      };
    case 'removeFromCart':
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter((productId) => {
          return productId !== action.payload;
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

    default:
      return state;
  }
};

export default rootReducer;
