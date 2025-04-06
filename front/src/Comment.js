import React from 'react'

export default function Comment() {
  return (
    <div>
      <form action="/add-comment" method="POST">
      <label for="title">Title:</label>
      <input type="text" id="title" name="title" required></input>
      <label for="description">description:</label>
      <input type="text" id="description" name="description" required></input>
      <label for="email">Email:</label>
      <input type="text" id="email" name="email"></input>
      <button type="submit">Submit Comment</button>

      </form>
    </div>
  )
}
