// import { utilService } from "../../../services/util.service.js"
const { Link } = ReactRouterDOM

export function MailFolderList({ unReadMails, onClickedSent }) {


    return (
        <section className="mail-folder-list">
            <p><Link className="btn-add-mail" to="/mail/edit" >Compose</Link></p>
            <p><i className="fa-solid fa-inbox"></i> Inbox <span classNameName="unReadMails" onClick={onClickedSent}>{unReadMails}</span></p>
            <p><i className="fa-regular fa-star"></i> Starred <span></span></p>
            <p><i className="fa-regular fa-pen-to-square"></i> Drafts <span></span></p>
            <p><i className="fa-regular fa-paper-plane"></i> Sent <span></span></p>
            <p><i className="fa-solid fa-trash-can"></i> Trash <span></span></p>
        </section>
        
    )
}