import './App.css'
import MainLayout from './components/MainLayout'
import ListOfOrchid from './components/ListOfOrchid'
import Contact from './components/Contact'
import About from './components/About'
import OrchidDetail from './components/OrchidDetail'
import Login from './pages/login/Login'
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [searchText, setSearchText] = useState("");

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout searchText={searchText} onSearchChange={setSearchText} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <div className="container text-center">
                <h1>CHÀO MỪNG ĐẾN VỚI TIỆM HOA VUI VẺ</h1>
                <ListOfOrchid searchText={searchText} />
              </div>
            } />
            <Route path="/orchid/:id" element={<OrchidDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
