export const getProducts = async (limit: number) => {
  const response = await fetch(
    `https://fakestoreapi.com/products?limit=${limit}`
  );

  return response.json();
};

export const getProduct = async (id: number) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);

  return response.json();
};

export const getUsers = async () => {
  const response = await fetch(`http://localhost:5000/`);

  return response.json();
};
