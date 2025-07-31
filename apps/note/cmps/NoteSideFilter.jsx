import { utilService } from "../../../services/util.service.js"

const { useState, useEffect, useRef } = React

export function NoteSideFilter({ filterBy, onSetFilterBy }) {
    const [isSearch, setIsSearch] = useState(false)

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterByDebounce = useRef(utilService.debounce(onSetFilterBy, 500)).current

    useEffect(() => {
        onSetFilterByDebounce(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }


    const { txt } = filterByToEdit

















    return (
        <section className="side-filter">
            <button onClick={() => setIsSearch(isSearch => !isSearch)}>
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            {isSearch && <input
                onChange={handleChange}
                value={txt}
                name="txt"
                id="txt"
                className="search-input"
                type="text"
                placeholder="search note..." />}
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