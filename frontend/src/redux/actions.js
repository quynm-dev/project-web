export const addToShoppingCart = (productId) => {
  return {
    type: 'addToShoppingCart',
    payload: productId,
  };
};

export const removeFromShoppingCart = (productId) => {
  return {
    type: 'removeFromShoppingCart',
    payload: productId,
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
