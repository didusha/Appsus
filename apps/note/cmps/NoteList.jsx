import { NoteTxtPreview } from "./NoteTxtPreview.jsx"
import { NoteImgPreview } from "./NoteImgPreview.jsx"
import { NoteTodosPreview } from "./NoteTodosPreview.jsx"
const { useState } = React

export function NoteList({ notes, onRemoveNote }) {

    return (
        <ul className="notes-list">
            {notes.map(note => (
                <li className="note" key={note.id}>
                    <DynamicCmp cmpType={note.type} note={note} />
                    <button onClick={() => onRemoveNote(note.id)}>x</button>
                </li>
            ))}
        </ul>
    )
}


function DynamicCmp(props) {
    const dynamicCmps = {
        NoteTxt: <NoteTxtPreview {...props} />,
        NoteImg: <NoteImgPreview {...props} />,
        NoteTodos: <NoteTodosPreview {...props} />,
    }
    return dynamicCmps[props.cmpType]
}