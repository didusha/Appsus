import { noteService } from "../services/note.service.js";
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
const { useState } = React

export function NoteAdd({ onSaveNote, setIsAdding }) {
    const [noteToAdd, setNoteToAdd] = useState(noteService.createTxtNote())
    const [imgNoteToAdd, setImgNoteToAdd] = useState(noteService.createImgNote())
    const [todosNoteToAdd, setTodosNoteToAdd] = useState(noteService.createTodosNote())
    const [videoNoteToAdd, setVideoNoteToAdd] = useState(noteService.createVideoNote())
    const [placeholder, setPlaceholder] = useState('Take a note...')
    const [isAddType, setIsAddType] = useState('txt')

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        if (isAddType === 'txt') setNoteToAdd(prevNote => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
        else if (isAddType === 'img') setImgNoteToAdd(prevNote => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
        else if (isAddType === 'todos') setTodosNoteToAdd(prevNote => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
        else if (isAddType === 'video') setVideoNoteToAdd(prevNote => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
    }

    function onAddNote(ev) {
        ev.preventDefault()
        let newNote
        if (ev.target[0].value.length === 0) {
            setIsAdding(false)
            return
        }
        if (isAddType === 'txt') newNote = noteToAdd
        else if (isAddType === 'img') newNote = imgNoteToAdd
        else if (isAddType === 'todos') newNote = todosNoteToAdd
        else if (isAddType === 'video') newNote = videoNoteToAdd

        noteService.save(newNote)
            .then(note => {
                onSaveNote(note)
                showSuccessMsg(`Note added successfully!`)
            })
            .catch(err => {
                console.log('Problem adding note:', err)
                showErrorMsg('Problem adding note!')
            })
            .finally(() => setIsAdding(false))
    }

    function changePlaceholder(ev, type) {
        ev.preventDefault()
        setIsAddType(type)
        if (type === 'img' || type === 'video') setPlaceholder('Add a URL...')
        else setPlaceholder('Take a note...')
    }

    const { info } = noteToAdd
    const imgInfo = imgNoteToAdd.info
    const todosInfo = todosNoteToAdd.info
    const videoInfo = videoNoteToAdd.info

    const valueType = isAddType === 'txt' ? info.txt :
        isAddType === 'img' ? imgInfo.url :
            isAddType === 'video' ? videoInfo.url :
                isAddType === 'todos' ? todosInfo.title : ''

    const fieldName = isAddType === 'txt' ? 'txt' :
        isAddType === 'img' ? 'url' :
            isAddType === 'video' ? 'url' :
                isAddType === 'todos' ? 'title' : 'txt'

    return (
        <form onSubmit={onAddNote} className="note-add">
            <h2>Title</h2>
            <div className="add-types">
                <input className="txt-add-input"
                    name={fieldName}
                    value={valueType || ''}
                    onChange={handleChange}
                    type="text"
                    placeholder={placeholder} />
                <div className="btns-add">
                    <button type="button" onClick={(ev) => { changePlaceholder(ev, 'txt') }}>
                        <i className="fa-solid fa-file-lines"></i>
                    </button>
                    <button type="button" onClick={(ev) => { changePlaceholder(ev, 'img') }}>
                        <i className="fa-solid fa-image"></i>
                    </button>
                    <button type="button" onClick={(ev) => { changePlaceholder(ev, 'video') }}>
                        <i className="fa-solid fa-video"></i>
                    </button>
                    <button type="button" onClick={(ev) => { changePlaceholder(ev, 'todos') }}>
                        <i className="fa-solid fa-list"></i>
                    </button>
                </div>
            </div>
            <button type="submit" >close</button>
        </form>
    )
}