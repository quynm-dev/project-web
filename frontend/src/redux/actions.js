export const addToShoppingCart = (productId, quantity, size, pricing) => {
  return {
    type: 'addToShoppingCart',
    payload: { productId, quantity, size, pricing },
  };
};

export const removeFromShoppingCart = (productId, size) => {
  return {
    type: 'removeFromShoppingCart',
    payload: { productId, size },
  };
};

export const editCartItemSize = (
  productId,
  size,
  quantity,
  previousSize,
  pricing,
) => {
  return {
    type: 'editCartItemSize',
    payload: {
      productId,
      size,
      quantity,
      previousSize,
      pricing,
    },
  };
};

export const editCartItemQuantity = (productId, size, quantity, pricing) => {
  return {
    type: 'editCartItemQuantity',
    payload: {
      productId,
      size,
      quantity,
      pricing,
    },
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
