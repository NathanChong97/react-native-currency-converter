import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ThemeProvider } from './theme/ThemeContext';
import Navigation from "./screens/Navigation";
import i18n from "i18next";
import * as resources from '../translation/resources'
import { initReactI18next } from "react-i18next";


i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: "en",
    resources: {
      ...Object.entries(resources).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: {
            translation: value,
          },
        }),
        {},
      ),
    },
    lng: "en",
  });


function App(): JSX.Element {
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({

});

export default App;
