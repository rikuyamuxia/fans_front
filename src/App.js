import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import PaymentForm from './components/PaymentForm';
import Result from './components/Result';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

function App() {
  const [user, setUser] = useState(null); // ログイン中のユーザー情報を管理

  const handleLogout = () => {
    setUser(null); // ユーザー情報をリセットしてログアウト
  };

  return (
      <div>
        {/* ヘッダーにuserとonLogoutを渡す */}
        <Header user={user} onLogout={handleLogout} />

        {/* ルート定義 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/payment-form" element={<PaymentForm />} />
          <Route path="/result" element={<Result />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm setUser={setUser} />} /> {/* setUserを渡す */}
        </Routes>
      </div>
  );
}

export default App;
