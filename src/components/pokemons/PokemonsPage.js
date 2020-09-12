/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import Spinner from '../common/Spinner';
import * as pokemonActions from '../../redux/actions/pokemonActions';
import PokemonList from './PokemonsList';

const PokemonsPage = ({
  pokemons, loadPokemons, loading, pokeTypes,
}) => {
  useEffect(() => {
    if (pokemons.length === 0) {
      loadPokemons().catch(error => {
        toast.error(`Loading pokemons fail: ${error.message}`, { autoClose: false });
      });
    }
  }, [pokemons]);

  return (
    <>
      <h2>Pokemons</h2>
      {pokeTypes}
      {loading
        ? <Spinner /> : (
          <>
            <PokemonList pokemons={pokemons} />
          </>
        )}
    </>
  );
};

PokemonsPage.propTypes = {
  pokemons: PropTypes.array.isRequired,
  loadPokemons: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pokeTypes: PropTypes.array.isRequired,
};

const filterTypes = pokemons => {
  const pokeTypes = pokemons.map(pokemon => (pokemon.types[0].type.name));
  return pokeTypes.filter((a, b) => pokeTypes.indexOf(a) === b);
};

// eslint-disable-next-line arrow-body-style
const mapStateToProps = state => {
  const pokeTypes = filterTypes(state.pokemons);
  return {
    pokemons: state.pokemons,
    loading: state.apiCallsInProgress > 0,
    pokeTypes,
  };
};

const mapDispatchToProps = dispatch => ({
  loadPokemons: bindActionCreators(pokemonActions.loadPokemons, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PokemonsPage);
