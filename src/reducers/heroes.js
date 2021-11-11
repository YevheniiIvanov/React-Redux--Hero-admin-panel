import { createReducer } from "@reduxjs/toolkit";

import { heroesFetching,
         heroesFetched,
         heroesFetchingError,
         heroCreated,
         deleteHero 
        } from "../actions"; 

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

// TOOLKIT doing with native javascript
// const heroes = createReducer(initialState, {
//     [heroesFetching] : state => {
//                     state.heroesLoadingStatus = 'loading';
//                 },
//     [heroesFetched] : (state, action) => {
//                     state.heroesLoadingStatus = 'idle';
//                     state.heroes = action.payload;
//                 },
//     [heroesFetchingError] : state => {
//                     state.heroesLoadingStatus = 'error';
//                 },
//     [heroCreated] : (state, action) => {
//                     state.heroes.push(action.payload);
//                 },
//     [deleteHero] : (state, action) => {
//                     state.heroes = state.heroes.filter(item => item.id !== action.payload);
//                 }
//         },
//     [],
//     state => state
// )

// TOOLKIT can work with TypeScript
const heroes = createReducer(initialState, builder => {
    builder
        .addCase(heroesFetching, state => {
            state.heroesLoadingStatus = 'loading';
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        })
        .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus = 'error';
        })
        .addCase(deleteHero, (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        })
        .addCase(heroCreated, (state, action) => {
            state.heroes.push(action.payload);
        })
        .addDefaultCase(() => {})
})

// Without TOOLKIT
// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             };
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             };
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             };
//         case 'HEROES_DELETE':
//             return {
//                 ...state,
//                 heroes: state.heroes.filter(item => item.id !== action.payload),
//             };
//         case 'HERO_CREATED':
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload]
//             };
//         default: return state
//     }
// }

export default heroes;