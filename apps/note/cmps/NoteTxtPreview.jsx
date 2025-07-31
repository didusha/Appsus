


export function NoteTxtPreview({ note,setIsNoteEdit }) {

    return (
        <article className="note-txt-preview">
            <div onClick={() => setIsNoteEdit(true)} className="note-text">{note.info.txt}</div>
        </article>
    )
}