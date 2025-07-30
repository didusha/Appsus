

export function NoteTxtPreview({ note }) {

    return (
        <article className="note-txt-preview">
            <div>{note.info.txt}</div>
        </article>
    )
}