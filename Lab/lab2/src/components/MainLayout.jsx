import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

function MainLayout({ searchText, onSearchChange }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header 
        searchText={searchText}
        onSearchChange={onSearchChange}
      />

      <main className="flex-fill py-4">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <Footer 
        avatar="images/avatar.jpg" 
        name="Bui Yen Nhi" 
        email="nhibyde181014@fpt.edu.vn" 
      />
    </div>
  );
}

export default MainLayout;
