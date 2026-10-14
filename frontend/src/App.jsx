import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/items";

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [items, setItems] = useState([]);

  // GET ITEMS FROM MONGODB
  const getItems = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load items");
      }

      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error loading items:", error);
    }
  };

  // LOAD ITEMS WHEN PAGE OPENS
  useEffect(() => {
    getItems();
  }, []);

  // ADD NEW ITEM
  const addItem = async (e) => {
    e.preventDefault();

    const newItem = {
      name: name,
      price: Number(price),
      category: category,
      quantity: Number(quantity)
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newItem)
      });

      if (!response.ok) {
        throw new Error("Item save failed");
      }

      const savedItem = await response.json();

      setItems((previousItems) => [...previousItems, savedItem]);

      setName("");
      setPrice("");
      setCategory("");
      setQuantity("");

      alert("Item Saved Successfully!");
    } catch (error) {
      console.error(error);
      alert("Error saving item!");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Item Manager</h1>

      <h2>Add New Item</h2>

      <form onSubmit={addItem}>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="0"
          required
        />

        <br /><br />

        <button type="submit">Add Item</button>
      </form>

      <h2>Item List</h2>

      {items.map((item) => (
        <div key={item._id}>
          <p>
            {item.name} - Rs. {item.price} -
            {item.category} - Quantity: {item.quantity}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;