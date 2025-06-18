// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Orientation from './pages/Orientation';
import AllMajors from './pages/AllMajors'; 
import Footer from "./pages/Footer";
import ScrollToTop from './pages/ScrollToTop';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orientation" element={<Orientation />} />
        <Route path="/majors" element={<AllMajors />} />
      </Routes>
      <Footer />
    </>
  );
}
