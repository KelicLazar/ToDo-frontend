import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { checkTodo, deleteTodo } from "../services/todoServices";
import "./TodoItem.css";

const TodoItem = (props) => {
  const authCtx = useContext(AuthContext);

  const handleChecked = async () => {
    const todos = await checkTodo(props.id, authCtx.user.id);
    await props.onCheck(todos);
  };
  const deleteTodoHandler = async () => {
    const todos = await deleteTodo(props.id, authCtx.user.id);
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
