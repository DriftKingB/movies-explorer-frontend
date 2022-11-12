import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Landing from "./Landing/Landing";
import Main from "./Main/Main";
import Saved from "./Saved/Saved";
import Profile from "./Profile/Profile";
import Register from "./Register/Register";
import Login from "./Login/Login";
import NotFound from "./NotFound/NotFound";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function App() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    setCurrentUser({ name: "User", email: "user@gmail.com"});
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing title="ME | Главная" />} />
          <Route path="/movies" element={<Main title="ME | Фильмы" />} />
          <Route path="/saved-movies" element={<Saved title="ME | Сохранённые фильмы" />} />
          <Route path="/profile" element={<Profile title="ME | Аккаунт" />} />
          <Route path="/signup" element={<Register title="ME | Регистрация" />} />
          <Route path="/signin" element={<Login title="ME | Вход" />} />
          <Route path="*" element={<NotFound title="404" />} />
        </Routes>
      </Router>
    </CurrentUserContext.Provider>
  );
}
