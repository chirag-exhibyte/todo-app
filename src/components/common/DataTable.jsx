import {
  Box,
  Button,
  ButtonGroup,
  Group,
  Heading,
  HStack,
  IconButton,
  Pagination,
  Table,
  Text,
} from "@chakra-ui/react";
import {
  IconChevronCompactLeft,
  IconChevronCompactRight,
} from "@tabler/icons-react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { memo, useState, useEffect } from "react";
import { useColorModeValue } from "../ui/color-mode";

const DataTable = ({ columns, data, isLoading, pageSize = 5 }) => {
  const [pageIndex, setPageIndex] = useState(0);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageSize,
        pageIndex,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newState = updater({ pageIndex, pageSize });
        setPageIndex(newState.pageIndex);
      }
    },
    manualPagination: false,
  });

  // Handle edge case when current page becomes invalid
  useEffect(() => {
    const maxPage = Math.ceil(data.length / pageSize) - 1;
    if (pageIndex > maxPage && maxPage >= 0) {
      setPageIndex(maxPage);
    }
  }, [data.length, pageSize, pageIndex]);

  return (
    <>
    <Group attached display={"flex"} alignItems={"start"} rounded={"md"} flexDirection={"column"} >
      <Box p={3}>
        <Heading fontWeight={"Bold"} textAlign={"start"}>User Information</Heading>
      </Box>
      <Table.Root m={0} variant={"outline"} >
        <Table.Header bg="green.100">
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

      <Pagination.Root siblingCount={0} p={2} count={data.length || 0} pageSize={pageSize}  page={pageIndex + 1}>
        <ButtonGroup variant="ghost" size="sm">
          <Pagination.PrevTrigger asChild onClick={table.previousPage}>
            <IconButton>
              <IconChevronCompactLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton
                onClick={() => setPageIndex(Number(page.value - 1))}
                variant={{ base: "ghost", _selected: "outline" }}
              >
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild onClick={table.nextPage}>
            <IconButton>
              <IconChevronCompactRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Group>
    </>
  );
};

export default memo(DataTable);
