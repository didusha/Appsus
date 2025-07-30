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
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}
