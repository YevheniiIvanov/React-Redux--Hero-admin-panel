export const heroesFetching = () => ({type: 'HEROES_FETCHING'});
export const heroesFetched = (heroes) => ({type: 'HEROES_FETCHED', payload: heroes});
export const heroesFetchingError = () => ({type: 'HEROES_FETCHING_ERROR'});

export const filtersFetching = () => ({type: 'FILTERS_FETCHING'});
export const filtersFetched = (filters) => ({type: 'FILTERS_FETCHED', payload: filters});
export const filtersFetchingError = () => ({type: 'FILTERS_FETCHING_ERROR'});

export const deleteHero = (id) => ({type: 'HEROES_DELETE', payload: id});
export const heroCreated = (newHero) => ({type: 'HERO_CREATED', payload: newHero});

export const activeFilterChanged = (name) => ({type: 'ACTIVE_FILTER_NAME', payload: name});
