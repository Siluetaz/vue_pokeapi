import { PokemonClient } from 'pokenode-ts';

const client = new PokemonClient();


export const getTypeByName = async (name: string) => {
  const data = await client.getTypeByName(
    name
  );

  return data;
};