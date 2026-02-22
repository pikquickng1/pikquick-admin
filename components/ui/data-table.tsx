import { ReactNode } from "react";

interface Column<T> {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  selectable?: boolean;
  selectedRows?: string[];
  onRowSelect?: (id: string) => void;
  onSelectAll?: () => void;
  emptyMessage?: string;
  filters?: ReactNode;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  selectable = false,
  selectedRows = [],
  onRowSelect,
  onSelectAll,
  emptyMessage = "No data available",
  filters,
}: DataTableProps<T>) {
  const allSelected = selectable && selectedRows.length === data.length && data.length > 0;

  return (
    <div className="bg-white border border-neutral-200 overflow-hidden">
      {filters && (
        <div className="p-6 border-b border-neutral-200">
          {filters}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200">
              {selectable && (
                <th className="text-left p-4 w-12">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={onSelectAll}
                    className="w-4 h-4 rounded border-neutral-300"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="text-left p-4 text-sm font-medium text-text-primary"
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="p-8 text-center text-sm text-neutral-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item) => {
                const key = keyExtractor(item);
                const isSelected = selectedRows.includes(key);

                return (
                  <tr
                    key={key}
                    className="border-b border-neutral-200 last:border-b-0 hover:bg-neutral-50 transition-colors"
                  >
                    {selectable && (
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onRowSelect?.(key)}
                          className="w-4 h-4 rounded border-neutral-300"
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td key={column.key} className="p-4">
                        {column.render(item)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
