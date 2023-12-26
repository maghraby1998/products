import axios from "axios";
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

export const addUser = async (name: string) => {
  return axios.post("http://localhost:5000/", {
    name,
  });
};

export const deleteUser = async (userId: number) => {
  return axios.delete(`http://localhost:5000/delete/${userId}`);
};
