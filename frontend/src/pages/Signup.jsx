import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/signup", { name, email, password });
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded-xl shadow w-80">
        <h2 className="text-xl font-bold mb-4">Signup</h2>

        <input placeholder="Name" onChange={(e) => setName(e.target.value)} className="w-full mb-2 p-2 border" />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="w-full mb-2 p-2 border" />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="w-full mb-4 p-2 border" />

        <button className="bg-purple-600 text-white w-full py-2 rounded">Signup</button>
      </form>
    </div>
  );
}

export default Signup;