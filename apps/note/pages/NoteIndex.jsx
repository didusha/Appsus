import { NoteList } from "../cmps/NoteList.jsx";
import { NoteSideFilter } from "../cmps/NoteSideFilter.jsx";
import { noteService } from "../services/note.service.js";
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { NoteEdit } from "../cmps/NoteEdit.jsx"
import { NoteAdd } from "../cmps/NoteAdd.jsx";
import { utilService } from "../../../services/util.service.js"



const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM



export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [isNoteEdit, setIsNoteEdit] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        setSearchParams(utilService.getTruthyValues(filterBy))
        loadNotes()
    }, [filterBy])

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

    function onSetFilterBy(filterByToEdit) {
        setFilterBy({ ...filterByToEdit })
    }


    if (!notes) return <div>loading...</div>
    return (
        <section className="notes-index">
            <div className="side-filter-item">
                <NoteSideFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
            </div>
            <div className="page-item">

                {isNoteEdit && <NoteEdit setIsNoteEdit={setIsNoteEdit} setIsAdding={setIsAdding} />}
                {!isAdding && <div className="txt-input"><input type="text" placeholder="Take a note..." onClick={() => setIsAdding(true)} /></div>}
                {isAdding && <NoteAdd onSaveNote={onSaveNote} setIsAdding={setIsAdding} />}
                <NoteList
                    onRemoveNote={onRemoveNote}
                    notes={notes}
                    setIsNoteEdit={setIsNoteEdit}
                    onSaveColor={onSaveColor}
                    onTogglePin={onTogglePin} />
            </div>
        </section>
    )
}
