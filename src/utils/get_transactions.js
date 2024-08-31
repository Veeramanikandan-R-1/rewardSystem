export const getTrasactions = () => {
  try {
    return fetch('transactions.json')
  } catch (err) {
    throw new Error("Error Occured while getting Transactions data");
  }
};
