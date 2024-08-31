import React from "react";

export const TransactionsTable = ({ tableHeader, tabledata }) => {
  return (
    <div class="TableContainer" data-testid='table-component'>
      <table class="table table-hover">
        <thead>
          <tr>
            {tableHeader?.map((header, index) => {
              return <th scope="col">{header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {tabledata?.map((data, index) => {
            return (
              <tr>
                <th scope="row">{index+1}</th>
                <td>{data.userName}</td>
                <td>{data.date}</td>
                <td>{data.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};




export const RewardTable = ({ tableHeader, tabledata }) => {
    return (
      <div class="TableContainer" data-testid="table-container">
        <table class="table table-hover ">
          <thead>
            <tr>
              {tableHeader?.map((header, index) => {
                return <th scope="col">{header}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {tabledata?.map((data, index) => {
              return (
                <tr>
                  <th scope="row">{index+1}</th>
                  <td>{data.userName}</td>
                  <td>{data['06'] || "--"}</td>
                  <td>{data['07']|| "--"}</td>
                  <td>{data['08']|| "--"}</td>
                  <td>{data.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };