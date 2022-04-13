import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
    loading: false,
    currentUser: null,
    searchQuery: null,
    searchResult: [],
});

export const setLoading = (isLoading) => {
    setGlobalState('loading', (v) => isLoading);
};

export const setCurrentUser = (user) => {
    setGlobalState('currentUser', (v) => user);
};

export const setSearchQuery = (query) => {
    setGlobalState('searchQuery', (v) => query);
};

export const setSearchResult = (result) => {
    setGlobalState('searchResult', (v) => result);
};

export const resetSearch = () => {
    setGlobalState('searchQuery', (v) => null);
    setGlobalState('searchResult', (v) => []);
};

export { useGlobalState };