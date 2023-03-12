import { useReducer } from "react";
const initialState = {
  items: [],
  total: 0,
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price,
      };
    case "REMOVE_ITEM":
      const updatedItems = state.items.filter(
        (item: any) => item.id !== action.payload.id
      );
      return {
        ...state,
        items: updatedItems,
        total: state.total - action.payload.price,
      };
    case "CLEAR_CART":
      return initialState;
    default:
      throw new Error("Invalid action type");
  }
}
function ShoppingCart() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Functions to handle adding/removing/clearing cart items
  function addItem(item: any) {
    dispatch({ type: "ADD_ITEM", payload: item });
  }
  function removeItem(item: any) {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  }
  function clearCart() {
    dispatch({ type: "CLEAR_CART" });
  }

  // Render the cart items and total
  return (
    <div>
      <h2>Shopping Cart</h2>
      <button
        onClick={() =>
          addItem({
            name: "Item price ",
            price: Math.floor(Math.random() * 8888),
            id: Math.floor(Math.random() * 8888),
          })
        }
      >
        Add item
      </button>
      <ul>
        {state.items.map((item: any) => (
          <li key={item.id}>
            {item.name} - {item.price}
            <button onClick={() => removeItem(item)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: {state.total}</p>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}

function App() {
  return (
    <>
      <ShoppingCart />
    </>
  );
}

export default App;
