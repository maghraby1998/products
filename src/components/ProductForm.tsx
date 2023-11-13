import React, { BaseSyntheticEvent } from "react";
import { Dialog } from "primereact/dialog";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ProductSchema } from "../helpers/validations";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  handleFormSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  register: UseFormRegister<ProductSchema>;
  errors: FieldErrors<ProductSchema>;
  isLoading: boolean;
}

const ProductForm: React.FC<Props> = ({
  isOpen,
  handleClose,
  handleFormSubmit,
  register,
  isLoading,
  errors,
}) => {
  return (
    <Dialog
      header="New Product"
      visible={isOpen}
      style={{ width: "50vw" }}
      onHide={handleClose}
      className="product-form-dialog"
      headerStyle={{
        backgroundColor: "#555",
        height: 20,
        color: "#fff",
        fontSize: 5,
      }}
    >
      <form
        className="flex flex-col items-center gap-2 justify-center mt-5"
        onSubmit={handleFormSubmit}
      >
        <div>
          <input
            id="title"
            type="text"
            placeholder="Title..."
            className={`input-style ${
              !!errors.title ? "invalid-input-style" : ""
            }`}
            {...register("title")}
          />
          {!!errors.title && (
            <p className="error-message-style">{errors.title.message}</p>
          )}
        </div>

        <div>
          <input
            id="price"
            type="text"
            placeholder="Price..."
            className={`input-style ${
              !!errors.price ? "invalid-input-style" : ""
            }`}
            {...register("price")}
          />
          {!!errors.price && (
            <p className="error-message-style">{errors.price.message}</p>
          )}
        </div>

        <div>
          <input
            id="description"
            type="text"
            placeholder="Description..."
            className={`input-style ${
              !!errors.description ? "invalid-input-style" : ""
            }`}
            {...register("description")}
          />
          {!!errors.description && (
            <p className="error-message-style">{errors.description.message}</p>
          )}
        </div>

        <div>
          <input
            id="category"
            type="text"
            placeholder="Category..."
            className={`input-style ${
              !!errors.category ? "invalid-input-style" : ""
            }`}
            {...register("category")}
          />
          {!!errors.category && (
            <p className="error-message-style">{errors.category.message}</p>
          )}
        </div>

        <div>
          <input
            id="image"
            type="file"
            className={`input-style ${
              !!errors.image ? "invalid-input-style" : ""
            }`}
            {...register("image")}
          />
          {!!errors.image && (
            <p className="error-message-style">
              {errors.image.message?.toString()}
            </p>
          )}
        </div>

        {/* image */}
        {/* <input
        id="title"
        type="text"
        placeholder="Title..."
        className={`input-style ${!!errors.title ? "invalid-input-style" : ""}`}
        {...register("title")}
    /> */}

        <button
          type="submit"
          className="bg-slate-500 py-1 min-w-[100px] min-h-[30px] text-white capitalize rounded mx-auto block flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? <i className="pi pi-spinner pi-spin" /> : "save"}
        </button>
      </form>
    </Dialog>
  );
};

export default ProductForm;
