import { utilService } from "../../../services/util.service.js"

const { useState, useEffect, useRef } = React

export function NoteSideFilter({ filterBy, onSetFilterBy, notes }) {
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
    
    function handleTypeChange(type) {
        setFilterByToEdit(prevFilter => ({ ...prevFilter, 'type': type }))
    }

    function onShowAllNotes(){
        setFilterByToEdit(prevFilter => prevFilter = '')
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
            <button onClick={() => handleTypeChange('NoteTxt')}>
                <i className="fa-solid fa-file-lines"></i>
            </button>
            <button onClick={() => handleTypeChange('NoteImg')}>
                <i className="fa-solid fa-images"></i>
            </button>
            <button onClick={() => handleTypeChange('NoteTodos')}>
                <i className="fa-solid fa-list"></i>
            </button>
            <button onClick={() => handleTypeChange('NoteVideo')}>
                <i className="fa-solid fa-video"></i>
            </button>
            <button onClick={onShowAllNotes}>
                <i className="fa-solid fa-xmark"></i>
            </button>
        </section>
    )
}