const { Link, NavLink } = ReactRouterDOM
const { useState } = React

export function AppHeader() {
    const [isOpen, setIsOpen] = useState(false)

    return <header className="app-header">
        <Link to="/">
            <h3 className="logo">
                <span className="a">A</span>
                <span className="p1">p</span>
                <span className="p2">p</span>
                <span className="s1">s</span>
                <span className="u">u</span>
                <span className="s2">s</span>
            </h3>
        </Link>
        <div>
        <div className="hamburger">
            <img className="logos" onClick={() => setIsOpen(!isOpen)} src="../gallery/hamburger.svg" alt="" />
        </div>
        <nav className={`nav-logos ${isOpen ? 'open' : ''}`}>
            <NavLink to="/" >
                <img className="logos" src="gallery/home.png" alt="" />
            </NavLink>
            <NavLink to="/about">
                <img className="logos" src="gallery/about.png" alt="" />
            </NavLink>
            <NavLink to="/mail">
                <img className="logos" src="gallery/gmail.png" alt="" />
            </NavLink>
            <NavLink to="/note">
                <img className="logos" src="gallery/keep.png" alt="" />
            </NavLink>
        </nav>
        </div>
    </header>
}

