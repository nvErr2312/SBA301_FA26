function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto w-100">
      <div className="container-fluid px-4">
        <div className="row align-items-center">
          <div className="col-md-4 text-center mb-3 mb-md-0">
            <img
              src="https://i.pravatar.cc/100?img=32"
              alt="Author avatar"
              className="rounded-circle"
              width="100"
              height="100"
            />
          </div>

          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <h5 className="mb-1">Tác giả: &copy; nhiby</h5>
            <p className="mb-0">Frontend Developer</p>
          </div>

          <div className="col-md-4 text-center text-md-start">
            <h5 className="mb-1">Liên hệ</h5>

            {/* Truncate + không xuống hàng */}
            <a
              href="mailto:nhibyde181014@fpt.edu.vn"
              className="text-light text-decoration-none d-block text-truncate text-nowrap"
              title="nhibyde181014@fpt.edu.vn"
            >
              nhibyde181014@fpt.edu.vn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
