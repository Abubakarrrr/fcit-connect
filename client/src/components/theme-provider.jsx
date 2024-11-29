import { createContext, useContext, useEffect, useState } from "react";

const initialState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setThemeState] = useState(() => {
    // Load the theme from localStorage or use the default
    return localStorage.getItem(storageKey) || defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove any existing theme classes to avoid conflicts
    root.classList.remove("light", "dark");

    if (theme === "system") {
      // Determine the system preference
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else if (["light", "dark"].includes(theme)) {
      // Add the selected theme class
      root.classList.add(theme);
    }
  }, [theme]);

  const setTheme = (newTheme) => {
    if (!["light", "dark", "system"].includes(newTheme)) {
      console.warn(`Invalid theme: ${newTheme}`);
      return;
    }
    // Save the new theme to localStorage and update state
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
  };

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
