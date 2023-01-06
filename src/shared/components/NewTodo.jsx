import { useContext, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { addTodo } from "../services/todoServices";
import "./Newtodo.css";

const NewTodo = (props) => {
  const [text, setText] = useState("");
  const authCtx = useContext(AuthContext);

  const addTodoHandler = async (event) => {
    event.preventDefault();
    const userId = authCtx?.user?.id;

    const todos = await addTodo(text, userId);
    console.log("todos from addTodoHandler", todos);

    props.onAdd(todos);
  };
  return (
    <div>
      <form onSubmit={addTodoHandler} className="todo-form">
        <label htmlFor="todo">Add ToDo</label>
        <input
          onChange={(event) => {
            setText(event.target.value);
          }}
          id="todo"
          placeholder="Add ToDo"
          type="text"
        />
        <button disabled={!text} type="submit">
          + Add
        </button>
      </form>
    </div>
  );
};

export default NewTodo;
