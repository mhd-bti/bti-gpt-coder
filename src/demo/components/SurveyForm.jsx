import React, { useState } from 'react';

const SurveyForm = () => {
  const [satisfaction, setSatisfaction] = useState('');
  const [reason, setReason] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('アンケートが送信されました');
    // ここにフォーム送信のロジックを追加
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '600px', margin: '0 auto' }}>
      <h1>セミナーアンケート</h1>
      <label>
        1. 本日のセミナーへの満足度は？
        <label>
          <input
            type="radio"
            value="良い"
            checked={satisfaction === '良い'}
            onChange={(e) => setSatisfaction(e.target.value)}
          />
          良い
        </label>
        <label>
          <input
            type="radio"
            value="普通"
            checked={satisfaction === '普通'}
            onChange={(e) => setSatisfaction(e.target.value)}
          />
          普通
        </label>
        <label>
          <input
            type="radio"
            value="悪い"
            checked={satisfaction === '悪い'}
            onChange={(e) => setSatisfaction(e.target.value)}
          />
          悪い
        </label>
      </label>

      {satisfaction === '悪い' && (
        <label>
          2. 「悪い」と答えた理由を教えてください。
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            style={{ width: '100%', height: '100px' }}
          />
        </label>
      )}

      <label>
        3. お名前
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: '100%' }}
        />
      </label>

      <label>
        4. メールアドレス
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%' }}
        />
      </label>

      <button type="submit" style={{ marginTop: '20px' }}>送信</button>
    </form>
  );
};

export default SurveyForm;