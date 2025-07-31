import { noteService } from "../services/note.service.js";
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
const { useState } = React

export function NoteAdd({ onSaveNote, setIsAdding }) {
    const [noteToAdd, setNoteToAdd] = useState(noteService.createNote())
    const [placeholder, setPlaceholder] = useState('Take a note...')

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

    function changePlaceholderToUrl(ev) {
        ev.preventDefault()
        setPlaceholder('Add a URL...')
    }

    function changePlaceholderToTxt(ev) {
        ev.preventDefault()
        setPlaceholder('Take a note...')
    }

    const { info } = noteToAdd
    return (
        <form onSubmit={onAddNote} className="note-add">
            <h2>Title</h2>
            <div className="add-types">
                <input className="txt-add-input"
                    name="txt"
                    value={info.txt}
                    onChange={handleChange}
                    type="text"
                    placeholder={placeholder} />
                <div className="btns-add">
                    <button onClick={changePlaceholderToTxt}>
                        <i className="fa-solid fa-file-lines"></i>
                    </button>
                    <button onClick={changePlaceholderToUrl}>
                        <i className="fa-solid fa-image"></i>
                    </button>
                    <button onClick={changePlaceholderToUrl}>
                        <i className="fa-solid fa-video"></i>
                    </button>
                    <button>
                        <i className="fa-solid fa-list"></i>
                    </button>
                </div>
            </div>
            <button type="submit" >close</button>
        </form>
    )
}