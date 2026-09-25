function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark shadow">
            <div className="container">
                
                <a className="navbar-brand fw-bold" href="/">
                    BugTrack
                </a>

                <div className="d-flex gap-3">
                    <a
                        className="nav-link text-white"
                        href="#dashboard"
                    >
                        Dashboard
                    </a>

                    <a
                        className="nav-link text-white"
                        href="#bugs"
                    >
                        Bugs
                    </a>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;