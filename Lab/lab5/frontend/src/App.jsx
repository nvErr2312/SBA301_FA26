import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ListOfOrchids from './components/ListOfOrchids';
import EditOrchid from './components/EditOrchid';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<ListOfOrchids />} />
        <Route path="/edit/:orchidID" element={<EditOrchid />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
