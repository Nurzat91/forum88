import ReactDOM from 'react-dom/client';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { persistor } from './app/store';
import theme from './theme';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <PersistGate persistor={persistor}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App/>
      </ThemeProvider>
    </BrowserRouter>
  </PersistGate>
)
