import React, { useState } from "react";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";
import "./app.css";

function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  const [update, setUpdate] = useState("");

  // add items function
  function addItem() {
    if (!newItem) {
      alert("Enter An Item");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
      isDone: false,
    };

    setItems((oldList) => [...oldList, item]);
    setNewItem("");
  }

  // delete items function
  function deleteItems(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

  // delete all tasks function
  function deleteAllItems() {
    setItems([]);
  }

  // delete completed tasks function
  function deleteCompletedItems() {
    const newArray = items.filter((item) => !item.isDone);
    setItems(newArray);
  }

  // toggle done/undone functionality
  function toggleDone(id) {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, isDone: !item.isDone };
      }
      return item;
    });
    setItems(updatedItems);
  }

  function toggleEdit(id) {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, isEditing: !item.isEditing };
      }
      return item;
    });
    setItems(updatedItems);
  }

  function handleEditItem(e, id) {
    e.preventDefault();
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, value: update, isEditing: false };
      }
      return item;
    });
    setItems(updatedItems);
    setUpdate("");
  }

  return (
    <div className="container">
      <h1>ToDo List</h1>
      <input
        type="text"
        placeholder="Add an item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={() => addItem()}>Add</button>

      {/* Delete all tasks button */}
      <button onClick={() => deleteAllItems()}>Clear</button>

      {/* Delete completed tasks button */}
      <button onClick={() => deleteCompletedItems()}>Delete Marked</button>

      <ul>
        {items.map((item) => {
          return (
            <li key={item.id} className={item.isDone ? "done" : ""}>
              {item.isEditing ? (
                <form onSubmit={(e) => handleEditItem(e, item.id)}>
                  <input
                    type="text"
                    defaultValue={item.value}
                    onChange={(e) => setUpdate(e.target.value)}
                  />
                  <button type="text">Update</button>
                </form>
              ) : (
                item.value
              )}
              <button onClick={() => deleteItems(item.id)}>
                <TiDeleteOutline />
              </button>
              <button onClick={() => toggleDone(item.id)}>
                {item.isDone ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank />
                )}
              </button>
              <button onClick={() => toggleEdit(item.id)}>
                <CiEdit />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
