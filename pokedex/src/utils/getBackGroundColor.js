const backgroundColor = (arr) => {
  if (arr.length > 0) {
    const typeName = arr[0].pokemon_v2_type.name;
    switch (typeName) {
      case "grass":
        return "#48CFB2";
      case "fire":
        return "#FA6C6C";
      case "water":
        return "#6890F0";
      case "bug":
        return "#A8B820";
      case "normal":
        return "#A8A878";
    }
  }
};

export default backgroundColor;
