import { useState, useEffect } from "react";
import API from "../services/api";


function ExpenseForm({ fetchExpenses, editExpense, setEditExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  // 🔥 Load data into form when editing
  useEffect(() => {
    if (editExpense) {
      setTitle(editExpense.title);
      setAmount(editExpense.amount);
      setCategory(editExpense.category);
    }
  }, [editExpense]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !amount) {
      alert("Title and Amount are required");
      return;
    }

    try {
      if (editExpense) {
        // 🔥 UPDATE
        await API.put(`/expenses/${editExpense._id}`, {
          title,
          amount,
          category,
        });

        setEditExpense(null);
      } else {
        // 🔥 CREATE
        await API.post("/expenses", {
          title,
          amount,
          category,
        });
      }

      // clear form
      setTitle("");
      setAmount("");
      setCategory("");

      // refresh data
      fetchExpenses();

    } catch (error) {
      console.error(error);
      alert("Error saving expense");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editExpense ? "Edit Expense" : "Add Expense"}</h3>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <br /><br />

      <button type="submit">
        {editExpense ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default ExpenseForm;