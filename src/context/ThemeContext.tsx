import { THEME } from "@/constants/globalEnum";
import React, { PropsWithChildren, createContext, useState } from "react";

const ThemeContext = createContext({
  theme: THEME.LIGHT,
  toggleMode: () => {},
});

interface ThemeProps extends PropsWithChildren {}

export const ThemeContextProvider: React.FC<ThemeProps> = ({ children }) => {
  const [theme, setTheme] = useState(
    (window.localStorage.getItem("theme") as THEME) || THEME.LIGHT
  );
  const toggleMode = () => {
    setTheme((prev) => (prev === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));
    window.localStorage.setItem(
      "theme",
      theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
