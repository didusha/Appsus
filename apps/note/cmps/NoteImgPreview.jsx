


export function NoteImgPreview({ note }) {

    return (
        <article className="note-img-preview">
            <h4>{note.info.title}</h4>
            <img src={note.info.url} alt={note.info.title} />
        </article>
    )
}