import { useDialog } from "@/context/DialogContext";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Group,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment/moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "../../components/common/DataTable";
import { deleteTodos, getTodos } from "../../services/todo.service";
import HomeDialog from "./HomeDialog";
import AlertDialog from "@/components/common/AlertDialog";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchParams } from "react-router";
import toast from "react-hot-toast";

const HOME_DIALOG = "HOME_DIALOG";

const Home = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [data, setData] = useState([]);
  const debouncedSearch = useDebounce(query, 500);

  const { openDialog, closeDialog } = useDialog();
  const {
    data: todos,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    refetchOnWindowFocus: false,
  });

  const { mutate: deleteTodo, isPending } = useMutation({
    mutationFn: deleteTodos,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      closeDialog();
      toast.success("Todo deleted successfully");
    },
  });

  useEffect(() => {
    if (todos) {
      if (debouncedSearch) {
        const filteredData = todos.filter((item) =>
          `${item.name} ${item.todo}`
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase())
        );
        setData(filteredData);
        return;
      }
      setData(todos);
    }
  }, [todos, debouncedSearch]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Profile",
        accessorKey: "avatar",
        cell: ({ getValue, row }) => {
          return (
            <>
              <Avatar.Root shape="rounded" size="md">
                <Avatar.Fallback name={row?.original?.name} />
                <Avatar.Image src={getValue()} />
              </Avatar.Root>
            </>
          );
        },
      },
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Task",
        accessorKey: "todo",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ getValue }) =>
          getValue() ? (
            <Badge colorPalette="green" size={"md"}>
              Done
            </Badge>
          ) : (
            <Badge colorPalette={"red"} size={"md"} variant={"surface"}>
              Pending
            </Badge>
          ),
      },
      {
        header: "Created At",
        accessorKey: "createdAt",
        cell: ({ getValue }) => {
          return moment(getValue()).format("MMMM Do YYYY, h:mm:ss a");
        },
      },
      {
        header: "Actions",
        cell: ({ row }) => {
          const data = row.original;
          return (
            <>
              <Group>
                <IconButton
                  onClick={() => {
                    openDialog(HOME_DIALOG, data);
                  }}
                  size={"md"}
                  variant={"subtle"}
                  aria-label="Edit"
                >
                  <IconEdit />
                </IconButton>
                <IconButton
                  bg={"red.200"}
                  size={"md"}
                  variant={"subtle"}
                  aria-label="Delete"
                  onClick={() => {
                    openDialog("ALERT_DIALOG", data);
                  }}
                >
                  <IconTrash />
                </IconButton>
              </Group>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <Container p={0} display={"flex"} justifyContent={"end"} gap={2}>
        <Box display={"flex"} justifyContent={"end"} mt={2} gap={2} w={"1/2"}>
          <Input
            size={"md"}
            name="name"
            placeholder="Search here..."
            w={"1/2"}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value === "") {
                setSearchParams({});
              } else {
                setSearchParams({ query: e.target.value });
              }
            }}
            value={query}
          />
          <Button
            color={"black"}
            fontWeight={"bold"}
            size="md"
            variant={"outline"}
            border={"2px solid"}
            rounded="md"
            px={4}
            py={2}
            _hover={{ bg: "green.600", color: "white" }}
            onClick={() => openDialog(HOME_DIALOG)}
          >
            Add Todo
          </Button>
        </Box>
      </Container>
      <Container mt={4} boxShadow={"md"} rounded={"md"} p={0}  mb={"5"}>
        <DataTable data={data} columns={columns} isLoading={isFetching} />
      </Container>

      <HomeDialog type={HOME_DIALOG} />
      <AlertDialog
        title={"Are you sure?"}
        content={
          "This action cannot be undone. This will permanently delete your account and remove your data from our systems."
        }
        onAction={(payload) => {
          deleteTodo(payload);
        }}
        closeText={"Cancel"}
        actionText={"Delete"}
        isLoading={isPending}
      />
    </>
  );
};

export default Home;
