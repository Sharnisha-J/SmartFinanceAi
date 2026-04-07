import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ IMPORTANT
import API from "../services/api";
import ExpenseForm from "../components/ExpenseForm";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [editExpense, setEditExpense] = useState(null);

  const navigate = useNavigate(); // ✅ IMPORTANT

  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses");
      setExpenses(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await API.get("/expenses/summary");
      setTotal(res.data.total);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;

    try {
      await API.delete(`/expenses/${id}`);
      fetchExpenses();
      fetchSummary();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (expense) => {
    setEditExpense(expense);
  };

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-64 bg-purple-700 text-white p-6">
        <h1 className="text-2xl font-bold mb-6">SmartFinance</h1>
        <ul className="space-y-3">
          <li className="hover:bg-purple-600 p-2 rounded cursor-pointer">
            Dashboard
          </li>

          {/* ✅ WORKING ANALYTICS LINK */}
          <li
            onClick={() => navigate("/analytics")}
            className="hover:bg-purple-600 p-2 rounded cursor-pointer"
          >
            Analytics
          </li>

          <li className="hover:bg-purple-600 p-2 rounded cursor-pointer">
            AI Insights
          </li>
          <li className="hover:bg-purple-600 p-2 rounded cursor-pointer">
            Settings
          </li>
        </ul>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">

        <h2 className="text-3xl font-bold mb-6 text-gray-700">
          Dashboard
        </h2>

        {/* 🔥 View Analytics Button */}
        <button
          onClick={() => navigate("/analytics")}
          className="bg-purple-600 text-white px-4 py-2 rounded mb-6"
        >
          View Analytics
        </button>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow">
            <h3 className="text-gray-500">Total Expenses</h3>
            <p className="text-2xl font-bold text-purple-600">
              ₹{total}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <h3 className="text-gray-500">Transactions</h3>
            <p className="text-2xl font-bold">
              {expenses.length}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <h3 className="text-gray-500">Categories</h3>
            <p className="text-2xl font-bold">
              {[...new Set(expenses.map((e) => e.category))].length}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-6 rounded-2xl shadow mb-6">
          <ExpenseForm
            fetchExpenses={fetchExpenses}
            editExpense={editExpense}
            setEditExpense={setEditExpense}
          />
        </div>

        {/* Expense List */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-4">
            Recent Expenses
          </h3>

          {expenses.length === 0 ? (
            <p>No expenses yet</p>
          ) : (
            expenses.map((exp) => (
              <div
                key={exp._id}
                className="flex justify-between items-center border-b py-3 hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium">{exp.title}</p>
                  <p className="text-sm text-gray-500">
                    {exp.category}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-bold text-purple-600">
                    ₹{exp.amount}
                  </p>

                  <button
                    onClick={() => handleEdit(exp)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;