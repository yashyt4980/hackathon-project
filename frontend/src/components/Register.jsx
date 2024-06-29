import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    axios
      .post(`${import.meta.env.VITE_SERVER}user/register`, {
        name,
        email,
        password,
        role,
      })
      .then((result) => {
        setLoading(false);
        if (result.data === "Already registered") {
          toast.error("E-mail already registered! Please Login to proceed.");
          navigate("/login");
        } else {
          toast.success("Registered successfully! Please Login to proceed.");
          navigate("/login");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              className="w-full p-2 border border-gray-300 rounded"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Role</label>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="editor"
                  checked={role === "editor"}
                  onChange={(event) => setRole(event.target.value)}
                  className="form-radio"
                  name="role"
                />
                <span className="ml-2">Editor</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="radio"
                  value="reader"
                  checked={role === "reader"}
                  onChange={(event) => setRole(event.target.value)}
                  className="form-radio"
                  name="role"
                />
                <span className="ml-2">Reader</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? <div className="loader animate-spin"></div> : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
