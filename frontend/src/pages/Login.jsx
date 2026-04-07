import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="w-full mb-2 p-2 border" />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="w-full mb-4 p-2 border" />

        <button className="bg-purple-600 text-white w-full py-2 rounded">Login</button>
      </form>
    </div>
  );
}

export default Login;