export const querySpecies = (id) => {
  return `query MyQuery {
        pokemon_v2_pokemonspeciesname(where: {pokemon_species_id: {_in: ${id}}, pokemon_v2_language: {name: {_eq: "en"}}}) {
          name
          genus
        }
      }`;
};
