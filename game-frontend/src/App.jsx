import { Routes, Route } from 'react-router-dom';
import LandingPage   from './pages/LandingPage';
import LoginPage     from './pages/LoginPage';
import SignupPage    from './pages/SignupPage';
import RateAndFav    from './pages/RateAndFav';
import HomePage      from './pages/HomePage';
import ProfilePage   from './pages/ProfilePage';
import '@fontsource/orbitron'; // Default weight


export default function App() {
  return (
    <Routes>
      <Route path="/"         element={<LandingPage />} />
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/signup"   element={<SignupPage />} />
      <Route path="/rate"     element={<RateAndFav />} />
      <Route path="/home"     element={<HomePage />} />
      <Route path="/profile"  element={<ProfilePage />} />
    </Routes>
  );
}


