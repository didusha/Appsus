

export function NoteEdit({ setIsNoteEdit }) {



    return (
        <React.Fragment>
            <div className="back-drop" onClick={() => setIsNoteEdit(false)}></div>
            <div className="edit">
                <h2>Title</h2>
                <input type="text" />
                <button onClick={() => setIsNoteEdit(false)}>close</button>
            </div>
        </React.Fragment>
    )
}