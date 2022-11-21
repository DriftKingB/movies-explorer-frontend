import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../hoc/AuthProvider";
import ProtectedRoute from "../hoc/ProtectedRoute";

import Landing from "./Landing/Landing";
import Saved from "./Saved/Saved";
import Profile from "./Profile/Profile";
import Register from "./Register/Register";
import Login from "./Login/Login";
import NotFound from "./NotFound/NotFound";
import Movies from "./Movies/Movies";

import auth from "../utils/Auth";
import api from "../utils/Api";
import moviesApi from "../utils/MoviesApi";
import useMoviesFilter from "../hooks/useMoviesFilter";
import { customErrors, moviesBaseUrl, popupMessages } from "../utils/constants";

export default function App() {
  const {
    setUser, signin, signout,
    savedMovies, searchState, tokenIsPresent, updateSearchState, updateSavedMovies,
  } = useContext(AuthContext);
  const [ cards, setCards ] = useState(null);

  const [ responseMessage, setResponseMessage ] = useState(null);
  const [ sideBarIsOpen, setSideBarState ] = useState(false);
  const [ popupMessage, setPopupMessage ] = useState(null);
  const [ albumIsLoading, setAlbumState ] = useState(false);

  useEffect(() => {
    if (tokenIsPresent) {
      getUserInfo();
      getSavedMovies();
    }
  }, [tokenIsPresent]);

  useEffect(() => {
    const timer =  setTimeout(() => setPopupMessage(null), 2500);

    return () => {
      clearTimeout(timer);
    }
  }, [popupMessage])


  function handleResponseError({ data, res }) {
    res?.status === 401 && signout();

    setResponseMessage(`Ошибка: ${data?.message?.toLowerCase()}`);
  }

  function handleSignout(redirectFunc) {
    auth.logout()
      .then(() => {
        signout();
        redirectFunc();
      })
      .catch(handleResponseError);
  }

  function handleProfileSubmit(inputs, loadingFunc) {
    const { name, email } = inputs;

    loadingFunc(true);
    api.updateUserInfo(name.value, email.value)
      .then(({ data }) => {
        setUser(data);
        setPopupMessage(popupMessages.profileEdit);
      })
      .catch(handleResponseError)
      .finally(() => loadingFunc(false));
  }

  function handleSignupSubmit(inputs, loadingFunc, redirectFunc) {
    const { name, email, password } = inputs;

    loadingFunc(true);
    auth.register(name.value, email.value, password.value)
      .then(() => {
        signin();
        redirectFunc();
      })
      .catch(handleResponseError)
      .finally(() => loadingFunc(false));
  }

  function handleSigninSubmit(inputs, loadingFunc, redirectFunc) {
    const { email, password } = inputs;

    loadingFunc(true);
    auth.login(email.value, password.value)
      .then(() => {
        signin();
        redirectFunc();
      })
      .catch(handleResponseError)
      .finally(() => loadingFunc(false));
  }

  function handleMoviesSearch(keyWord, shortsChecked) {
    if (searchState.movies) {
      if (searchState.keyWord === keyWord && searchState.shortsChecked === shortsChecked) {
        return
      }

      const filteredMovies = useMoviesFilter({ movies: searchState.movies, keyWord, shortsChecked });

      updateSearchState({ movies: searchState.movies, keyWord, shortsChecked })
      renderFilteredMovies(filteredMovies);
    } else {
      setAlbumState(true);
      moviesApi.getMovies()
        .then(movies => {
          updateSearchState({ movies, keyWord, shortsChecked });
          return useMoviesFilter({ movies, keyWord, shortsChecked });
        })
        .then(movies => renderFilteredMovies(movies))
        .catch(handleResponseError)
        .finally(() => setAlbumState(false));
    }
  }

  function handleSavedMoviesSearch(keyWord, shortsChecked) {
    const moviesToRender = useMoviesFilter({ movies: savedMovies, keyWord, shortsChecked });

    setCards(moviesToRender);
  }

  function renderFilteredMovies(movies) {
    if (movies.length === 0) {
      setResponseMessage(customErrors.movieNotFound);
      return
    }

    const moviesToRender = movies.map(searched => {
      if (savedMovies.some(saved => saved.id === searched.id)) {
        searched.isLiked = true;
      }
      return searched
    });

    setCards(moviesToRender);
  }

  function getUserInfo() {
    api.getUserInfo()
      .then(({ data }) => setUser(data))
      .catch(handleResponseError);
  }

  function getSavedMovies({ render = false } = {}) {
    if (!savedMovies || savedMovies.length === 0) {
      api.getMovies()
      .then(({ data }) => {
        updateSavedMovies(data);
        render && setCards(data)
      })
      .catch(handleResponseError);
    } else {
      render && setCards(savedMovies);
    }
  }

  function getMovies() {
    if (!searchState?.movies || searchState?.movies?.length === 0) {
      setCards([]);
      return
    }

    const moviesToRender = searchState.movies?.map(searched => {
      if (savedMovies.some(saved => saved.id === searched.id)) {
        searched.isLiked = true;
      }
      return searched
    })
      setCards(moviesToRender);
  }

  function handleCardLike(movie, likeFunc) {
    const { country, director, duration, year, description, trailerLink, nameRU, nameEN } = movie;
    const imageLink = `${moviesBaseUrl}${movie.image.url}`;
    const thumbnailLink = `${moviesBaseUrl}${movie.image.formats.thumbnail.url}`;

    api.saveMovie({ id: movie.id, country, director, duration, year, description, trailerLink, image: imageLink, thumbnail: thumbnailLink, nameRU, nameEN  })
      .then(({ data }) => {
        const moviesToRender = [ ...savedMovies, data ];

        likeFunc(true);
        updateSavedMovies(moviesToRender);
        setPopupMessage(popupMessages.cardLike)
      })
      .catch(handleResponseError);
  }

  function handleCardDislike({ movie, likeFunc, render = false } = {}) {
    api.removeMovie(movie.id)
      .then(({ data }) => {
        const moviesToRender = savedMovies.slice();

        moviesToRender.forEach((movie, index)  => {
          if (movie.id === data.id) {
            moviesToRender.splice(index, 1);
            movie.isLiked = false;
          }
        });

        render ? setCards(moviesToRender) : likeFunc(false);
        updateSavedMovies(moviesToRender);
        setPopupMessage(popupMessages.cardDislike);
      })
      .catch(handleResponseError);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Landing
              title="ME | Главная"
              sideBarIsOpen={sideBarIsOpen}
              setSideBarState={setSideBarState}
              popupMessage={popupMessage}
              setPopupMessage={setPopupMessage}
            />
          }/>

        <Route path="/movies" element={
          <ProtectedRoute
            component={Movies}
            title="ME | Фильмы"
            cards={cards}
            getMovies={getMovies}
            onSearch={handleMoviesSearch}
            onCardLike={handleCardLike}
            onCardDislike={handleCardDislike}
            sideBarIsOpen={sideBarIsOpen}
            setSideBarState={setSideBarState}
            albumIsLoading={albumIsLoading}
            responseMessage={responseMessage}
            popupMessage={popupMessage}
          />
        }/>
        <Route path="/saved-movies" element={
          <ProtectedRoute
            component={Saved}
            title="ME | Сохранённые фильмы"
            cards={cards}
            getSavedMovies={getSavedMovies}
            onCardDislike={handleCardDislike}
            onSearch={handleSavedMoviesSearch}
            sideBarIsOpen={sideBarIsOpen}
            setSideBarState={setSideBarState}
            albumIsLoading={albumIsLoading}
            responseMessage={responseMessage}
            popupMessage={popupMessage}
          />
        }/>
        <Route path="/profile" element={
          <ProtectedRoute
            component={Profile}
            title="ME | Аккаунт"
            sideBarIsOpen={sideBarIsOpen}
            setSideBarState={setSideBarState}
            onEdit={handleProfileSubmit}
            onSignout={handleSignout}
            responseMessage={responseMessage}
            setResponseMessage={setResponseMessage}
            popupMessage={popupMessage}
          />
        }/>

        <Route path="/signup" element={
          <Register
            title="ME | Регистрация"
            onSignup={handleSignupSubmit}
            responseMessage={responseMessage}
            setResponseMessage={setResponseMessage}
          />
        }/>
        <Route path="/signin" element={
          <Login
            title="ME | Вход"
            onSignin={handleSigninSubmit}
            responseMessage={responseMessage}
            setResponseMessage={setResponseMessage}
          />
        }/>
        <Route path="*" element={<NotFound title="404" />} />
      </Routes>
    </Router>
  );
}
