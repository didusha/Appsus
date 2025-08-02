const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

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
        <nav>
            <NavLink to="/" >
                <img className="logos" src="../gallery/home.svg" alt="" />
            </NavLink>
            <NavLink to="/about">
                <img className="logos" src="../gallery/about.svg" alt="" />
            </NavLink>
            <NavLink to="/mail">
                <img className="logos" src="../gallery/mail.svg" alt="" />
            </NavLink>
            <NavLink to="/note">
                <img className="logos" src="../gallery/keep.svg" alt="" />
            </NavLink>
        </nav>
    </header>
}

