import { ProductSchema } from "../helpers/validations";

export const updateProduct = async ({
  id,
  title,
  price,
  description,
  image,
  category,
}: ProductSchema) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      price: parseFloat(price),
      description,
      image,
      category,
    }),
  });
  return response.json();
};
