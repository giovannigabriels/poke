const formattedSpecies = (str) => {
  let arr = str.split(" ")
    arr.pop();

  const output = arr.join(" ");
  return output;
};
export default formattedSpecies;
