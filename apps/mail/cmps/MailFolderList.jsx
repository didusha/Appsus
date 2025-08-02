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
            <p ><Link className="btn-compose-mail" to="/mail/compose"><span className="label-text">Compose</span></Link></p>
            <p className={`folder-item ${filterByToEdit.folder === 'inbox' ? 'active' : ''}`}
                onClick={() => onClickedFolder('inbox')}><i className="fa-solid fa-inbox">
                </i>
                <span className="label-text">Inbox</span> <span className="unReadMails label-text">{unReadMails}</span>
            </p>
            <p className={`folder-item ${filterByToEdit.folder === 'starred' ? 'active' : ''}`}
                onClick={() => onClickedFolder('starred')}><i className="fa-regular fa-star">
                </i>
                <span className="label-text">Starred</span>
            </p>
            <p className={`folder-item ${filterByToEdit.folder === 'draft' ? 'active' : ''}`}
                onClick={() => onClickedFolder('draft')}><i className="fa-regular fa-pen-to-square">
                </i>
                <span className="label-text">Drafts</span>
            </p>
            <p className={`folder-item ${filterByToEdit.folder === 'sent' ? 'active' : ''}`}
                onClick={() => onClickedFolder('sent')}><i className="fa-regular fa-paper-plane">
                </i>
                <span className="label-text">Sent</span>
            </p>
            <p className={`folder-item ${filterByToEdit.folder === 'trash' ? 'active' : ''}`}
                onClick={() => onClickedFolder('trash')}><i className="fa-solid fa-trash-can">
                </i>
                <span className="label-text">Trash</span> 
            </p>
        </section>
    )
}