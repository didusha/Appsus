export function NoteColor({onSetNoteStyle, backgroundColor}) {
    const colors = [
        'rgb(230, 230, 230)',
        '#ffbbdf',
        '#fffcaa',
        '#c4ffb9',
        '#bcedff',
        '#e3b7ff',
    ]


    function onSetColor(color) {
        onSetNoteStyle({ backgroundColor: color })
    }


    return (
        <section className="color">
            <div className="items-container">
                {colors.map(color => (
                    <div
                        className={`item ${color === backgroundColor ? 'chosen' : ''}`}
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
