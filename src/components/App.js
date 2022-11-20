import {
  BrowserRouter as Router,
  Route,
  Routes
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
import { customErrors, moviesBaseUrl } from "../utils/constants";

export default function App() {
  const {
    setUser, signin, signout,
    savedMovies, searchState, tokenIsPresent, updateSearchState, updateSavedMovies,
  } = useContext(AuthContext);
  const [ cards, setCards ] = useState(null);

  const [ responseMessage, setResponseMessage ] = useState(null);
  const [ sideBarIsOpen, setSideBarState ] = useState(false);
  const [ albumIsLoading, setAlbumState ] = useState(false);

  useEffect(() => {
    if (tokenIsPresent) {
      getUserInfo();
      getSavedMovies();
    }
  }, [tokenIsPresent]);

  function handleSignout(redirectFunc) {
    auth.logout()
      .then(() => {
        signout();
        redirectFunc();
      })
      .catch(setResponseMessage);
  }

  function handleProfileSubmit(inputs, loadingFunc) {
    const { name, email } = inputs;

    loadingFunc(true);
    api.updateUserInfo(name.value, email.value)
      .then(({ data }) => setUser(data))
      .catch(setResponseMessage)
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
      .catch(setResponseMessage)
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
      .catch(setResponseMessage)
      .finally(() => loadingFunc(false));
  }

  function handleMoviesSearch(keyWord, shortsChecked) {
    setAlbumState(true);
    moviesApi.getMovies()
      .then(movies => useMoviesFilter({ movies, keyWord, shortsChecked }))
      .then(movies => {
        updateSearchState({ movies, keyWord, shortsChecked })

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
      })
      .catch(setResponseMessage)
      .finally(() => setAlbumState(false));
  }

  function getUserInfo() {
    api.getUserInfo()
      .then(({ data }) => setUser(data))
      .catch(setResponseMessage);
  }

  function getSavedMovies() {
    api.getMovies()
      .then(({ data }) => {
        updateSavedMovies(data);
      })
      .catch(setResponseMessage);
  }

  function renderSavedMovies() {
    api.getMovies()
      .then(({ data }) => {
        setCards(data);
        updateSavedMovies(data);
      })
      .catch(setResponseMessage);
  }

  function getMovies() {
    console.log(searchState)
    if (!searchState?.movies || searchState?.movies?.length === 0) {
      setCards([]);
      return
    }

    api.getMovies()
      .then(({ data }) => {
        const moviesToRender = searchState.movies?.map(searched => {
          if (data.some(saved => saved.id === searched.id)) {
            searched.isLiked = true;
          }
          return searched
        });

        setCards(moviesToRender);
      })
      .catch(console.log);
  }

  function handleCardLike(movie) {
    const { country, director, duration, year, description, trailerLink, nameRU, nameEN } = movie;
    const imageLink = `${moviesBaseUrl}${movie.image.url}`;
    const thumbnailLink = `${moviesBaseUrl}${movie.image.formats.thumbnail.url}`;

    api.saveMovie({ id: movie.id, country, director, duration, year, description, trailerLink, image: imageLink, thumbnail: thumbnailLink, nameRU, nameEN  })
      .then(({ data }) => {
        const moviesToRender = [ ...savedMovies, data ];

        updateSavedMovies(moviesToRender);
      })
      .catch(console.log);
  }

  function handleCardDislike(movie, removeCardFromList = false) {
    api.removeMovie(movie.id)
      .then(({ data }) => {
        const moviesToRender = savedMovies.slice();

        moviesToRender.forEach((movie, index)  => {
          if (movie.id === data.id) {
            moviesToRender.splice(index, 1);
          }
        });

        updateSavedMovies(moviesToRender);
        if (removeCardFromList) {
          setCards(moviesToRender);
        }
      })
      .catch(console.log);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Landing
              title="ME | Главная"
              sideBarIsOpen={sideBarIsOpen}
              setSideBarState={setSideBarState}
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
          />
        }/>
        <Route path="/saved-movies" element={
          <ProtectedRoute
            component={Saved}
            title="ME | Сохранённые фильмы"
            cards={cards}
            setCards={setCards}
            renderSavedMovies={renderSavedMovies}
            onCardDislike={handleCardDislike}
            sideBarIsOpen={sideBarIsOpen}
            setSideBarState={setSideBarState}
            albumIsLoading={albumIsLoading}
            responseMessage={responseMessage}
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
