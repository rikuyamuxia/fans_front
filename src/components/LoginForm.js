import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm({ setUser }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setUser({ id: data.user.id, name: data.user.name }); // ログイン状態を更新
        navigate('/'); // ホームページにリダイレクト
      } else {
        setMessage(data.error || 'ログインに失敗しました。');
      }
    } catch (error) {
      setMessage('サーバーエラーが発生しました。');
    }
  };

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          placeholder="メールアドレス"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          id="password"
          placeholder="パスワード"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">ログイン</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default LoginForm;
