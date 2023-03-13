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
      return {
        todos: [
          ...state.todos,
          {
            text: action.payload.text,
            id: Math.floor(Math.random() * 999999),
            done: false,
          },
        ],
      };
    case "delete_todo":
      return {
        todos: state.todos.filter((todo: any) => todo.id !== action.payload.id),
      };
    case "edit_todo":
      return {
        todos: state.todos.map((todo: any) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              text: action.payload.text,
            };
          }
          return todo;
        }),
      };
    default:
      throw Error("Invalid action type: " + action.type);
  }
};



const App = () => {
  const [todos, dispatch] = useReducer(reducer, initialTodos);

  const addTodo = (token: any) => {
    dispatch(token);
  };

  const deleteTodo = (token: any) => {
     dispatch(token);
  };

  const editTodo = (token: any) => {
     dispatch(token);
  };
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
