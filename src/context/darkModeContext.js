import { createContext, useReducer, useEffect } from "react";
import DarkModeReducer from "./darkModeReducer";

const INITIAL_STATE = {
  darkMode: JSON.parse(localStorage.getItem("darkMode") || false),
};

export const DarkModeContext = createContext(INITIAL_STATE);

export const DarkModeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
    console.log(state.darkMode);
  }, [state.darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
};
