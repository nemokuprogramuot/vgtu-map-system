import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./api/auth";

function Register({ t }) { // ✅ Add t prop

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success, message } = await registerUser(formData);
    if (success) {
      alert(t('register.success')); // ✅ Translate only success message
      navigate("/comments");
    } else {
      alert(message); // ⚠️ Keep backend error raw, no translation
    }
  };

  return (
    <div>
      <h2>{t('register.title')}</h2> {/* ✅ Translate title */}
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          placeholder={t('register.username')}
          onChange={handleChange}
          value={formData.username}
        />
        <br />
        <input
          name="email"
          type="email"
          placeholder={t('register.email')}
          onChange={handleChange}
          value={formData.email}
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder={t('register.password')}
          onChange={handleChange}
          value={formData.password}
        />
        <br />
        <button type="submit">{t('register.submit')}</button> {/* ✅ Translate button */}
      </form>
    </div>
  );
}

export default Register;