import React, { useState, useEffect } from 'react';
import './App.css';
import BreakoutGame from './BreakoutGame';

const App = () => {
  const [satisfaction, setSatisfaction] = useState('');
  const [reason, setReason] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState('form');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('confirm');
  };

  const handleRegister = () => {
    setStep('complete');
    // 実際の送信処理をここに追加
    console.log({ satisfaction, reason, name, email });
  };

  return (
    <div className="App">
      {step === 'form' && (
        <div className="form-container">
          <h1>セミナーアンケート</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>1. 本日のセミナーへの満足度は？</label>
              <div>
                <label className="radio-label">
                  <input
                    type="radio"
                    value="良い"
                    checked={satisfaction === '良い'}
                    onChange={(e) => setSatisfaction(e.target.value)}
                  />
                  良い
                </label>
              </div>
              <div>
                <label className="radio-label">
                  <input
                    type="radio"
                    value="普通"
                    checked={satisfaction === '普通'}
                    onChange={(e) => setSatisfaction(e.target.value)}
                  />
                  普通
                </label>
              </div>
              <div>
                <label className="radio-label">
                  <input
                    type="radio"
                    value="悪い"
                    checked={satisfaction === '悪い'}
                    onChange={(e) => setSatisfaction(e.target.value)}
                  />
                  悪い
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>2. 「悪い」と答えた理由を教えてください。</label>
              <textarea
                className="form-control"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                disabled={satisfaction !== '悪い'}
              />
            </div>

            <div className="form-group">
              <label>3. お名前</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>4. メールアドレス</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn">送信</button>
          </form>
        </div>
      )}

      {step === 'confirm' && (
        <div className="confirm-container">
          <h1>確認画面</h1>
          <p>満足度: {satisfaction}</p>
          <p>理由: {reason}</p>
          <p>お名前: {name}</p>
          <p>メールアドレス: {email}</p>
          <button onClick={handleRegister} className="btn">登録</button>
          <button onClick={() => setStep('form')} className="btn btn-secondary">戻る</button>
        </div>
      )}

      {step === 'complete' && (
        <div className="complete-container">
          <h1>送信完了</h1>
          <p>アンケートの送信が完了しました。ありがとうございました！</p>
          <BreakoutGame />
        </div>
      )}
    </div>
  );
};

export default App;
