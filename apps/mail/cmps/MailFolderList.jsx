// import { utilService } from "../../../services/util.service.js"
const { Link } = ReactRouterDOM
const { useState, useEffect } = React

export function MailFolderList({ unReadMails, onSetFilterBy, filterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function onClickedFolder(folderVal) {
        setFilterByToEdit(prevFilter => ({ ...prevFilter, folder: folderVal }))
    }

    return (
        <section className="mail-folder-list">
            <p ><Link className="btn-compose-mail" to="/mail/edit" >Compose</Link></p>
            <p onClick={() => onClickedFolder('inbox')}><i className="fa-solid fa-inbox"></i> Inbox <span className="unReadMails">{unReadMails}</span></p>
            <p onClick={() => onClickedFolder('starred')}><i className="fa-regular fa-star"></i> Starred <span></span></p>
            <p onClick={() => onClickedFolder('draft')}><i className="fa-regular fa-pen-to-square"></i> Drafts <span></span></p>
            <p onClick={() => onClickedFolder('sent')}><i className="fa-regular fa-paper-plane"></i> Sent <span></span></p>
            <p onClick={() => onClickedFolder('trash')}><i className="fa-solid fa-trash-can"></i> Trash <span></span></p>
        </section>

    )
}