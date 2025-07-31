import { NoteFilter } from "./NoteFilter.jsx";
const {useState} = React

export function NoteSideFilter(){
    const [isSearch, setIsSearch] = useState(false)

    return (
        <section className="side-filter">
            <button onClick={() => setIsSearch(isSearch => !isSearch)}>
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            {isSearch && <NoteFilter/>}
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