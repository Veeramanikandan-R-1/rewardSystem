import React, { useEffect, useState } from 'react';
import { getTrasactions } from './utils/get_transactions';
import Spinner from './common/loader';
import { RewardTable, TransactionsTable } from './table';

const calculatePoints = (transactions) => {
  const pointsPerCustomer = {};

  transactions.forEach(({ customerId, date, amount, userName }) => {
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
    pointsPerCustomer[customerId].userName = userName;
  });

  return pointsPerCustomer;
};

const App = () => {
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const transactionHeader = ["S.No","Name", "Date", "Amount"]
  const rewardHeader = ["S.No", "Name", "Jan", "Feb", "Mar","Total"]
  const rewardData = [{userName:"user1", "06":"100", "07":"105","08":"28", total:"2222"}]

  useEffect(() => {
    setIsLoading(true)
    getTrasactions().then(response => {
      console.log(response)
      setTransactions(response?.data);
      let rewardPoints = calculatePoints(response?.data)
      console.log('rewardPoints',rewardPoints)
      rewardPoints = Object.keys(rewardPoints).map(data=>({
        userName: rewardPoints[data].userName,
        ...rewardPoints[data],
      }))
      console.log('rewardPoints',rewardPoints)
      setIsLoading(false)
    }).catch(err=>{
      setIsLoading(false)
      console.error(err)
    })
  }, [])
  const showRewardHandler = () => {
    setShowReward(true)
  }
  return (
    <div className='col-md'>
      <div className='row'>
        {!isLoading && <h4 className='mx-auto'>Customer Transactions</h4>}
      {!isLoading && <TransactionsTable tableHeader={transactionHeader} tabledata={transactions}/>} 
      </div>
      {!isLoading  && <button type="button" class="btn btn-success" onClick={showRewardHandler}>Calculate Rewards</button>}
      {(!isLoading  && showReward) && <div className='row'>
        {!isLoading && <h4>Rewards</h4>}
      {!isLoading && <RewardTable tableHeader={rewardHeader} tabledata={rewardData}/>} 
      </div>}
      {isLoading && <Spinner />}
    </div>
  );
};

export default App;
