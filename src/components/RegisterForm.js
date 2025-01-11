import React, { useState } from 'react';

function RegisterForm() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    // 入力フィールドの変更を処理
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    // フォームの送信を処理
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            setMessage(data.message || data.error);
        } catch (error) {
            setMessage('登録に失敗しました。');
        }
    };

    return (
        <div>
            <h1>会員登録</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="name"
                    placeholder="名前"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <br />
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
                <button type="submit">登録</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default RegisterForm;
