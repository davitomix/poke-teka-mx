/* eslint-disable import/prefer-default-export */
import { handleResponse, handleError } from './apiUtils';

const baseUrl = 'https://pokeapi.co/api/v2/';

const getPokemonsArray = () => {
  const max = 200; const min = 1;
  const pokeIdArray = [];
  let randId;
  for (let i = 0; i < 16; i += 1) {
    randId = Math.floor(Math.random() * (max - 1)) + min;
    pokeIdArray.push(randId);
  }
  return pokeIdArray.filter((a, b) => pokeIdArray.indexOf(a) === b);
};

const getPokemon = async pokemon => {
  try {
    const response = await fetch(`${baseUrl}pokemon/${pokemon}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// eslint-disable-next-line max-len
export const getPokemons = async () => Promise.all(getPokemonsArray().map(pokeId => getPokemon(pokeId)));