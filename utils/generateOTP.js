const generateOTP = () => {
  return Math.random().toString(10).slice(2, 6);
};

export { generateOTP };
