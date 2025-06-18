// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Orientation from './pages/Orientation';
import AllMajors from './pages/AllMajors';
import Footer from './pages/Footer'; // كان الخطأ هنا، يجب أن يكون في components
import ScrollToTop from './pages/ScrollToTop'; // تأكد أن ScrollToTop موجود في components

export default function App() {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col justify-between">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/orientation" element={<Orientation />} />
            <Route path="/majors" element={<AllMajors />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}
