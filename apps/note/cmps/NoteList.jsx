import { NoteTxtPreview } from "./NoteTxtPreview.jsx"
import { NoteImgPreview } from "./NoteImgPreview.jsx"
import { NoteTodosPreview } from "./NoteTodosPreview.jsx"
// import { NoteColor } from "./NoteColor.jsx"
const { useState } = React

export function NoteList({ notes, onRemoveNote, setIsNoteEdit }) {
    // const [isChangingColor, setIsChangingColor] = useState(false)
    const [footerStyle, setFooterStyle] = useState({
        backgroundColor: '#ffe6e6ff',
    })


    return (
        <section >
            <ul className="notes-list">
                {notes.map(note => (
                    <li style={footerStyle} className="note" key={note.id} >
                        <button>pin</button>
                        <div>
                            <DynamicCmp cmpType={note.type} note={note} setIsNoteEdit={setIsNoteEdit}/>
                        </div>
                        {/* <button onClick={() => setIsChangingColor(!isChangingColor)}><i className="fa-solid fa-palette"></i></button> */}
                        <button onClick={() => onRemoveNote(note.id)}>x</button>
                        {/* {isChangingColor && <NoteColor />} */}
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
        dynamicCmps[props.cmpType]
    )
}