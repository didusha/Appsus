
import { NoteColor } from "./NoteColor.jsx"


export function NoteTxtPreview({ note,setIsNoteEdit }) {
    const { useState } = React

    const [isChangingColor, setIsChangingColor] = useState(false)

    return (
        <article className="note-txt-preview">
            <div onClick={() => setIsNoteEdit(true)}>{note.info.txt}</div>
            <button onClick={() => setIsChangingColor(!isChangingColor)}><i className="fa-solid fa-palette"></i></button>
            {isChangingColor && <NoteColor />}
        </article>
    )
}