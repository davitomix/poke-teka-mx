/* eslint-disable max-len */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Doughnut } from 'react-chartjs-2';
import { newPokemon } from '../../tools/mockData';
import capitalizeWord from '../../tools/capitalizeWord';
import navbarTab from '../themes';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  backButton: {
    margin: '20px 0',
  },
  ulStyle: {
    padding: 0,
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const setDonutData = (att, def, hp, speed) => ({
  labels: [
    'Attack',
    'Defense',
    'Hp',
    'Speed',
  ],
  datasets: [{
    data: [att, def, hp, speed],
    backgroundColor: [
      '#FF6384',
      '#FFCE56',
      '#3fdb63',
      '#36A2EB',
    ],
    hoverBackgroundColor: [
      '#FF6384',
      '#FFCE56',
      '#3fdb63',
      '#36A2EB',
    ],
  }],
});

const PokemonDetail = ({ pokemon }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h1>{capitalizeWord(pokemon.name)}</h1>
            <img src={pokemon.sprites.other['official-artwork'].front_default} height="350px" width="300px" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <img src={pokemon.sprites.back_default} height="150px" width="150px" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <img src={pokemon.sprites.front_default} height="150px" width="150px" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <h2>Abilities</h2>
            <ul className={classes.ulStyle}>
              {pokemon.abilities.map(ability => (
                <li key={ability.ability.url}>{capitalizeWord(ability.ability.name)}</li>
              ))}
            </ul>
          </Paper>
          <Paper className={classes.paper}>
            <h2>Height</h2>
            {pokemon.height}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <h2>Types</h2>
            <ul className={classes.ulStyle}>
              {pokemon.types.map(type => (
                <li key={type.type.url}>{capitalizeWord(type.type.name)}</li>
              ))}
            </ul>
          </Paper>
          <Paper className={classes.paper}>
            <h2>Weight</h2>
            {pokemon.weight}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h2>Stats</h2>
            <Doughnut data={setDonutData(pokemon.stats[0].base_stat, pokemon.stats[2].base_stat, pokemon.stats[1].base_stat, pokemon.stats[5].base_stat)} />
          </Paper>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" className={classes.backButton}>
        <Link to="/pokemons/" style={navbarTab}>Back</Link>
      </Button>
    </div>
  );
};

PokemonDetail.propTypes = {
  pokemon: PropTypes.object.isRequired,
};

export function getPokemonByName(pokemons, name) {
  return pokemons.find(pokemon => pokemon.name === name) || null;
}

const mapStateToProps = (state, ownProps) => {
  const { name } = ownProps.match.params;
  const pokemon = name && state.pokemons.length > 0
    ? getPokemonByName(state.pokemons, name)
    : newPokemon;
  return {
    pokemons: state.pokemons,
    pokemon,
  };
};

export default connect(mapStateToProps)(PokemonDetail);
