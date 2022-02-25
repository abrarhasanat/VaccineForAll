import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  isPerson: false,
  uid: null,
  login: () => {},
  logout: () => {},
  changeRule: () => {},
});
