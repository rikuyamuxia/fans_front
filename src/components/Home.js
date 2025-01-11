// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>FANletter</h1>
      <p>あなたの想いを推しのお金に</p>
      <div className="container">
        <Link to="/payment-form">ポイント購入</Link>
      </div>
      <div className="container">
        <Link to="/result">結果</Link>
      </div>
    </div>
  );
}

export default Home;

