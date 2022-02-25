import { createContext } from "react";

export const personContext = createContext({
  isPersonLoggedIn: false, 
  personId: null,
  personLogin: () => {},
  personLogout: () => {},
});
