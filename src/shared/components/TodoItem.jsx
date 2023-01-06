import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { checkTodo, deleteTodo } from "../services/todoServices";
import "./TodoItem.css";

const TodoItem = (props) => {
  const authCtx = useContext(AuthContext);

  const handleChecked = async () => {
    const userId = authCtx?.user?.id;
    const todoId = props.id;
    const todos = await checkTodo(todoId, userId);

    props.onCheck(todos);
  };
  const deleteTodoHandler = async () => {
    const userId = authCtx?.user?.id;
    const todoId = props.id;
    const todos = await deleteTodo(todoId, userId);

    props.onDelete(todos);
  };
  return (
    <div className="todoItem">
      <p
        onClick={handleChecked}
        className={`text ${props.isChecked ? "checked" : null}`}
      >
        {props.isChecked}
        {props.text}
      </p>

      <button onClick={deleteTodoHandler}>Delete</button>
    </div>
  );
};

export default TodoItem;
