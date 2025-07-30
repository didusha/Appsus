

export function NoteTxtPreview({ note }) {

    return (
        <article className="note-txt-preview">
            <h2>{note.info.txt}</h2>
        </article>
    )
}