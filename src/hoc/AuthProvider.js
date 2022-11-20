import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [ user, setUser ] = useState(null);
  const [ tokenIsPresent, setTokenState ] = useState(localStorage.getItem('tokenIsPresent') ?? false);
  const [ savedMovies, setSavedMovies ] = useState(JSON.parse(localStorage.getItem('savedMovies')) ?? []);
  const [ searchState, setSearchState ] = useState(JSON.parse(localStorage.getItem('searchState')) ?? {});

  function updateSavedMovies(movies) {
    setSavedMovies(movies);
    localStorage.setItem('savedMovies', JSON.stringify(movies));
  }

  function updateSearchState(searchState) {
    setSearchState(searchState);
    localStorage.setItem('searchState', JSON.stringify(searchState));
  }

  function updateTokenState(tokenIsPresent) {
    setTokenState(tokenIsPresent);
    localStorage.setItem('tokenIsPresent', tokenIsPresent);
  }

  function signin() {
    updateTokenState('true');
  }

  function signout () {
    setUser(null);
    setSearchState({});
    setSavedMovies([]);
    setTokenState(false);

    localStorage.removeItem('tokenIsPresent');
    localStorage.removeItem('searchState');
    localStorage.removeItem('savedMovies');
  }

  const value = {
    user, savedMovies, searchState, tokenIsPresent,
    setUser, signin, signout, updateSavedMovies, updateSearchState, updateTokenState,
  };

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}