import './App.css'
import Footer from './components/footer'
import Header from './components/header'
import About from './components/About'
import Contact from './components/Contact'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-fill py-4">
        <div className="container text-center">
          <Routes>
            <Route
              path="/"
              element={<h1>WELCOME TO MY WEBSITE</h1>}
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
