import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles'; 
import { ThemeContext } from './ThemeContext'; 
import { Provider } from 'react-redux';
import store from './store';
import homeTheme  from './Theme';
import Home from '../features/home/Home'; 

const App: React.FC = () => { 
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={homeTheme}> 
      <ThemeProvider theme={homeTheme}> 
        <Home />
      </ThemeProvider>
    </ThemeContext.Provider>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);