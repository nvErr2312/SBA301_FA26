import './App.css'
import Footer from './components/footer'
import Header from './components/header'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-fill py-4">
        <div className="container text-center">
          <h1>WELCOME TO MY WEBSITE</h1>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
