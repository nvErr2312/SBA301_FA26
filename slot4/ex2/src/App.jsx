import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import ListOfOrchid from './components/ListOfOrchid'
import Contact from './components/Contact'
import About from './components/About'
import OrchidDetail from './components/OrchidDetail'
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const [searchText, setSearchText] = useState("");
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header 
          searchText={searchText}
          onSearchChange={setSearchText} />

        <main className="flex-fill py-4">
          <Routes>
            <Route path="/" element={
              <div className="container text-center">
                <h1>CHÀO MỪNG ĐẾN VỚI TIỆM HOA VUI VẺ</h1>
                <ListOfOrchid searchText={searchText} />
              </div>
            } />
            <Route path="/orchid/:id" element={<OrchidDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <Footer 
          avatar="images/avatar.jpg" 
          name="Bui Yen Nhi" 
          email="nhibyde181014@fpt.edu.vn" 
        />
      </div>
    </Router>
  )
}

export default App
