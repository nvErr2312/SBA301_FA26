import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Footer from './components/footer'
import Header from './components/header'
import Orchid from './components/Orchid'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-fill py-4">
        <div className="container text-center">
          <h1>WELCOME TO MY WEBSITE</h1>
        </div>
        <Orchid id="1" orchidName="Ceasar 4N" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. or sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. or sit amet, consectetur adipiscing elit." category="Dendrobium" isSpecial={true} image="images/hoalan1.jpg" />
      </main>

      

      <Footer avatar="images/avatar.jpg" name="Bui Yen Nhi" email="nhibyde181014@fpt.edu.vn" />
    </div>
  )
}

export default App
