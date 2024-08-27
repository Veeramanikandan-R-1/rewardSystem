import React from "react";

const TableComponent = ({ tableHeader, tabledata }) => {
  console.log("tableHeader", tableHeader);
  return (
    <div class="TableContainer">
      <table class="table table-hover">
        <thead>
          <tr>
            {tableHeader.map((header, index) => {
              return <th scope="col">{header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {/* {tabledata.map((data, index) => {
            return (
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            );
          })} */}

          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
