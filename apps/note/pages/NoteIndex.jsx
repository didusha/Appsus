import { NoteList } from "../cmps/NoteList.jsx";
import { noteService } from "../services/note.service.js";
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { NoteEdit } from "../cmps/NoteEdit.jsx"
import { NoteAdd } from "../cmps/NoteAdd.jsx";


const { useState, useEffect } = React


export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [isNoteEdit, setIsNoteEdit] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    // const [isPinned, setIsPinned] = useState(false)

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

    function onTogglePin(id) {
        setNotes(prevNotes => {
            const updatedNotes = prevNotes.map(note =>
                note.id === id ? { ...note, isPinned: !note.isPinned } : note
            )
            const sortedNotes = [...updatedNotes].sort((a, b) => b.isPinned - a.isPinned)

            return sortedNotes
        })
    } 
    function onSaveNote(newNote) {
        setNotes([...notes, newNote])
    }

    function onSaveColor(newNote, color) {
        setNotes(prevNotes => prevNotes.map(note => note.id === newNote.id ? { ...note, style: { ...note.style, backgroundColor: color } } : note))
    }

    if (!notes) return <div>loading...</div>
    return (
        <section className="notes-index">
            {isNoteEdit && <NoteEdit setIsNoteEdit={setIsNoteEdit} setIsAdding={setIsAdding} />}
            {!isAdding && <div className="txt-input"><input type="text" placeholder="Take a note..." onClick={() => setIsAdding(true)} /></div>}
            {isAdding && <NoteAdd onSaveNote={onSaveNote} setIsAdding={setIsAdding} />}
            <NoteList
                onRemoveNote={onRemoveNote}
                notes={notes}
                setIsNoteEdit={setIsNoteEdit}
                onSaveColor={onSaveColor}
                onTogglePin={onTogglePin} />
        </section>
    )
}
