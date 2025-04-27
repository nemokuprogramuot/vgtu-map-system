import React, { useEffect, useState } from 'react';
import CommentItem from './components/CommentItem';
import { Link } from 'react-router-dom';

function CommentsPage({ t }) { // ✅ Accept t as prop
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');

  const fetchComments = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please login.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/comments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      setComments(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const deleteComment = async (commentId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please login.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/comments', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ commentId })
      });

      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }

      setComments(prevComments => prevComments.filter(c => c._id !== commentId));
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/register">{t('comments.addAdmin')}</Link>
      <h2>{t('comments.title')}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {comments.length === 0 ? (
        <p>{t('comments.noComments')}</p>
      ) : (
        comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} onDelete={deleteComment} />
        ))
      )}
    </div>
  );
}

export default CommentsPage;
