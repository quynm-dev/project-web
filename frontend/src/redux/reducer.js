const rootReducer = (state, action = {}) => {
  switch (action.type) {
    case 'addToShoppingCart': {
      let checkAddedKey = 0;

      const shoppingCart = state.shoppingCart.map((shoppingCartItem) => {
        if (
          shoppingCartItem.productId === action.payload.productId &&
          shoppingCartItem.size === action.payload.size
        ) {
          checkAddedKey = 1;

          return {
            ...shoppingCartItem,
            quantity: shoppingCartItem.quantity + action.payload.quantity,
          };
        }

        return shoppingCartItem;
      });

      if (checkAddedKey) {
        return {
          ...state,
          shoppingCart: shoppingCart,
        };
      }
      return {
        ...state,
        shoppingCart: [...state.shoppingCart, action.payload],
      };
    }

    case 'removeFromShoppingCart':
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter((shoppingCartItem) => {
          return (
            shoppingCartItem.productId !== action.payload.productId ||
            shoppingCartItem.size !== action.payload.size
          );
        }),
      };

    case 'editCartItem': {
      return {
        ...state,
        shoppingCart: state.shoppingCart.map((shoppingCartItem) => {
          if (
            shoppingCartItem.productId === action.payload.productId &&
            shoppingCartItem.size !== action.payload.size
          ) {
            return action.payload;
          }
          if (
            shoppingCartItem.productId === action.payload.productId &&
            shoppingCartItem.size === action.payload.size
          ) {
            return {
              ...shoppingCartItem,
              quantity: shoppingCartItem.quantity + action.payload.quantity,
            };
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
