import { useState } from "react";
import { getProduct, getProducts } from "../../api/get";
import DataTable from "../../components/DataTable";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import ProductForm from "../../components/ProductForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema, productSchema } from "../../helpers/validations";
import { useMutation } from "react-query";
import { addProduct } from "../../api/post";
import { updateProduct } from "../../api/put";
import { deleteProduct } from "../../api/delete";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const limitBy = 5;

const Products = () => {
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const limit = searchParams.get("limit");

  const { mutate: attemptAddProduct, isLoading: addProductLoading } =
    useMutation({
      mutationFn: ({
        title,
        category,
        description,
        price,
        image,
      }: ProductSchema) => {
        return addProduct({
          title,
          category,
          description,
          price: price.toString(),
          image,
        });
      },
      onSuccess: (_) => {
        handleClose();
        refetch();
      },
    });

  const { mutate: attemptUpdateProduct, isLoading: updateProductLoading } =
    useMutation({
      mutationFn: ({
        id,
        title,
        category,
        description,
        price,
        image,
      }: ProductSchema) => {
        return updateProduct({
          id,
          title,
          category,
          description,
          price: price.toString(),
          image,
        });
      },
      onSuccess: (_) => {
        handleClose();
        refetch();
      },
    });

  const { mutate: attemptDeleteProduct, isLoading: deleteProductLoading } =
    useMutation({
      mutationFn: (id: number) => {
        setLoadingId(id);
        return deleteProduct(id);
      },
      onSuccess: (_) => {
        setLoadingId(null);
        refetch();
      },
      onError: (_) => {
        setLoadingId(null);
      },
    });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
    reset();
  };

  const handleAddNewProduct = () => {
    setIsModalOpen(true);
  };

  const { register, handleSubmit, formState, setValue, reset } =
    useForm<ProductSchema>({
      resolver: zodResolver(productSchema),
    });

  const onSubmit: SubmitHandler<ProductSchema> = (data) => {
    const { id, title, category, description, price, image } = data;

    if (!id) {
      attemptAddProduct({ title, category, description, price, image });
    } else {
      attemptUpdateProduct({ id, title, category, description, price, image });
    }
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  const { mutate: getProductData, isLoading: getProductDataLoading } =
    useMutation({
      mutationFn: (id: number) => {
        setLoadingId(id);
        return getProduct(id);
      },
      onSuccess: (data: Partial<ProductSchema>) => {
        setLoadingId(null);
        setIsModalOpen(true);
        const { id, category, description, image, price, title } = data;

        setValue("id", id ?? "");
        setValue("title", title ?? "");
        setValue("description", description ?? "");
        setValue("category", category ?? "");
        setValue("price", price?.toString() ?? "0");
        setValue("image", image);
      },
      onError: () => {
        setLoadingId(null);
      },
    });

  const handleEditProduct = (id: number) => {
    console.log("editting", id);
    getProductData(id);
  };

  const handleDeleteProduct = (id: number) => {
    console.log("deleting", id);

    confirmDialog({
      message: "Are you sure you want to delete?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        attemptDeleteProduct(id);
      },
      reject: () => {},
    });
  };

  const columns = [
    {
      name: "",
      selector: "",
      columnClassName: "flex items-center justify-center bg-white rounded p-1",
      renderCell: (row: any) => {
        return <img className="h-[100px] bg-white" src={row?.image} />;
      },
    },
    {
      name: "title",
      selector: "title",
      renderCell: (row: any) => {
        return (
          <p title={row?.title} className="truncate w-[150px]">
            {row?.title}
          </p>
        );
      },
    },
    {
      name: "rating",
      selector: "rating",
      renderCell: (row: any) => {
        return <div>{row?.rating?.rate}</div>;
      },
    },
    { name: "price", selector: "price" },
    { name: "category", selector: "category" },
    {
      name: "description",
      selector: "description",
      renderCell: (row: any) => {
        return (
          <p title={row?.description} className="truncate w-[150px]">
            {row?.description}
          </p>
        );
      },
    },
    {
      name: "",
      selector: "",
      renderCell: (row: any) => {
        return (
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleEditProduct(row?.id)}
              className="bg-slate-500 rounded text-white hover:bg-slate-500/90"
              title="Edit"
              disabled={getProductDataLoading}
            >
              <i
                className={`pi ${
                  getProductDataLoading && loadingId === row?.id
                    ? "pi-spinner pi-spin"
                    : "pi-pencil"
                }`}
                style={{
                  fontSize: "15px",
                  height: 30,
                  width: 30,
                  display: "grid",
                  placeItems: "center",
                }}
              />
            </button>
            <button
              onClick={() => handleDeleteProduct(row?.id)}
              className="bg-red-500 rounded text-white hover:bg-red-500/90"
              title="Delete"
              disabled={deleteProductLoading}
            >
              <i
                className={`pi ${
                  deleteProductLoading && loadingId === row?.id
                    ? "pi-spinner pi-spin"
                    : "pi-trash"
                }`}
                style={{
                  fontSize: "15px",
                  height: 30,
                  width: 30,
                  display: "grid",
                  placeItems: "center",
                }}
              />
            </button>
          </div>
        );
      },
    },
  ];

  const {
    isLoading: productsLoading,
    data,
    refetch,
  } = useQuery({
    queryKey: ["products", search, limit],
    queryFn: async () => {
      return await getProducts(limit ? +limit : 5);
    },
  });

  const handlePageChange = (page: number) => {
    setSearchParams({ limit: `${page * limitBy}` });
  };

  return (
    <div className="page-container">
      <h1 className="page-header">Products</h1>

      <div className="flex items-center justify-between gap-3 h-[40px] mb-3 ">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="border outline-none p-2 rounded w-full"
        />

        <button
          onClick={handleAddNewProduct}
          className="h-[40px] w-[40px] bg-slate-500 rounded text-white text-2xl hover:bg-slate-500/90"
        >
          +
        </button>
      </div>

      <DataTable
        columns={columns}
        data={data ?? []}
        isLoading={productsLoading}
      />

      <div className="flex items-center justify-center gap-3 my-3">
        {[...new Array(8)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`h-[30px] w-[30px] rounded-full ${
              limit && +limit / limitBy === index + 1
                ? "bg-slate-500 text-white"
                : "bg-white border border-slate-500"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <ProductForm
        isOpen={isModalOpen}
        handleClose={handleClose}
        handleFormSubmit={handleFormSubmit}
        register={register}
        errors={formState.errors}
        isLoading={updateProductLoading || addProductLoading}
      />

      <ConfirmDialog />
    </div>
  );
};

export default Products;
