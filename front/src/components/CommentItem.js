import React from 'react';

function CommentItem({ comment, onDelete }) {
  const { _id, title, description, email } = comment;

  const handleDelete = () => {
    onDelete(_id);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '12px', borderRadius: '8px' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{title}</h3>
      <p>{description}</p>
      <p style={{ color: 'gray', fontSize: '0.9rem' }}>{email}</p>
      <button 
        onClick={handleDelete}
        style={{ marginTop: '8px', backgroundColor: 'red', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Delete
      </button>
    </div>
  );
}

export default CommentItem;