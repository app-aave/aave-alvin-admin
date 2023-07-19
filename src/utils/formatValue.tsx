export const formatNumber = (
  number: number,
  minPrecision = 2,
  maxPrecision = 4
) => {
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision,
  };
  return number.toLocaleString(undefined, options);
};

export const getBalanceNumber = (balance: number | string) => {
  return Number(balance);
};
