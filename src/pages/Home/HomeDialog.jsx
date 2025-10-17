import { useDialog } from "@/context/DialogContext";
import { addTodos, updateTodos } from "@/services/todo.service";
import {
  Button,
  Dialog,
  Field,
  Input,
  NativeSelect,
  Portal,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";
// This is Main Branch
const HomeDialog = ({ type: modelType }) => {
  const { type, payload, closeDialog } = useDialog();
  const queryClient = useQueryClient();

  const { mutate: addTodo, ...addTodoState } = useMutation({
    mutationFn: addTodos,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      closeDialog();
      handleReset();
      toast.success("Todo added successfully");
    },
  });
  const { mutate: updateTodo, ...updateTodoState } = useMutation({
    mutationFn: updateTodos,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      closeDialog();
      handleReset();
      toast.success("Todo updated successfully");
    },
  });

  const isPending = addTodoState.isPending || updateTodoState.isPending;

  const {
    values,
    setValues,
    errors,
    handleSubmit,
    touched,
    handleChange,
    handleBlur,
    handleReset,
  } = useFormik({
    initialValues: { name: "", todo: "", status: null },
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      todo: yup.string().required("Task is required"),
    }),
    onSubmit: (values) => {
      if (payload) {
        updateTodo({ ...values, id: payload.id , status: values.status === "false" ? false : true });
        return;
      } else {
        addTodo(values);
        return;
      }
    },
  });

  useEffect(() => {
    if (payload) {
      setValues({ name: payload?.name, todo: payload?.todo , status: payload.status ? true : false });
    }
  }, [payload]);
  return (
    <>
      <Dialog.Root
        lazyMount
        open={modelType === type}
        onExitComplete={handleReset}
        preventScroll
        trapFocus={false}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Add Todo</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Stack gap={2}>
                  <Field.Root
                    invalid={errors.name && touched.name ? true : false}
                  >
                    <Field.Label>Enter Name</Field.Label>
                    <Input
                      size={"sm"}
                      name="name"
                      placeholder="John duo"
                      onChange={handleChange}
                      value={values.name}
                      onBlur={handleBlur}
                    />
                    <Field.ErrorText>{errors.name}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root
                    invalid={errors.todo && touched.todo ? true : false}
                  >
                    <Field.Label>Enter Task</Field.Label>
                    <Input
                      size={"sm"}
                      name="todo"
                      placeholder="Learn React"
                      onChange={handleChange}
                      value={values.todo}
                      onBlur={handleBlur}
                    />
                    <Field.ErrorText>{errors.todo}</Field.ErrorText>
                  </Field.Root>
                  {
                    payload && (

                  <Field.Root
                    invalid={errors.status && touched.status ? true : false}
                  >
                    <Field.Label>Change Status</Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field
                        name="status"
                        onChange={handleChange}
                        value={values.status}
                        onBlur={handleBlur}
                      >
                        <option value={false}>Pending</option>
                        <option value={true}>Done</option>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                    <Field.ErrorText>{errors.status}</Field.ErrorText>
                  </Field.Root>
                    )
                  }
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button
                    disabled={isPending}
                    variant="outline"
                    onClick={closeDialog}
                  >
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>
                <Button
                  disabled={isPending}
                  loading={isPending}
                  loadingText={"Loading..."}
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default HomeDialog;
