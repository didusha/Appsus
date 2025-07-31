import { NoteTxtPreview } from "./NoteTxtPreview.jsx"
import { NoteImgPreview } from "./NoteImgPreview.jsx"
import { NoteTodosPreview } from "./NoteTodosPreview.jsx"
import { NoteColor } from "./NoteColor.jsx"
const { useState } = React

export function NoteList({ notes, onRemoveNote, onSaveColor, onTogglePin, onDuplicateNote, onUpdateNote }) {
    const [openColorPickerId, setOpenColorPickerId] = useState(null)

    return (
        <section>
            <ul className="notes-list">
                {notes.map(note => (
                    <li style={{ backgroundColor: (note.style && note.style.backgroundColor) }}
                        className="note" key={note.id}>
                        <button className="btn-pin" onClick={() => onTogglePin(note)}>
                            {note.isPinned ? <i className="fa-solid fa-thumbtack"></i> : <i className="fa-solid fa-thumbtack-slash"></i>}
                        </button>

                        <div className="dynamic-cmp">
                            <DynamicCmp cmpType={note.type} note={note} onUpdateNote={onUpdateNote} />
                        </div>
                        <div className="note-actions">
                            <button className="btn-color"
                                onClick={() => setOpenColorPickerId(
                                    openColorPickerId === note.id ? null : note.id
                                )}>
                                <i className="fa-solid fa-palette"></i>
                            </button>
                            <button className="btn-duplicate"
                                onClick={() => onDuplicateNote(note)}>
                                <i className="fa-solid fa-copy"></i>
                            </button>

                            <button onClick={() => onRemoveNote(note.id)}>
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
                        </div>

                        {openColorPickerId === note.id && (
                            <NoteColor note={note} onSaveColor={onSaveColor} />
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}

function DynamicCmp(props) {
    const dynamicCmps = {
        NoteTxt: <NoteTxtPreview {...props} />,
        NoteImg: <NoteImgPreview {...props} />,
        NoteTodos: <NoteTodosPreview {...props} />,
    }

    return <article>{dynamicCmps[props.cmpType]}</article>
}
