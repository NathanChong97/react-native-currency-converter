import React, { useState, useContext } from 'react';
import { Provider } from '@react-native-material/core';

export type ThemeType = 'light' | 'dark'

export type ThemeContextType = {
    theme: ThemeType;
    toggleTheme: () => void;
    changeTheme: (value: ThemeType) => void;
}

export const ThemeContext = React.createContext<ThemeContextType>({
    theme: 'light',
    toggleTheme: () => { },
    changeTheme: (value) => { }
});

interface ThemeProviderProps {
    children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<ThemeType>('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
    }

    const changeTheme = (theme: ThemeType) => {
        setTheme(theme)
    }

    const themeContextValue = {
        theme,
        toggleTheme,
        changeTheme
    };

    return (
        <ThemeContext.Provider value={themeContextValue}>
            {/* <Provider>
                {children}
            </Provider> */}
             {children}
        </ThemeContext.Provider>
    )
} 
