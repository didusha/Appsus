import { NotesPreview } from "./NotePreview.jsx";

export function NoteList({ notes, onRemoveNote }) {
    return (
        <ul>
            {notes.map(note => (
                <li key={note.id}>
                    <NotesPreview note={note}/>
                </li>
            ))}
        </ul>
    )
}
