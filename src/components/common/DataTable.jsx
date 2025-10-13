import { Table } from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { memo } from "react";

const DataTable = ({ columns, data, isLoading }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
    
  },

  });


  return (
    <>
    <Table.Root m={0} variant={"outline"} rounded={"md"}>
      <Table.Header bg="green.100" >
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Row key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Table.ColumnHeader key={header.id} fontWeight={"bold"}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body>
        {isLoading ? (
          <Table.Row>
            <Table.Cell
              colSpan={table.getAllColumns().length}
              textAlign="center"
              p={4}
              fontWeight="bold"
              fontSize={"md"}
            >
              Loading...
            </Table.Cell>
          </Table.Row>
        ) : data.length === 0 ? (
          <Table.Row>
            <Table.Cell
              colSpan={table.getAllColumns().length}
              textAlign="center"
              p={4}
              fontWeight="bold"
              fontSize={"md"}
            >
              No data available
            </Table.Cell>
          </Table.Row>
        ) : (
          table.getRowModel().rows.map((row) => (
            <Table.Row key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Cell key={cell.id} fontWeight={"medium"}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table.Root>

   
    </>
  );
};

export default memo(DataTable);
