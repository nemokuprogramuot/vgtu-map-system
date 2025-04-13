import React from 'react';

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
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" required />

        <label htmlFor="description">Description:</label>
        <input type="text" id="description" name="description" required />

        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" />

        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
}