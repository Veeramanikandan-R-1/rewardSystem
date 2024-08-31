import React, { useEffect, useState } from "react";
import { getTrasactions } from "./utils/get_transactions";
import Spinner from "./common/loader";
import { RewardTable, TransactionsTable } from "./components/table";
import './App.css';

let months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const calculatePoints = (transactions, monthsFilter) => {
  const pointsPerCustomer = {};
  const months = []
  transactions.forEach(({ customerId, date, amount, userName }) => {
    const month = date.split("-")[1];
    let points = 0;
    const monthNum = Number(month) - 1;

    if (!months.includes(monthNum)) months.push(monthNum);
    if (!monthsFilter || monthsFilter.includes(monthNum)) {
      if (amount > 100) {
        points = 2 * (amount - 100) + 1 * 50;
      } else if (amount > 50) {
        points = 1 * (amount - 50);
      }

      points = Math.round(points)

      if (!pointsPerCustomer[customerId]) {
        pointsPerCustomer[customerId] = { total: 0 };
      }

      if (!pointsPerCustomer[customerId][month]) {
        pointsPerCustomer[customerId][month] = 0;
      }

      pointsPerCustomer[customerId][month] += points;
      pointsPerCustomer[customerId].total += points;
      pointsPerCustomer[customerId].userName = userName;
    }
  });

  return { months: months.sort(), rewardPoints: pointsPerCustomer };
};

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [rewardData, setRewardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [seletedMonth, setSeletedMonth] = useState("");
  const [selectMonth, setSelectMonth] = useState({ shouldShow: false, months: [] });
  const transactionHeader = ["S.No", "Name", "Date", "Amount"];
  const [rewardHeader, setRewardHeader] = useState([])
  // const rewardHeader = ["S.No", "Name", "June", "July", "August", "Total"];


  useEffect(() => {
    setIsLoading(true);
    getTrasactions().then(async (response) => {
      const responseJson = await response.json()
      setTransactions(responseJson.transactions);
      setIsLoading(false);
    })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);
  const showRewardHandler = () => {
    let { rewardPoints, months } = calculatePoints(transactions);
    rewardPoints = Object.keys(rewardPoints).map((data) => ({
      userName: rewardPoints[data].userName,
      ...rewardPoints[data],
    }));
    if (months.length > 3) {
      setSelectMonth({ shouldShow: true, months })
      setSeletedMonth(months[0])
    }
    setRewardData(rewardPoints);
    setShowReward(true);
  };
  const handleChange = (e) => {
    const { value } = e.target;
    const valueNum = Number(value);
    const selectedMonthsIndex = selectMonth.months.indexOf(valueNum);
    setSeletedMonth(valueNum);
    if (selectedMonthsIndex !== undefined) {
      const selectedMonthsValues = selectMonth.months.slice(selectedMonthsIndex, selectedMonthsIndex + 3);
      let { rewardPoints } = calculatePoints(transactions, selectedMonthsValues)
      rewardPoints = Object.keys(rewardPoints).map((data) => ({
        userName: rewardPoints[data].userName,
        ...rewardPoints[data],
      }));
      setRewardData(rewardPoints);
      const selectMonthsString = selectedMonthsValues.map(value => months[value])
      const rewardHeader = ["S.No", "Name", ...selectMonthsString, "Total"];
      setRewardHeader(rewardHeader)
    }
  }
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

        {selectMonth.shouldShow && <div className="selectMonth">
          <p className="warning">More than three months trasactions are available select starting month to get reward points for 3 consecutive months</p>
          <label>Select starting month</label>
          <select value={seletedMonth} onChange={handleChange}>
            {selectMonth?.months.slice(0, -2).map(value => {
              const monthStr = months[value];
              return <option className='monthOption' value={value}>{monthStr}</option>
            })}
          </select>
        </div>}
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
