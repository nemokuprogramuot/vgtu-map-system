import React from 'react';
import "./App.css";

export default function Comment({ t }) { // RECEIVE t as prop
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);

    fetch('/add-comment', {
      method: 'POST',
      body: data
    })
    .then(response => response.text())
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
        <label htmlFor="title">{t('form.title')}</label>
        <input className="comment-input" type="text" id="title" name="title" required />

        <label htmlFor="description">{t('form.description')}</label>
        <textarea className="comment-input" id="description" name="description" required />

        <label htmlFor="email">{t('form.email')}</label>
        <input className="comment-input" type="text" id="email" name="email" />

        <button className="comment-button" type="submit">{t('form.submit')}</button>
      </form>
    </div>
  );
}