export const addToCart = (productId) => {
  return {
    type: 'addToCart',
    payload: productId,
  };
};

export const removeFromCart = (productId) => {
  return {
    type: 'removeFromCart',
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
