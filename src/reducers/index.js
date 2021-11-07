
const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle', 
    filters: [],
    filtersLoadingStatus: 'idle',
    activeName: 'all',
    filtredHeroes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            };
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                filtredHeroes: state.activeName === 'all' ? action.payload : action.payload.filter(item => item.element === state.activeName),
                heroesLoadingStatus: 'idle'
            };
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            };
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            };
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            };
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            };
        case 'HEROES_DELETE':
            return {
                ...state,
                heroes: state.heroes.filter(item => item.id !== action.payload)
            };
        case 'HERO_CREATED':
            let newCreatedHeroList = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: newCreatedHeroList,
                filtredHeroes: state.activeName === 'all' ? newCreatedHeroList : newCreatedHeroList.filter(item => item.element === state.activeName)
            };
        case 'ACTIVE_FILTER_NAME':
            return {
                ...state, 
                activeName: action.payload,
                filtredHeroes: action.payload === 'all' ? state.heroes : state.heroes.filter(item => item.element === action.payload)
            }
        default: return state
    }
}

export default reducer;