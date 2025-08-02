import { showSuccessMsg } from '../services/event-bus.service.js'

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
            <input className="home-txt" type="text" placeholder="Search..."/>
    </section>
}