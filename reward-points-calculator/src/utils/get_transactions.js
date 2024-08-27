const transactions = [
    { customerId: 'C001', date: '2024-06-15', amount: 120, userName: 'User1' },
    { customerId: 'C002', date: '2024-06-18', amount: 75, userName: 'User2' },
    { customerId: 'C001', date: '2024-07-21', amount: 200, userName: 'User1' },
    { customerId: 'C003', date: '2024-07-11', amount: 60, userName: 'User3' },
    { customerId: 'C002', date: '2024-08-05', amount: 50, userName: 'User2' },
    { customerId: 'C003', date: '2024-08-19', amount: 150, userName: 'User3' },
    { customerId: 'C001', date: '2024-06-13', amount: 90, userName: 'User1' },
    { customerId: 'C002', date: '2024-06-15', amount: 175, userName: 'User2' },
    { customerId: 'C001', date: '2024-07-24', amount: 310, userName: 'User1' },
    { customerId: 'C003', date: '2024-07-11', amount: 607, userName: 'User3' },
    { customerId: 'C002', date: '2024-08-01', amount: 500, userName: 'User2' },
    { customerId: 'C003', date: '2024-08-29', amount: 550, userName: 'User3' }
];

export const getTrasactions = async () => {
    try {
     
      return new Promise((res, rej) => {
       setTimeout(() => res({data:transactions}), 3000)
      })
    } catch (err) {
      throw new Error("Error Occured while getting Transactions data");
    }
};
  