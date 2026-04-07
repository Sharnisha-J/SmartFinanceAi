import { useEffect, useState } from "react";
import API from "../services/api";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Analytics() {
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  // 🔥 Fetch Category Data
  const fetchCategory = async () => {
    try {
      const res = await API.get("/expenses/categories");

      const formatted = Object.keys(res.data).map((key) => ({
        name: key,
        value: res.data[key],
      }));

      setCategoryData(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 Fetch Monthly Data
  const fetchMonthly = async () => {
    try {
      const res = await API.get("/expenses/monthly");

      const formatted = Object.keys(res.data).map((key) => ({
        name: key,
        value: res.data[key],
      }));

      setMonthlyData(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchMonthly();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-purple-700">
        Analytics Dashboard 📊
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* 📊 Pie Chart */}
        <div className="bg-white p-5 rounded-2xl shadow h-80">
          <h3 className="mb-3 font-semibold text-gray-700">
            Category Breakdown
          </h3>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name">
                {categoryData.map((_, i) => (
                  <Cell key={i} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 📅 Bar Chart */}
        <div className="bg-white p-5 rounded-2xl shadow h-80">
          <h3 className="mb-3 font-semibold text-gray-700">
            Monthly Spending
          </h3>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default Analytics;