
import { NoteEdit } from "../cmps/NoteEdit.jsx"
const { useState } = React

export function NoteTxtPreview({ note }) {
    const [isNoteEdit, setIsNoteEdit] = useState(false)
    const [noteText, setNoteText] = useState(note.info.txt)

    return (
        <article className="note-txt-preview">
            <div onClick={() => setIsNoteEdit(true)} className="note-text">
                {noteText}
            </div>

            {isNoteEdit && (
                <NoteEdit setIsNoteEdit={setIsNoteEdit} noteText={noteText} setNoteText={setNoteText}/>
            )}
        </article>
    )
}