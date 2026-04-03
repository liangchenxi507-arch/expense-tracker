import { useEffect, useState } from "react";
import axios from "axios";

function App() {
const [expenses, setExpenses] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
  });
const [editingId, setEditingId] = useState(null);
 const fetchExpenses = async () => {
  try {
    const response = await axios.get("http://localhost:5000/expenses");
    setExpenses(response.data);
  } catch (error) {
    console.error("Error fetching expenses:", error);
  }
};


useEffect(() => {
  fetchExpenses();
}, []);

const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};
const handleEditExpense = (expense) => {
  setFormData({
    title: expense.title,
    category: expense.category,
    amount: expense.amount,
    date: expense.date,
  });

  setEditingId(expense._id || expense.id)
  setShowForm(true);
};
 const handleAddExpense = async (event) => {
  event.preventDefault();

  if (
    !formData.title ||
    !formData.category ||
    !formData.amount ||
    !formData.date
  ) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    if (editingId !== null) {
      await axios.put(`http://localhost:5000/expenses/${editingId}`, {
        title: formData.title,
        category: formData.category,
        amount: Number(formData.amount),
        date: formData.date,
      });

      setEditingId(null);
    } else {
      await axios.post("http://localhost:5000/expenses", {
        title: formData.title,
        category: formData.category,
        amount: Number(formData.amount),
        date: formData.date,
      });
    }

    setFormData({
      title: "",
      category: "",
      amount: "",
      date: "",
    });

    setShowForm(false);
    fetchExpenses();
  } catch (error) {
    console.error("Error saving expense:", error);
  }
};
const handleDeleteExpense = async (id) => {
  const confirmed = window.confirm("Are you sure you want to delete this expense?");
  if (!confirmed) return;

  try {
    await axios.delete(`http://localhost:5000/expenses/${id}`);
    fetchExpenses();
  } catch (error) {
    console.error("Error deleting expense:", error);
  }
};
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const thisMonth = expenses.reduce((sum, expense) => {
    return expense.date.startsWith("2026-04") ? sum + expense.amount : sum;
  }, 0);

  const categoryTotals = {};
  expenses.forEach((expense) => {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] || 0) + expense.amount;
  });

  let topCategory = "None";
  let maxAmount = 0;

  for (const category in categoryTotals) {
    if (categoryTotals[category] > maxAmount) {
      maxAmount = categoryTotals[category];
      topCategory = category;
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-text">
          <span className="badge">✨ Personal Finance</span>
          <h1>Expense Tracker</h1>
          <p>Track your spending in a soft and stylish dashboard</p>
        </div>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "+ Add Expense"}
        </button>
      </header>

      {showForm && (
        <section className="form-section">
          <h2>{editingId !== null ? "Edit Expense" : "Add New Expense"}</h2>
          <form className="expense-form" onSubmit={handleAddExpense}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />

            <button type="submit" className="submit-btn">
  {editingId !== null ? "Update Expense" : "Save Expense"}
</button>

          </form>
        </section>
      )}

      <section className="summary">
        <div className="card card-pink">
          <h3>Total Expenses</h3>
          <p>${totalExpenses.toFixed(2)}</p>
        </div>

        <div className="card card-purple">
          <h3>This Month</h3>
          <p>${thisMonth.toFixed(2)}</p>
        </div>

        <div className="card card-peach">
          <h3>Top Category</h3>
          <p>{topCategory}</p>
        </div>
      </section>

      <section className="expense-list">
        <div className="list-header">
  <div>
    <h2>Expense List</h2>
    <p className="list-subtitle">Your recent spending records</p>
  </div>
  <span className="list-count">{expenses.length} items</span>
</div>

          {expenses.map((expense) => (
  <div className="expense-item" key={expense._id || expense.id}>
    <div className="expense-left">
      <h3>{expense.title}</h3>
      <p>
        {expense.category} • {expense.date}
      </p>
    </div>

    <div className="expense-right">
      <span className="amount">${expense.amount.toFixed(2)}</span>

      <button
        className="edit-btn"
        onClick={() => handleEditExpense(expense)}
      >
        Edit
      </button>

      <button
        className="delete-btn"
        onClick={() => handleDeleteExpense(expense._id || expense.id)}
      >
        Delete
      </button>
    </div>
  </div>
))}

      </section>
    </div>
  );
}

export default App;