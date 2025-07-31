import { NoteTxtPreview } from "./NoteTxtPreview.jsx"
import { NoteImgPreview } from "./NoteImgPreview.jsx"
import { NoteTodosPreview } from "./NoteTodosPreview.jsx"
import { NoteColor } from "./NoteColor.jsx"
const { useState } = React

export function NoteList({ notes, onRemoveNote, setIsNoteEdit, onSaveColor, onTogglePin }) {
    const [isChangingColor, setIsChangingColor] = useState(false)
    const [noteStyle, setNoteStyle] = useState({
        backgroundColor: '#ffe6e6ff',
    })

    return (
        <section >
            <ul className="notes-list">
                {notes.map(note => (
                    <li style={{backgroundColor: note.style.backgroundColor}} className="note" key={note.id} >
                        <button onClick={() => onTogglePin(note.id)}>pin</button>
                        <div>
                            <DynamicCmp cmpType={note.type} 
                            note={note} 
                            setIsNoteEdit={setIsNoteEdit} 
                            setIsChangingColor={setIsChangingColor}
                            onSaveColor={onSaveColor}
                            {...noteStyle}/>
                        </div>
                        <button onClick={() => onRemoveNote(note.id)}>x</button>
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
    return (
        <article>
            {dynamicCmps[props.cmpType]}
            {/* <button><i className="fa-solid fa-palette"></i></button>
            <NoteColor {...props}/> */}
            <button onClick={() => props.setIsChangingColor(!props.isChangingColor)}><i className="fa-solid fa-palette"></i></button>
            {props.isChangingColor && <NoteColor {...props}/>}
        </article>
    )
}