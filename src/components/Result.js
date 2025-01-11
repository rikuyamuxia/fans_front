// Result.js
import React from 'react';
import { useLocation } from 'react-router-dom';

function Result() {
  const location = useLocation();
  const { receivedData } = location.state || {};  // PaymentForm から渡されたデータを受け取る

  console.log(location.state);

  return (
    <div>
      <h1>送信結果</h1>
      {receivedData ? (
        <div>
          <p>名前: {receivedData.name}</p>
          <p>金額: {receivedData.amount}</p>
          <p>コメント: {receivedData.comment}</p>
        </div>
      ) : (
        <p>データがありません</p>
      )}
    </div>
  );
}

export default Result;

