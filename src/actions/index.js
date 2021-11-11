// import { createAction } from "@reduxjs/toolkit";

import {heroesFetched, heroesFetchingError, heroesFetching } from '../components/heroesList/heroesSlice';
import {filtersFetching, filtersFetched, filtersFetchingError } from '../components/heroesFilters/filtersSlice';

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const filterHeroes = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()))
}

// export const heroesFetching = createAction('HEROES_FETCHING');
// export const heroesFetched = createAction('HEROES_FETCHED');
// export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');

// export const heroesFetching = () => ({type: 'HEROES_FETCHING'});
// export const heroesFetched = (heroes) => ({type: 'HEROES_FETCHED', payload: heroes});
// export const heroesFetchingError = () => ({type: 'HEROES_FETCHING_ERROR'});

// export const filtersFetching = () => ({type: 'FILTERS_FETCHING'});
// export const filtersFetched = (filters) => ({type: 'FILTERS_FETCHED', payload: filters});
// export const filtersFetchingError = () => ({type: 'FILTERS_FETCHING_ERROR'});

// export const deleteHero = createAction('HEROES_DELETE');
// export const heroCreated = createAction('HERO_CREATED');
// export const deleteHero = (id) => ({type: 'HEROES_DELETE', payload: id});
// export const heroCreated = (newHero) => ({type: 'HERO_CREATED', payload: newHero});

// export const activeFilterChanged = (name) => ({type: 'ACTIVE_FILTER_NAME', payload: name});
