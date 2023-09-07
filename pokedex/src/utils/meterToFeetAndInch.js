const meterToFeetAndInches = (meter) => {
  const feet = Math.floor(meter * 3.28084);
  const inches = parseFloat((meter * 3.28084 - feet) * 12).toFixed(1);

  return `${feet}'${inches}"`;
};

export default meterToFeetAndInches;
