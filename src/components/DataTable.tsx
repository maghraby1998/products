import { ProgressSpinner } from "primereact/progressspinner";
import React, { ReactNode } from "react";

interface Column {
  name: string;
  selector: string;
  columnClassName?: string;
  renderCell?: (row: any) => ReactNode;
}

interface Props {
  columns: Column[];
  data: any[];
  isLoading: boolean;
}

const DataTable: React.FC<Props> = ({ columns, data, isLoading }) => {
  return (
    <div>
      {/* header start */}
      <div className="flex gap-4 items-center justify-between bg-cyan-600 px-2 py-3 rounded mb-3">
        {columns.map((column) => (
          <p className="capitalize flex-1 text-white font-semibold">
            {column.name}
          </p>
        ))}
      </div>
      {/* header end */}

      {isLoading ? (
        <div className="flex items-center justify-center h-[300px]">
          <ProgressSpinner />
        </div>
      ) : (
        data.map((row) => (
          <div className="flex gap-4 items-center justify-between bg-[#eae2e2] p-2 rounded my-2">
            {columns.map((column) => (
              <div className={`flex-1 ${column.columnClassName ?? ""}`}>
                {column.renderCell
                  ? column.renderCell(row)
                  : row[column.selector]}
              </div>
            ))}
          </div>
        ))
      )}
      {/* rows start */}
      {/* rows end */}
    </div>
  );
};

export default DataTable;
