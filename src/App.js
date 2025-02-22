import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import PaymentForm from './components/PaymentForm';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

function App() {
  const [user, setUser] = useState(null); // ログイン中のユーザー情報を管理
  const [userToken, setUserToken] = useState(null); // JWT トークンを管理
  
  const handleLogout = () => {
    setUser(null);
    setUserToken(null); // トークンもリセット
};


  return (
      <div>
        {/* ヘッダーにuserとonLogoutを渡す */}
        <Header user={user} onLogout={handleLogout} />

        {/* ルート定義 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/payment-form" element={<PaymentForm user={user} setUser={setUser} token={userToken}/>} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm setUser={setUser} setUserToken={setUserToken}/>} /> {/* setUserを渡す */}
        </Routes>
      </div>
  );
}

export default App;
