import { ProductSchema } from "../helpers/validations";

export const addProduct = async ({
  title,
  price,
  description,
  image,
  category,
}: ProductSchema) => {
  const response = await fetch("https://fakestoreapi.com/products", {
    method: "POST",
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
