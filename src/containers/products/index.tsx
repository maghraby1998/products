import { useEffect, useState } from "react";
import { getProducts } from "../../api/getRequests";
import DataTable from "../../components/DataTable";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";

const limitBy = 5;

const Products = () => {
  const [search, setSearch] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const limit = searchParams.get("limit");

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
        return <div>edit,delete</div>;
      },
    },
  ];

  const {
    isLoading: productsLoading,
    error,
    data,
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

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="mb-3 border outline-none p-2 rounded w-full"
      />

      <DataTable
        columns={columns}
        data={data ?? []}
        isLoading={productsLoading}
      />

      <div className="flex items-center justify-center gap-3 my-3">
        {[...new Array(8)].map((_, index) => (
          <button
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
    </div>
  );
};

export default Products;
