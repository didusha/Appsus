// import { utilService } from "../../../services/util.service.js"
const { Link } = ReactRouterDOM

export function MailFolderList({ unReadMails }) {

    return (
        <section className="mail-folder-list">
            <p><Link className="btn-add-mail" to="/mail/edit" >Compose</Link></p>
            <p><i class="fa-solid fa-inbox"></i> Inbox <span className="unReadMails" >{unReadMails}</span></p>
            <p><i class="fa-regular fa-star"></i> Starred <span></span></p>
            <p><i class="fa-regular fa-pen-to-square"></i> Drafts <span></span></p>
            <p><i class="fa-regular fa-paper-plane"></i> Sent <span></span></p>
            <p><i class="fa-solid fa-trash-can"></i> Trash <span></span></p>
        </section>
        
    )
}