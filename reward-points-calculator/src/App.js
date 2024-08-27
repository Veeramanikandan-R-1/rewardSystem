import React, { useState } from "react";

function calculateRewardPoints(transactionAmount) {
  let points = 0;

  // Calculate points for dollars spent over $100
  if (transactionAmount > 100) {
    points += (transactionAmount - 100) * 2;
  }

  // Calculate points for dollars spent over $50
  if (transactionAmount > 50) {
    points += (transactionAmount - 50);
  }

  return points;
}

function App() {
  const [transactions, setTransactions] = useState([
    { month: "January", amount: 120 },
    { month: "February", amount: 80 },
    { month: "March", amount: 150 },
  ]);

  const monthlyPoints = {};

  // Calculate reward points for each month
  transactions.forEach((transaction) => {
    const points = calculateRewardPoints(transaction.amount);

    if (!monthlyPoints[transaction.month]) {
      monthlyPoints[transaction.month] = 0;
    }

    monthlyPoints[transaction.month] += points;
  });

  // Calculate total reward points
  const totalPoints = Object.values(monthlyPoints).reduce(
    (acc, points) => acc + points,
    0
  );

  return (
    <div>
      <h1>Reward Points Calculator</h1>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Transaction Amount</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.month}</td>
              <td>${transaction.amount}</td>
              <td>{calculateRewardPoints(transaction.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total Reward Points: {totalPoints}</p>
    </div>
  );
}

export default App