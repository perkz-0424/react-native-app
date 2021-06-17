import React, { useState } from "react";
import defaultStyle from "../../assets/styles/default/style";

const ThemeContext = React.createContext();
const Provider = ThemeContext.Provider;
const themes = { "default": defaultStyle };
const Theme = ({ children }) => {
  const [theme, changeTheme] = useState("default");
  return (
    <Provider value={{ theme: themes[theme], themeName: theme, changeTheme }}>
      {children}
    </Provider>
  );
};

export { ThemeContext };
export default Theme;
