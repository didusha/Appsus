import { NoteList } from "../cmps/NoteList.jsx";
import { noteService } from "../services/note.service.js";
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { NoteEdit } from "../cmps/NoteEdit.jsx"
import { NoteAdd } from "../cmps/NoteAdd.jsx";


const { useState, useEffect } = React


export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [isNoteEdit, setIsNoteEdit] = useState(false)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(notes => setNotes(notes))
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot get notes!')
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg(`Note (${noteId}) removed successfully!`)
            })
            .catch(err => {
                console.log('Problem removing note:', err)
                showErrorMsg('Problem removing note!')
            })
    }

    function onSaveNote(newNote){
        setNotes([...notes,newNote])
    }

    if (!notes) return <div>loading...</div>
    return (
        <section className="notes-index">
            {isNoteEdit && <NoteEdit setIsNoteEdit={setIsNoteEdit} />}
            <NoteAdd onSaveNote={onSaveNote}/>
            <NoteList onRemoveNote={onRemoveNote} notes={notes} setIsNoteEdit={setIsNoteEdit} />
        </section>
    )
}
