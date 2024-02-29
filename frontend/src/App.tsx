import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import Forum from './features/forum/Forum';
import ErrorPage from './components/ErrorPage/ErrorPage';

function App() {

  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Forum />} />
            <Route path="*" element={<ErrorPage/>} />
          </Routes>
        </Container>
      </main>
    </>
  )
}

export default App
