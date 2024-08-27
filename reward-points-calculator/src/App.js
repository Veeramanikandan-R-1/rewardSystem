import React, { useEffect, useState } from "react";
import { getTrasactions } from "./utils/get_transactions";
import Spinner from "./common/loader";
import { RewardTable, TransactionsTable } from "./table";

const calculatePoints = (transactions) => {
  const pointsPerCustomer = {};

  transactions.forEach(({ customerId, date, amount, userName }) => {
    const month = date.split("-")[1];
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
  const [transactions, setTransactions] = useState([]);
  const [rewardData, setRewardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const transactionHeader = ["S.No", "Name", "Date", "Amount"];
  const rewardHeader = ["S.No", "Name", "June", "July", "August", "Total"];

  useEffect(() => {
    setIsLoading(true);
    getTrasactions()
      .then((response) => {
        console.log(response);
        setTransactions(response?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);
  const showRewardHandler = () => {
    let rewardPoints = calculatePoints(transactions);
        rewardPoints = Object.keys(rewardPoints).map((data) => ({
          userName: rewardPoints[data].userName,
          ...rewardPoints[data],
        }));
        setRewardData(rewardPoints);
    setShowReward(true);
  };
  return (
    <div className="container text-center">
      <div>{!isLoading && <h2 className="text-primary">Reward points Calculator</h2>}</div>
      <div className="col-md">
        <div>{!isLoading && <h4>Customer Transactions</h4>}</div>
        <div className="row">
          {!isLoading && (
            <TransactionsTable
              tableHeader={transactionHeader}
              tabledata={transactions}
            />
          )}
        </div>
        {!isLoading && (
          <button
            type="button"
            class="btn btn-primary mt-3"
            onClick={showRewardHandler}
          >
            Calculate Rewards
          </button>
        )}
        {!isLoading && showReward && (
          <div className="row mt-3">
            {!isLoading && <h4>Rewards</h4>}
            {!isLoading && (
              <RewardTable tableHeader={rewardHeader} tabledata={rewardData} />
            )}
          </div>
        )}
        {isLoading && <Spinner />}
      </div>
    </div>
  );
};

export default App;
