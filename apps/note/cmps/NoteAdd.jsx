import { noteService } from "../services/note.service.js";
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
const { useState } = React

export function NoteAdd({ onSaveNote, setIsAdding }) {
    const [noteToAdd, setNoteToAdd] = useState(noteService.createNote())
    const [placeholder, setPlaceholder] = useState('Take a note...')
    const [isAddType, setIsAddType] = useState('txt')

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        setNoteToAdd(prevNote => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
    }

    function onAddNote(ev) {
        ev.preventDefault()
        if (ev.target[0].value.length === 0) {
            setIsAdding(false)
            return
        }
            noteService.save(noteToAdd)
                .then(note => {
                    onSaveNote(note)
                    showSuccessMsg(`Note added successfully!`)
                })
                .catch(err => {
                    console.log('Problem adding note:', err)
                    showErrorMsg('Problem adding note!')
                })
                .finally(() => setIsAdding(false))
    
    }

    function changePlaceholder(ev, type) {
        ev.preventDefault()
        setIsAddType(type)
        if (type === 'img' || type === 'video') setPlaceholder('Add a URL...')
            else setPlaceholder('Take a note...')
    }
    const { info } = noteToAdd
    const valueType = isAddType === 'txt' ? info.txt : isAddType === 'img' ? info.url : isAddType === 'video' ? info.url : isAddType === 'todos' ? info.title :  info.txt
    return (
        <form onSubmit={onAddNote} className="note-add">
            <h2>Title</h2>
            <div className="add-types">
                
                <input className="txt-add-input"
                    name="txt"
                    value={valueType}
                    onChange={handleChange}
                    type="text"
                    placeholder={placeholder} />
                <div className="btns-add">
                    <button type="button" onClick={(ev) => { changePlaceholder(ev,'txt')}}>
                        <i className="fa-solid fa-file-lines"></i>
                    </button>
                    <button type="button" onClick={(ev) => { changePlaceholder(ev,'img') }}>
                        <i className="fa-solid fa-image"></i>
                    </button>
                    <button type="button" onClick={(ev) => { changePlaceholder(ev, 'video')}}>
                        <i className="fa-solid fa-video"></i>
                    </button>
                    <button type="button" onClick={(ev) => { changePlaceholder(ev,'todos')}}>
                        <i className="fa-solid fa-list"></i>
                    </button>
                </div>
            </div>
            <button type="submit" >close</button>
        </form>
    )
}