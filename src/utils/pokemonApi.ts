import axios from 'axios';
import { Characteristic, Pokemon, PokemonClient, PokemonHabitat, PokemonSpecies } from 'pokenode-ts';

const client = new PokemonClient();


export const getPokemons = async (offset: number) => {
  const data = await client.listPokemons(
    offset,
    20,
  );
  const pokemons = data.results;
  const count = data.count;

  return { pokemons, count };
};

export const getPokemonByName = async (name: string) => {
  const data = await client.getPokemonByName(name);
  const pokemon = data;

  return pokemon;
}

const filterEvolutionChain = (evolvesTo: any) => {
  return evolvesTo.map((evolve: any) => {
    const names = [evolve.species.name]; // Agregar el nombre de la especie actual
    if (evolve.evolves_to && evolve.evolves_to.length > 0) {
      // Recursivamente obtener los nombres de las evoluciones siguientes
      const nestedNames = filterEvolutionChain(evolve.evolves_to);
      names.push(...nestedNames); // Agregar los nombres de las evoluciones siguientes al array
    }
    return names; // Devolver un array de strings
  }).flat(); // Aplanar el array de arrays
}

export const getAllPokemonData = async (name: string) => {
  const pokemon = await getPokemonByName(name);
  const characteristic = await client.getCharacteristicById(pokemon.id);
  const habitat = await client.getPokemonHabitatById(pokemon.id);
  const species = await client.getPokemonSpeciesById(pokemon.id);
  const getEvolutionChain = await axios.get(species.evolution_chain.url);
  const evolutionChainList = filterEvolutionChain(getEvolutionChain.data.chain.evolves_to);

  let evolutionChain: any = [];
  for (let evolutionName of evolutionChainList) {

    const pokemonEvolution = await client.getPokemonByName(evolutionName);
    const id = pokemonEvolution.id;
    const imageSrc = pokemonEvolution.sprites.other?.['official-artwork'].front_default;
    evolutionChain.push({
      id,
      name: evolutionName,
      imageSrc,
    });
  }

  const pokemonDetails = generatePokemonDetails({ pokemon, habitat, species, characteristic });

  console.log(evolutionChain);
  return { characteristic, pokemon, pokemonDetails, habitat, evolutionChain };
}
export type TextTransform = 'text-capitalize' | 'text-uppercase' | 'text-lowercase';

export type pokemonDetails = {
  key: string;
  value: string | number;
  textTransform?: TextTransform;
  decoration?: string;
}

interface pokemonDetailsProps {
  pokemon: Pokemon;
  habitat: PokemonHabitat;
  species: PokemonSpecies;
  characteristic: Characteristic;

}
const generatePokemonDetails = ({ pokemon, habitat, species, characteristic }: pokemonDetailsProps) => {
  const details: pokemonDetails[] = [
    {
      key: 'Nombre',
      value: pokemon.name,
      textTransform: 'text-capitalize',
    },
    {
      key: 'Altura',
      value: conversionFtToCm(pokemon.height),
      decoration: 'cm',
    },
    {
      key: 'Peso',
      value: conversionLbToKg(pokemon.weight),
      decoration: 'kg',

    },
    {
      key: 'Experiencia base',
      value: pokemon.base_experience,
    },
    {
      key: 'Habitat',
      value: habitat.names.find((name) => name.language.name === 'es')?.name || 'No hay hábitat',
      textTransform: 'text-capitalize',
    },
    {
      key: 'Color',
      value: species.color.name,
      textTransform: 'text-capitalize',
    },
    {
      key: 'Característica',
      value: characteristic.descriptions.find((description) => description.language.name === 'es')?.description || 'No hay descripción',
    },
  ];

  return details;
}

const conversionFtToCm = (ft: number) => {
  return (ft * 30.48).toFixed(1);
}

const conversionLbToKg = (lb: number) => {
  return (lb * 0.453592).toFixed(1);
}