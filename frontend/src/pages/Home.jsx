import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-800">
      {/* Navbar */}
      <div className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold text-purple-700">SmartFinance</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold shadow"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold shadow"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 mt-20">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-6 text-purple-700"
        >
          Manage Your Money Smarter 💸
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg max-w-xl mb-8 text-gray-600"
        >
          Track expenses, visualize spending, and get AI-powered insights to improve your financial habits.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-x-4"
        >
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3 bg-purple-600 text-white rounded-xl font-semibold shadow hover:scale-105 transition"
          >
            Start Free
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 border border-purple-600 text-purple-600 rounded-xl hover:bg-purple-600 hover:text-white transition"
          >
            Login
          </button>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 px-10 mt-24">
        {[
          {
            title: "Track Expenses",
            desc: "Easily record and manage your daily spending.",
          },
          {
            title: "Visual Analytics",
            desc: "Understand your spending with charts and reports.",
          },
          {
            title: "AI Insights",
            desc: "Get smart suggestions to save money.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow hover:scale-105 transition"
          >
            <h3 className="text-xl font-semibold mb-2 text-purple-700">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-20 pb-6 text-gray-500">
        © 2026 SmartFinance AI • Built with ❤️ by Monisha
      </div>
    </div>
  );
}
