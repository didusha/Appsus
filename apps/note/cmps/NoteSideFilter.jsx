import { NoteFilter } from "./NoteFilter.jsx";


export function NoteSideFilter(){
    return (
        <section className="side-filter">
            <button>
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <NoteFilter/>
            <button>
                <i className="fa-solid fa-file-lines"></i>
            </button>
            <button>
                <i className="fa-solid fa-images"></i>
            </button>
            <button>
                <i className="fa-solid fa-list"></i>
            </button>
        </section>
    )
}