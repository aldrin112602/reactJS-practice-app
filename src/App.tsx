import { useReducer } from "react";

const initialTodos = {
  todos: [
    {
      text: "Lorem ipsum dolor sit amet",
      id: Math.floor(Math.random() * 999999),
      done: false,
    },
  ],
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "add_todo":
      break;
    case "delete_todo":
      break;
    case "edit_todo":
      break;
    default:
      throw Error("Invalid action type: " + action.type);
  }
};


const App = () => {
  const [todos, dispatch] = useReducer(reducer, initialTodos);

  const addTodo = (token: any) => {
    dispatch(token)
  };

  const deleteTodo = () => {
    
  };

  const editTodo = () => {};
  return (
    <>
      <h1>Todo App</h1>
      <div>
        {todos.todos.map((todo: any) => {
          const { text, id, done } = todo;
          return (
            <div className="row" key={id}>
              <div className="col">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={done ? true : false}
                  />
                  <label className="form-check-label">{text}</label>
                </div>
              </div>
              <div className="col d-flex align-items-center justify-content-end">
                <button
                  onClick={editTodo}
                  className="btn btn-primary text-white"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  onClick={deleteTodo}
                  className="btn btn-primary text-white"
                >
                  <i className="fas fa-remove"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
