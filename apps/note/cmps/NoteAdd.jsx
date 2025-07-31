import { noteService } from "../services/note.service.js";
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState } = React

export function NoteAdd({ onSaveNote, setIsAdding }) {
    const [noteToAdd, setNoteToAdd] = useState(noteService.createNote())

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        setNoteToAdd(prevNote => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
    }

    function onAddNote(ev) {
        ev.preventDefault()
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

    const { info } = noteToAdd
    return (
        <form className="note-add" onSubmit={onAddNote}>
            <h2>Title</h2>
            <input className="txt-add-input"
                name="txt"
                value={info.txt}
                onChange={handleChange}
                type="text"
                placeholder="Take a note..." />
            <button type="submit" >close</button>
        </form>
    )
}