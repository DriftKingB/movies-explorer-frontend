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
  const { signin, setUser, signout } = useContext(AuthContext);
  const [ cards, setCards ] = useState(null);

  const savedMovies = JSON.parse(localStorage.getItem('saved-movies')) ?? [];
  const searchedMovies = JSON.parse(localStorage.getItem('searchState'))?.movies ?? [];

  const [ responseMessage, setResponseMessage ] = useState(null);
  const [ sideBarIsOpen, setSideBarState ] = useState(false);
  const [ albumIsLoading, setAlbumState ] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      getUserInfo();
    }
  }, []);

  function handleSignout(redirectFunc) {
    signout(redirectFunc);
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
      .then(({ data }) => {
        signin(data, redirectFunc);
        getUserInfo();
      })
      .catch(setResponseMessage)
      .finally(() => loadingFunc(false));
  }

  function handleSigninSubmit(inputs, loadingFunc, redirectFunc) {
    const { email, password } = inputs;

    loadingFunc(true);
    auth.login(email.value, password.value)
      .then(({ data }) => {
        signin(data, redirectFunc);
        getUserInfo();
      })
      .catch(setResponseMessage)
      .finally(() => loadingFunc(false));
  }

  function handleMoviesSearch(keyWord, shortsChecked) {
    setAlbumState(true);
    moviesApi.getMovies()
      .then(movies => useMoviesFilter({ movies, keyWord, shortsChecked }))
      .then(movies => {
        localStorage.setItem('searchState', JSON.stringify({ keyWord, shortsChecked, movies }));

        if (movies.length === 0) {
          setResponseMessage(customErrors.movieNotFound);
          return
        }

        const moviesToRender = movies.map(searched => {
          if (savedMovies.some(saved => saved.movieId === searched.id)) {
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
        setCards(data);
        localStorage.setItem('saved-movies', JSON.stringify(data));
      })
      .catch(setResponseMessage);
  }

  function getMovies() {
    if (searchedMovies.length === 0) {
      return
    }

    api.getMovies()
      .then(({ data }) => {
        const moviesToRender = searchedMovies.map(searched => {
          if (data.some(saved => saved.movieId === searched.id)) {
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

    api.saveMovie({ movieId: movie.id, country, director, duration, year, description, trailerLink, image: imageLink, thumbnail: thumbnailLink, nameRU, nameEN  })
      .catch(console.log);
  }

  function handleCardDislike(movie) {
    api.removeMovie(movie.id ?? movie.movieId)
      .catch(console.log);
  }

  function handleCardRemove(movie) {
    api.removeMovie(movie.movieId)
      .then(({ data }) => {
        const moviesToRender = cards.slice();

        moviesToRender.forEach((movie, index)  => {
          if (movie.movieId === data.movieId) {
            moviesToRender.splice(index, 1);
          }
        });

        setCards(moviesToRender);
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
            getSavedMovies={getSavedMovies}
            onCardRemove={handleCardRemove}
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
