
const {useState} = React

export function NoteTodosPreview({ note }) {

    const [todos, setTodos] = useState(null)

    return (
        <article className="note-todos-preview">
            <ul className="todo-title">{note.info.title}</ul>
            {note.info.todos.map((todo,idx) => 
                <li key={idx}>{todo.txt}</li>
            )}
            <input type="text" className="todos-input" placeholder="add a task..."/>
        </article>
    )
}