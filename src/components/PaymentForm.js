import React, { useState } from 'react';

function PaymentForm({ user, setUser, token }) { // token を追加
    const [points, setPoints] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');
    const [message, setMessage] = useState('');

    const handlePurchase = async (e) => {
        e.preventDefault();

        if (!user) {
            setMessage("ログインしてください");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/purchase", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // JWTトークンをヘッダーに追加
                },
                body: JSON.stringify({
                    user_id: user.id,
                    points: parseInt(points, 10),
                    card_number: cardNumber,
                    expiry_month: expiryMonth,
                    expiry_year: expiryYear,
                    cvv: cvv,
                }),
            });
            const data = await response.json();

            console.log("送信データ:", {
              user_id: user.id,
              points: parseInt(points, 10),
              card_number: cardNumber,
              expiry_month: expiryMonth,
              expiry_year: expiryYear,
              cvv: cvv,
          });

          console.log("サーバーからのレスポンス:", data);
          console.log("HTTPステータスコード:", response.status);
          console.log("JWT トークン:", token);


            if (response.ok) {
                setMessage(`ポイント購入成功！ 現在のポイント: ${data.total_points}`);
                            // ユーザーのポイントを更新
                setUser(prevUser => ({
                  ...prevUser,
                  points: data.total_points, // サーバーからの最新のポイントを設定
                }));
                setPoints('');
                setCardNumber('');
                setExpiryMonth('');
                setExpiryYear('');
                setCvv('');
            } else {
                setMessage(data.error || "購入に失敗しました。");
            }
        } catch (error) {
            console.error("購入エラー:", error);
            setMessage("購入エラーが発生しました。");
        }
    };

    return (
        <div>
            <h1>ポイント購入</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handlePurchase}>
                <label>
                    購入ポイント量:
                    <input
                        type="number"
                        value={points}
                        onChange={(e) => setPoints(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    クレジットカード番号:
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder='1234 5678 9012 3456'
                        maxLength={16}
                        required
                    />
                </label>
                <br />
                <label>
                    有効期限（月）:
                    <input
                        type="text"
                        value={expiryMonth}
                        onChange={(e) => setExpiryMonth(e.target.value)}
                        placeholder='MM'
                        maxLength={2}
                        required
                    />
                </label>
                <br />
                <label>
                    有効期限（年）:
                    <input
                        type="text"
                        value={expiryYear}
                        onChange={(e) => setExpiryYear(e.target.value)}
                        placeholder='YY'
                        maxLength={2}
                        required
                    />
                </label>
                <br />
                <label>
                    CVV:
                    <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder='1234'
                        maxLength={4}
                        required
                    />
                </label>
                <br />
                <button type="submit">購入</button>
            </form>
        </div>
    );
}

export default PaymentForm;
