import { useState, useContext, useEffect } from "react";
import ErrorModal from "../shared/components/ErrorModal";
import NewTodo from "../shared/components/NewTodo";
import TodoItem from "../shared/components/TodoItem";
import { AuthContext } from "../shared/context/auth-context";
import { getTodos } from "../shared/services/todoServices";
import "./Todos.css";

const Todos = () => {
  const authCtx = useContext(AuthContext);
  const userId = authCtx?.user?.id;
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  const getNewestTodos = (tds) => {
    if (tds.ok) {
      setTodos(tds.todos);
    } else {
      console.log(tds, "this is error");
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      getNewestTodos(await getTodos(userId));
    };
    if (userId) {
      fetchTodos();
    }
  }, [userId]);

  return (
    <div className="todos">
      <ErrorModal
        error={error}
        onClear={() => {
          setError(null);
        }}
      />
      <h2> ToDo list</h2>
      {error}
      <NewTodo onAdd={getNewestTodos} />
      <ul>
        {todos?.map((td) => {
          return (
            <li key={td._id}>
              <TodoItem
                id={td._id}
                onCheck={getNewestTodos}
                onDelete={getNewestTodos}
                text={td.text}
                isChecked={td.isChecked}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todos;
