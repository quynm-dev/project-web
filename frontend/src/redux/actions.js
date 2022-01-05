export const addToShoppingCart = (productId, quantity = 1, size = 38) => {
  return {
    type: 'addToShoppingCart',
    payload: { productId, quantity, size },
  };
};

export const removeFromShoppingCart = (productId, size) => {
  return {
    type: 'removeFromShoppingCart',
    payload: { productId, size },
  };
};

export const editCartItem = (productId, size, quantity) => {
  return {
    type: 'editCartItem',
    payload: { productId, size, quantity },
  };
};

export const payment = () => {
  return {
    type: 'payment',
    payload: {},
  };
};

export const login = (token, userId, userRole) => {
  return {
    type: 'login',
    payload: {
      token,
      userId,
      userRole,
    },
  };
};

export const removeAllFromShoppingCart = () => {
  return {
    type: 'removeAllFromShoppingCart',
    payload: {},
  };
};
