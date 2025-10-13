import api from ".";

export const getTodos = async () => {
  const res = await api.get("/todo");
  return res.data;
};

export const addTodos = async (todoData) => {
  const res = await api.post("/todo", todoData);
  return res.data;
};

export const updateTodos = async ({id , ...todoData}) => {
  const res = await api.put(`/todo/${id}`, todoData);
  return res.data;
};
export const deleteTodos = async ({id}) => {
  const res = await api.delete(`/todo/${id}`);
  return res.data;
};