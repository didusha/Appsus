

export function NoteEdit({ setNoteText, setIsNoteEdit, noteText }) {
    function handleChange({ target }) {
        setNoteText(target.value)
    }

    return (
        <React.Fragment>
            <div className="back-drop" onClick={() => setIsNoteEdit(false)}></div>
            <div className="edit">
                <h2>Title</h2>
                <input
                    className="edit-text"
                    type="text"
                    value={noteText}
                    onChange={handleChange}
                    placeholder="Take a note..."/>
                <button onClick={() => setIsNoteEdit(false)}>close</button>
            </div>
        </React.Fragment>
    )
}