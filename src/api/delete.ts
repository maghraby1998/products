import { ProductSchema } from "../helpers/validations";

export const deleteProduct = async (id: number) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
