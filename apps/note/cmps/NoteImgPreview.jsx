


export function NoteImgPreview({ note }) {

    return (
        <article className="note-img-preview">
            <h2>{note.info.title}</h2>
            <img src={note.info.url} alt={note.info.title} />
        </article>
    )
}