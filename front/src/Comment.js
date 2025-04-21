import React from 'react';
import "./App.css";

export default function Comment() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);

    fetch('/add-comment', {
      method: 'POST',
      body: data
    })
    .then(response => {
      return response.text();
    })
    .then(message => {
      alert(message); 
    })
    .catch(() => {
      alert('Something went wrong!');
    });
  };

  return (
    <div>
    <form className="comment-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Pavadinimas:</label>
      <input className="comment-input" type="text" id="title" name="title" required />

      <label htmlFor="description">Aprašymas:</label>
      <textarea className="comment-input" type="text" id="description" name="description" required />

      <label htmlFor="email">El paštas:</label>
      <input className="comment-input" type="text" id="email" name="email" />

      <button className="comment-button" type="submit">Siųsti komentarą</button>
    </form>
  </div>
  );
}