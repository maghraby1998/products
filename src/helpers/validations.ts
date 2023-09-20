import { z } from "zod";

export const loginInputSchema = z.object({
  username: z.string().min(1, { message: "Username is required!" }),
  password: z.string().min(1, { message: "Password is required!" }),
});

export type LoginInputSchema = z.infer<typeof loginInputSchema>;

export const productSchema = z.object({
  id: z.any(),
  title: z.string().min(1, { message: "This field is required!" }),
  price: z.string().min(1, { message: "This field is required!" }),
  category: z.string().min(1, { message: "This field is required!" }),
  description: z.string().min(1, { message: "This field is required!" }),
  image: z.any().refine((val) => val.length > 0, "Image is required"),
});

export type ProductSchema = z.infer<typeof productSchema>;
