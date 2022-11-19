import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signin = (token, callback) => {
    localStorage.setItem('token', token);

    callback();
  }

  const signout = (callback) => {
    setUser(null);
    localStorage.removeItem('token');

    callback();
  }

  const value = { user, setUser, signin, signout }
  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}