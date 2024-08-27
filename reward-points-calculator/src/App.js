import React, { useEffect, useState } from 'react';
import { getTrasactions } from './utils/get_transactions';
import Spinner from './common/loader';
import { RewardTable, TransactionsTable } from './table';

const transactions = [
  { customerId: 'C001', date: '2024-06-15', amount: 120 },
  { customerId: 'C002', date: '2024-06-18', amount: 75 },
  { customerId: 'C001', date: '2024-07-21', amount: 200 },
  { customerId: 'C003', date: '2024-07-11', amount: 60 },
  { customerId: 'C002', date: '2024-08-05', amount: 50 },
  { customerId: 'C003', date: '2024-08-19', amount: 150 }
];



const calculatePoints = (transactions) => {
  const pointsPerCustomer = {};

  transactions.forEach(({ customerId, date, amount }) => {
    const month = date.split('-')[1];
    let points = 0;

    if (amount > 100) {
      points = 2 * (amount - 100) + 1 * 50;
    } else if (amount > 50) {
      points = 1 * (amount - 50);
    }

    if (!pointsPerCustomer[customerId]) {
      pointsPerCustomer[customerId] = { total: 0 };
    }

    if (!pointsPerCustomer[customerId][month]) {
      pointsPerCustomer[customerId][month] = 0;
    }

    pointsPerCustomer[customerId][month] += points;
    pointsPerCustomer[customerId].total += points;
  });

  return pointsPerCustomer;
};

const PointsTable = ({ transactions }) => {
  const points = calculatePoints(transactions);

  return (
    <div>
      <h2>Customer Reward Points</h2>
      {Object.keys(points).map((customerId) => (
        <div key={customerId}>
          <h3>Customer {customerId}:</h3>
          <ul>
            {Object.keys(points[customerId]).map((month) => (
              month !== 'total' && (
                <li key={month}>Month {month}: {points[customerId][month]} points</li>
              )
            ))}
            <li>Total: {points[customerId].total} points</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const transactionHeader = ["S.No","Name", "Date", "Amount"]
  const rewardHeader = ["S.No", "Name", "Jan", "Feb", "Mar","Total"]
  const rewardData = [{userName:"user1", "06":"100", "07":"105","08":"28", total:"2222"}]

  useEffect(() => {
    setIsLoading(true)
    getTrasactions().then(response => {
      console.log(response)
      setTransactions(response?.data);
      setIsLoading(false)
    }).catch(err=>{
      setIsLoading(false)
      console.error(err)
    })
  }, [])
  return (
    <div className='col-md'>
      <div className='row'>
      {!isLoading && <TransactionsTable tableHeader={transactionHeader} tabledata={transactions}/>} 
      </div>
      <div className='row'>
      {!isLoading && <RewardTable tableHeader={rewardHeader} tabledata={rewardData}/>} 
      </div>
      {isLoading && <Spinner />}
    </div>
  );
};

export default App;
