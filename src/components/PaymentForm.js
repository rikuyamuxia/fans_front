// PaymentForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentForm() {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState(''); // カード番号
  const [cardHolder, setCardHolder] = useState(''); // カード名義
  const [expiryMonth, setExpiryMonth] = useState(''); // 有効期限（月）
  const [expiryYear, setExpiryYear] = useState(''); // 有効期限（年）
  const [cvv, setCvv] = useState(''); // セキュリティコード
  const [amount, setAmount] = useState('');
  const [url, setUrl] = useState('');
  const [comment, setComment] = useState(''); // コメント欄の状態を追加
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { 
      name, 
      cardNumber, 
      cardHolder, 
      expiryMonth, 
      expiryYear, 
      cvv, 
      amount, 
      url,
      comment,
    };

    try {
      // APIにデータを送信
      const response = await fetch('http://127.0.0.1:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // 結果ページに遷移し、送信データを渡す
        navigate('/result', { state: { receivedData: data } });
      } else {
        console.error('API呼び出し失敗');
      }
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  return (
    <div>
      <h1>支払いフォーム</h1>
      <form onSubmit={handleSubmit}>
        {/* URL 項目 */}
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            id="url"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        {/* 金額 項目 */}
        <div>
          <label htmlFor="amount">金額:</label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* クレジットカード情報 項目 */}
        <div>
          <label htmlFor="cardHolder">カード名義:</label>
          <input
            type="text"
            id="cardHolder"
            name="cardHolder"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cardNumber">クレジットカード番号:</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            maxLength="16"  // 最大16桁
            placeholder="1234 5678 9012 3456"
          />
        </div>
        <div>
          <label htmlFor="expiryMonth">有効期限（月）:</label>
          <input
            type="text"
            id="expiryMonth"
            name="expiryMonth"
            value={expiryMonth}
            onChange={(e) => setExpiryMonth(e.target.value)}
            maxLength="2"  // 月は2桁
            placeholder="MM"
          />
        </div>
        <div>
          <label htmlFor="expiryYear">有効期限（年）:</label>
          <input
            type="text"
            id="expiryYear"
            name="expiryYear"
            value={expiryYear}
            onChange={(e) => setExpiryYear(e.target.value)}
            maxLength="2"  // 年は2桁
            placeholder="YY"
          />
        </div>
        <div>
          <label htmlFor="cvv">セキュリティコード（CVV）:</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            maxLength="4"  // 最大4桁
            placeholder="123"
          />
        </div>

        {/* 名前 項目 */}
        <div>
          <label htmlFor="name">ユーザーネーム:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* コメント 項目 */}
        <div>
          <label htmlFor="comment">コメント:</label>
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="コメントを入力してください"
            rows="4"
            style={{ width: '95%', padding: '10px', fontSize: '1rem', border: '2px solid #ddd', borderRadius: '6px' }} // コメント欄のサイズ調整
          />
        </div>

        <button type="submit">送信</button>
      </form>
    </div>
  );
}

export default PaymentForm;
