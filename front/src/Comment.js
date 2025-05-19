import React, { useState } from 'react';
import "./App.css";

export default function Comment({ t }) {
  const [aiInput, setAiInput] = useState('');
  const [aiOutput, setAiOutput] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleAskAI = async () => {
    if (!aiInput.trim()) {
      alert('Please enter a question or prompt');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/ask-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: aiInput }),
      });

      const data = await response.json();
      setAiOutput(data.aiResponse);
    } catch (err) {
      console.error(err);
      alert('AI request failed');
    }

    setLoading(false);
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

      <div style={{ marginTop: '40px' }}>
        <h3> {t('AI.title')} </h3>
        <textarea
          className="comment-input"
          rows="3"
          placeholder="Ask something"
          value={aiInput}
          onChange={(e) => setAiInput(e.target.value)}
        />
        <button
          className="comment-button"
          style={{ marginTop: '10px' }}
          onClick={handleAskAI}
          disabled={loading}
        >
          {loading ? t('AI.buttonLoading') : t('AI.button')}
        </button>

        {aiOutput && (
          <div style={{ marginTop: '20px' }}>
            <h4>{t('AI.response')}</h4>
            <div className="ai-response" style={{ whiteSpace: 'pre-wrap', background: '#f9f9f9', padding: '10px', borderRadius: '5px' }}>
              {aiOutput}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
