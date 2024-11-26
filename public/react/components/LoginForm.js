import { React, useState } from "react";
import apiURL from "../api";

export default function LoginForm({ setUser, setViewLoginForm }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
        const response = await fetch(`${apiURL}/users/login`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        setUser(data);
        setViewLoginForm(false);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
            Username:
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
            />
            
        </label>
        <label>
            password:
            <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  );
}
