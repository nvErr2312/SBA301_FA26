
function Footer({avatar,name,email}) {
  return (
    <footer className="bg-dark text-light py-4 mt-auto w-100">
      <div className="container-fluid px-4">
        <div className="row align-items-center">
          <div className="col-md-4 text-center mb-3 mb-md-0">
            <img
              src={avatar}
              alt="Author avatar"
              className="rounded-circle"
              width="100"
              height="100"
            />

          </div>

          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <h5 className="mb-1">Tác giả: &copy;{name}</h5>
            <p className="mb-0">Cô chủ vui vẻ</p>
          </div>

          <div className="col-md-4 text-center text-md-start">
            <h5 className="mb-1">Liên hệ</h5>

            {/* Truncate + không xuống hàng */}
            <a
              href={`mailto:${email}`}
              className="text-light text-decoration-none d-block text-truncate text-nowrap"
              title={email}
            >
              {email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
