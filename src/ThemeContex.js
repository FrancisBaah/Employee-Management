import { createContext, useState } from "react";

// Create the ThemeContext
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [lightOrDark, setLightOrDark] = useState("light");

  return (
    <ThemeContext.Provider
      value={{
        lightOrDark,
        setLightOrDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
