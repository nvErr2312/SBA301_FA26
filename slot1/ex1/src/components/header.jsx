function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container d-flex justify-content-center">
        
        {/* Bọc thêm 1 div để canh giữa */}
        <div className="d-flex w-100 align-items-center">
          
          <a className="navbar-brand mx-auto" href="#">
            Demo
          </a>

          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  )
}

export default Header
