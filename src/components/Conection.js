//GET
export const callTodoList = async () => {
  try {
    const response = await fetch("http://localhost:3000/v1/to-dos");
    const responseJson = await response.json();
    return responseJson.todos;
  } catch (error) {
    console.error(error);
  }
};

//POST

export const createTodo = async (todo) => {
  try {
    const response = await fetch("http://localhost:3000/v1/to-do", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: todo.title,
        description: todo.description,
        isDone: todo.is_done,
      }),
    });
    const responseJson = await response.json();
    console.log(responseJson);
    // return responseJson.todos;
  } catch (error) {
    console.error(error);
  }
};
//PATCH
export const update = async (id, updatedTodo) => {
  try {
    const response = await fetch(`http://localhost:3000/v1/to-do/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: updatedTodo.title,
        description: updatedTodo.description,
        isDone: updatedTodo.is_done,
      }),
    });
    const responseJson = await response.json();
    return responseJson.todos;
  } catch (error) {
    console.log(error);
  }
};

//DELETE
export const eliminate = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/v1/to-do/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return response.status;
  } catch (error) {
    console.log(error);
  }
};
