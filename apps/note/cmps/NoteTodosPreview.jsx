import { NoteEdit } from "../cmps/NoteEdit.jsx"
const { useState } = React

export function NoteTodosPreview({ note }) {
    const [todos, setTodos] = useState(note.info.todos || [])
    const [newTodo, setNewTodo] = useState('')
    const [isNoteEdit, setIsNoteEdit] = useState(false)
    const [noteText, setNoteText] = useState(note.info.title)


    function handleAddTodo() {
        if (!newTodo.trim()) return
        const updatedTodos = [...todos, { txt: newTodo }]
        setTodos(updatedTodos)
        setNewTodo('')
    }

    function handleRemoveTodo(idxToRemove) {
        const updatedTodos = todos.filter((_, idx) => idx !== idxToRemove)
        setTodos(updatedTodos)
    }

    return (
        <article className="note-todos-preview">
            <h4 className="todo-title" onClick={() => setIsNoteEdit(true)}>{noteText}</h4>
            <ul>
                {todos.map((todo, idx) =>
                    <li key={idx} className="todo-container">
                        <span className="todo" >{todo.txt}</span>
                        <button className="remove-todo" onClick={() => handleRemoveTodo(idx)}>x</button>
                    </li>
                )}
            </ul>
            {isNoteEdit && (
                <NoteEdit setIsNoteEdit={setIsNoteEdit} noteText={noteText} setNoteText={setNoteText} />
            )}

            <div className="todo-container">
                <input
                    type="text"
                    className="todos-input"
                    placeholder="add a task..."
                    value={newTodo}
                    onChange={(ev) => setNewTodo(ev.target.value)} />
                <button className="add-todo" onClick={handleAddTodo}>add</button>
            </div>
        </article>
    )
}
