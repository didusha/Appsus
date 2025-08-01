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
            <p ><Link className="btn-compose-mail" to="/mail/compose" >Compose</Link></p>
            <p className={`folder-item ${filterByToEdit.folder === 'inbox' ? 'active' : ''}`}
                onClick={() => onClickedFolder('inbox')}><i className="fa-solid fa-inbox">
                </i> Inbox <span className="unReadMails">{unReadMails}</span>
            </p>
            <p className={`folder-item ${filterByToEdit.folder === 'starred' ? 'active' : ''}`}
                onClick={() => onClickedFolder('starred')}><i className="fa-regular fa-star">
                </i> Starred <span></span>
            </p>
            <p className={`folder-item ${filterByToEdit.folder === 'draft' ? 'active' : ''}`}
                onClick={() => onClickedFolder('draft')}><i className="fa-regular fa-pen-to-square">
                </i> Drafts <span></span>
            </p>
            <p className={`folder-item ${filterByToEdit.folder === 'sent' ? 'active' : ''}`}
                onClick={() => onClickedFolder('sent')}><i className="fa-regular fa-paper-plane">
                </i> Sent <span></span>
            </p>
            <p className={`folder-item ${filterByToEdit.folder === 'trash' ? 'active' : ''}`}
                onClick={() => onClickedFolder('trash')}><i className="fa-solid fa-trash-can">
                </i> Trash <span></span>
            </p>
        </section>
    )
}