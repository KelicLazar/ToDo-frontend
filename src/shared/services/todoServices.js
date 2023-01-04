export const getTodos = async (userId) => {
  console.log("sending getTodos request");
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}todos/get/${userId}`,
      {
        method: "GET",
      }
    );
    const responseData = await response.json();
    if (responseData.message) {
      throw responseData.message;
    }
    return { todos: responseData, ok: true };
  } catch (error) {
    return error;
  }
};

export const addTodo = async (text, userId, isChecked = false) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "todos/create",
      {
        method: "POST",
        body: JSON.stringify({
          text: text,
          isChecked: isChecked,
          userId: userId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();
    if (responseData.ok) {
      return getTodos(userId);
    }
  } catch (error) {
    return error;
  }
};

export const checkTodo = async (todoId, userId) => {
  try {
    await fetch(process.env.REACT_APP_BACKEND_URL + "todos/check", {
      method: "PATCH",
      body: JSON.stringify({ todoId: todoId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return getTodos(userId);
  } catch (error) {
    return error;
  }
};

export const deleteTodo = async (todoId, userId) => {
  try {
    await fetch(process.env.REACT_APP_BACKEND_URL + "todos/delete", {
      method: "DELETE",
      body: JSON.stringify({
        todoId,
        userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return getTodos(userId);
  } catch (error) {
    return error;
  }
};
