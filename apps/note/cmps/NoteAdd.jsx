import { noteService } from "../services/note.service.js";
const { useState } = React

export function NoteAdd({onSaveNote}) {
    const [noteToAdd, setNoteToAdd] = useState(noteService.createNote())

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        setNoteToAdd(prevNote => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
    }


    function onAddNote(ev) {
        ev.preventDefault()
        noteService.save(noteToAdd)
            .then(note => onSaveNote(note))

    }

    const { info } = noteToAdd
    return (
        <form onSubmit={onAddNote}>
            <input name="txt" value={info.txt} onChange={handleChange} type="text" placeholder="Take a note..." />
            <button type="submit">close</button>
        </form>
    )
}