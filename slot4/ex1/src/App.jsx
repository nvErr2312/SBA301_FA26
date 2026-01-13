import './App.css'
import Footer from './components/footer'
import Header from './components/header'
import ListOfOrchid from './components/ListOfOrchid'
import { useState } from 'react';


function App() {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header 
        searchText={searchText}
        onSearchChange={setSearchText} />

      <main className="flex-fill py-4">
        <div className="container text-center">
          <h1>CHÀO MỪNG ĐẾN VỚI TIỆM HOA VUI VẺ</h1>
        </div>

        <ListOfOrchid searchText={searchText} />
      </main>

      <Footer 
        avatar="images/avatar.jpg" 
        name="Bui Yen Nhi" 
        email="nhibyde181014@fpt.edu.vn" 
      />
    </div>
  )
}

export default App
