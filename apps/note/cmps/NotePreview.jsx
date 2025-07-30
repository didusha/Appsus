

export function NotesPreview({ note }) {

    return (
        <article className="note-preview">
            <h2>{note.info.txt}</h2>
        </article>
    )
}