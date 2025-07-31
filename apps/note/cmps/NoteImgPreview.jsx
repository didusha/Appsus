
import { NoteEdit } from "../cmps/NoteEdit.jsx"
const { useState } = React


export function NoteImgPreview({ note }) {
    const [isNoteEdit, setIsNoteEdit] = useState(false)
    const [noteText, setNoteText] = useState(note.info.title)

    return (
        <article className="note-img-preview">
            <h4 className="img-title" onClick={() => setIsNoteEdit(true)}>{noteText}</h4>
            <img src={note.info.url} alt={note.info.title} />
            {isNoteEdit && (
                <NoteEdit setIsNoteEdit={setIsNoteEdit} noteText={noteText} setNoteText={setNoteText}/>
            )}
        </article>
    )
}