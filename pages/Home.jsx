const { Link, NavLink } = ReactRouterDOM

export function Home() {
    return <section className="home">
        <h3 className="home-logo">
            <span className="a">A</span>
            <span className="p1">p</span>
            <span className="p2">p</span>
            <span className="s1">s</span>
            <span className="u">u</span>
            <span className="s2">s</span>
        </h3>
        <input className="home-txt" type="text" placeholder="Search..." />
        <nav>
            <NavLink to="/about">
                <img className="home-logos" src="../gallery/about.png" alt="" />
            </NavLink>
            <NavLink to="/mail">
                <img className="home-logos" src="../gallery/gmail.png" alt="" />
            </NavLink>
            <NavLink to="/note">
                <img className="home-logos" src="../gallery/keep.png" alt="" />
            </NavLink>
        </nav>

    </section>
}