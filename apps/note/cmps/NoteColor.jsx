import { noteService } from "../services/note.service.js";

export function NoteColor({ backgroundColor, note, onSaveColor}) {
    const colors = [
        'rgb(230, 230, 230)',
        '#ffbbdf',
        '#fffcaa',
        '#c4ffb9',
        '#bcedff',
        '#e3b7ff',
    ]

    function onSetColor(color) {
        const newNote = {...note,style:{...note.style, backgroundColor: color}}
        noteService.save(newNote)
            .then(savedNote => onSaveColor(savedNote, color))
            .catch(err => console.log(err))
    }

    return (
        <section className="color">
            <div className="items-container">
                {colors.map(color => (
                    <div
                        className={`item ${color === backgroundColor ? 'selected' : ''}`}
                        key={color}
                        style={{ backgroundColor: color }}
                        onClick={() => onSetColor(color)}
                    >
                    </div>
                ))}
            </div>
        </section >
    )
}    
