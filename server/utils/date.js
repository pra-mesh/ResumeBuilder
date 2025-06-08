const getRefreshTokenDuration = () => {
  const numberOfDays = +process.env.JWT_RT_DURATION_IN_DAYS;
  const currentDate = new Date();
  const futureDate = new Date(currentDate);
  futureDate.setDate(futureDate.getDate() + numberOfDays);
  return futureDate.toISOString();
};
module.exports = { getRefreshTokenDuration };
