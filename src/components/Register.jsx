import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../util/api";
import { ResgisterSchema } from "../schema/UserSchema";

function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("ash11@gmail.com");
  const [password, setPassword] = useState("Abcdef11");
  const [confirmPassword, setConfirmPassword] = useState("Abcdef11");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const errors = {};
    const { error } = ResgisterSchema.validate(
      { email, password, confirmPassword },
      { abortEarly: false }
    );
    if (error) {
      setErrors(error.details.map((error) => error.message));
      return;
    }
    setErrors([]);

    // Register user
    try {
      await registerApi(email, password);
      navigate('/login')
    } catch (e) {
      if (e?.response?.status == 400) {
        setErrors([e?.response.data]);
      } else {
        setErrors([e?.response.data]);
      }
    }
  };
  return (
    <div className="flex justify-center items-center pt-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg"
        noValidate
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`border border-gray-400 p-2 w-full rounded-lg ${
              errors.email ? "border-red-500" : ""
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 mt-2">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`border border-gray-400 p-2 w-full rounded-lg ${
              errors.password ? "border-red-500" : ""
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 mt-2">{errors.password}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 font-bold mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className={`border border-gray-400 p-2 w-full rounded-lg ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 mt-2">{errors.confirmPassword}</p>
          )}
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Register
          </button>
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </div>
        {errors.length > 0 && (
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}

export default Register;
