import { ChakraProvider } from '@chakra-ui/react';
import React from 'react'
import { GlobalStyle } from './GlobalStyle';
import { GlobalContext } from './contexts/GlobalContext';
import GlobalState from './contexts/GlobalState';
import Router from './routes/Router';


const App = () => {
  const context = GlobalState()

  return (
    <GlobalContext.Provider value={context}>
      <ChakraProvider>
        <GlobalStyle />
        <Router />
      </ChakraProvider>
    </GlobalContext.Provider>
  );
}

export default App;
