import { useReducer, useState, useRef } from "react";

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
    case "toggle_checked":
      return {
        todos: state.todos.map((todo: any) =>
          todo.id == action.id ? { ...todo, done: !todo.done } : todo
        ),
      };
      break;
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
  const [text, setText] = useState("");
  const [updateID, setUpdateID] = useState({});
  const modalElement = useRef();

  const addTodo = () => {
    text.trim().length && dispatch({ type: "add_todo", payload: { text } });
    setText("");
  };

  const deleteTodo = (id: number) => {
    if (confirm("Are you sure to remove that item ?")) {
      dispatch({ type: "delete_todo", payload: { id } });
    }
  };

  const editTodo = (id: number, text: string) => {
    setUpdateID({ id, text });
    // open modal
  };

  return (
    <>
      <h1 className="py-3 text-primary">Todo App</h1>
      <div
        style={{ minHeight: "300px", maxHeight: "600px" }}
        className="p-2 bg-light"
      >
        {todos.todos.map((todo: any) => {
          const { text, id, done } = todo;
          return (
            <div className="row my-2" key={id}>
              <div className="col">
                <div className="form-check d-flex align-items-center justify-content-start gap-3">
                  <input
                    className="form-check-input p-2"
                    type="checkbox"
                    checked={done ? true : false}
                    onChange={(e) => dispatch({ id, type: "toggle_checked" })}
                  />
                  <label
                    className={
                      "form-check-label fs-5 fw-semibold " +
                      (done
                        ? "text-decoration-line-through text-secondary"
                        : "")
                    }
                  >
                    {text}
                  </label>
                </div>
              </div>
              <div className="col d-flex align-items-center justify-content-end gap-2">
                <button
                  className="btn btn-success d-flex align-items-center justify-content-between"
                  onClick={() => editTodo(id, text)}
                >
                  <span className="material-symbols-outlined">edit_note</span>
                </button>
                <button
                  className="btn btn-danger d-flex align-items-center justify-content-between"
                  onClick={() => deleteTodo(id)}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-2 my-3 d-flex align-items-center justify-content-between gap-3">
        <div className="col-11">
          <input
            type="text"
            value={text}
            className="form-control"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="col-1">
          <button
            className="btn btn-dark d-flex align-items-center justify-content-center"
            onClick={addTodo}
          >
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
      </div>

      {/* modal for update */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        ref={modalElement}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Todo
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <textarea className="form-control"></textarea>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
