import { MailPreview } from "../cmps/MailPreview.jsx"

const { useNavigate } = ReactRouterDOM

export function MailList({ mails, onRemoveMail, onReadMail, onStarMail, onClickedSortByDate, onClickedSortBySubject }) {

    const navigate = useNavigate()


    function onClickMail(mail) {
        if (!mail.sentAt) {
            return navigate(`/mail/compose/${mail.id}`)
        }
        navigate(`/mail/${mail.id}`)
        const isRead = { isRead: true }
        onReadMail(mail.id, isRead)
    }

    function onToggleMail(mail) {
        const isRead = { ...mail, isRead: !mail.isRead }
        onReadMail(mail.id, isRead)
    }

    if (!mails.length) return <div className="no-mail-found">No messages matched your search. Try other options.</div>
    return (
        <section className='mail-list'>
            <div className="filter-sort-panel">
                <span>
                    Subject
                    <button onClick={() => onClickedSortBySubject('subject', 1)}>↑</button>
                    <button onClick={() => onClickedSortBySubject('subject', -1)}>↓</button>
                </span>
                <span>Date
                    <button onClick={() => onClickedSortByDate('createdAt', 1)}>↑</button>
                    <button onClick={() => onClickedSortByDate('createdAt', -1)}>↓</button>
                </span>
            </div>
            <ul>
                {mails.map(mail => (
                    <li key={mail.id} className={`mail-item ${mail.isRead ? 'read' : ''}`} >
                        <div onClick={() => onClickMail(mail)}>
                            <MailPreview mail={mail} onStarMail={onStarMail} />
                        </div>
                        <div className="btn-mail-preview">
                            <button onClick={() => onRemoveMail(mail.id)}><i className="fa-solid fa-trash-can"></i></button>
                            <button onClick={() => onToggleMail(mail)}>{mail.isRead ? <i className="fa-regular fa-envelope-open"></i> : <i className="fa-regular fa-envelope"></i>}</button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}


// const listAttrs = {
//     className: 'mail-list container',
//     title: 'Hello MailList!',
//     onClick: () => { console.log('List Clicked!') }
// }