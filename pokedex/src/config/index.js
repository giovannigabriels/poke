const fetchData = async (operationName, query) => {
  const endpoint = "https://beta.pokeapi.co/graphql/v1beta";

  const headers = {
    "Content-Type": "application/json",
    "X-Method-Used": "graphiql",
  };

  const graphqlQuery = {
    operationName,
    query,
  };

  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(graphqlQuery),
  };

  return await fetch(endpoint, options).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    return response.json();
  });
};

export default fetchData;
