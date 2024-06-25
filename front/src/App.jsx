import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error.jsx';
import './App.css';
import { home, services, appointments, contact } from './routes/routes.js';
import Services from './pages/Services.jsx';
import Page from './templates/Page.jsx';
import Appointments from './pages/Appointments.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={home} element={<Page><Home /></Page>} />
          <Route path={services} element={
            <ProtectedRoute>
              <Page><Services /></Page>
            </ProtectedRoute>
          } />
          <Route path={appointments} element={
            <ProtectedRoute>
              <Page><Appointments /></Page>
            </ProtectedRoute>
          } />
          <Route path={contact} element={<Page><Home /></Page>} />
          <Route path="*" element={<Page><Error /></Page>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
