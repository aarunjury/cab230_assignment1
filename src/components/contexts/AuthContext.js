import { createContext } from "react";

export const AuthContext = createContext({
  authorised: null,
  setAuth: () => {},
});
