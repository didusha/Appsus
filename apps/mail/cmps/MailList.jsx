import { MailPreview } from "../cmps/MailPreview.jsx"

const { useNavigate } = ReactRouterDOM

export function MailList({ mails, onRemoveMail, onReadMail }) {

    const navigate = useNavigate()


    function onClickMail(mail) {
        navigate(`/mail/${mail.id}`)
        const isRead = { isRead: true }
        onReadMail(mail.id, isRead)
    }

    function onToggleMail(mail) {
        const isRead = { ...mail, isRead: !mail.isRead }
        onReadMail(mail.id, isRead)
    }

    const mailStatus = ""
    if (!mails.length) return <div>No Mails To Show...</div>
    return (
        <section className='mail-list'>
            <ul>
                {mails.map(mail => (
                    <li key={mail.id} className={`mail-item ${mail.isRead ? 'read' : ''}`} >
                        <div  onClick={() => onClickMail(mail)}>
                            <MailPreview mail={mail} />
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