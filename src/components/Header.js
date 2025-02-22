import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ user, onLogout }) {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-text">FAN</span><span className="logo-letter">letter</span>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">ホーム</Link>
          </li>
          <li>
            <Link to="/payment-form">ポイント購入</Link>
          </li>
          <li>
            <Link to="/register">会員登録</Link>
          </li>
          {!user && (
            <li>
              <Link to="/login">ログイン</Link>
            </li>
          )}
          {user && (
            <>
              <li className="user-name">ようこそ、{user.name}</li>
              <li className="user-name">ポイント: {user.points}pt</li>
              <li>
              <span onClick={onLogout} className="logout-link">ログアウト</span>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
