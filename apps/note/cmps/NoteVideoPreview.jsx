import { NoteEdit } from "../cmps/NoteEdit.jsx"
const { useState } = React

export function NoteVideoPreview({ note }) {
    const [isNoteEdit, setIsNoteEdit] = useState(false)
    const [noteText, setNoteText] = useState(note.info.title)

    return (
        <article className="note-img-preview">
            <h4 className="Video-title" onClick={() => setIsNoteEdit(true)}>{noteText}</h4>
            <iframe src="https://www.youtube.com/embed/Wq4MJ_-MpN4">
            </iframe>
            {isNoteEdit && (
                <NoteEdit setIsNoteEdit={setIsNoteEdit} noteText={noteText} setNoteText={setNoteText} />
            )}
        </article>
    )
}