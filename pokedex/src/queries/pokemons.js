export const queryPokemon = `
query samplePokeAPIquery {
    pokemon_v2_pokemon(limit: 20) {
      name
      id
      pokemon_v2_pokemontypes(limit: 20) {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      height
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      weight
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

export const operationNamePokemon = "samplePokeAPIquery";
