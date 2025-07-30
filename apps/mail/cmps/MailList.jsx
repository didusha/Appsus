import { MailPreview } from "../cmps/MailPreview.jsx"

const { useNavigate } = ReactRouterDOM

export function MailList({ mails, onRemoveMail, onReadMail }) {

    const navigate = useNavigate()


    function onClickMail(mailId){
        navigate(`/mail/${mailId}`)
        onReadMail(mailId)
    }

    const mailStatus = ""
    if (!mails.length) return <div>No Mails To Show...</div>
    return (
        <section className='mail-list'>
            <ul>
                {mails.map(mail => (
                    <li key={mail.id} className={`mail-item ${mailStatus}`} onClick={()=>onClickMail(mail.id)}>
                        <MailPreview mail={mail} />
                        <section className="btn-mail-preview">
                            <button onClick={() => onRemoveMail(mail.id)}><i className="fa-solid fa-trash-can"></i></button>
                            <button onClick={() => onReadMail(mail.id)}><i className="fa-regular fa-envelope"></i></button>
                        </section>
                    </li>
                ))}
            </ul>
        </section>
    )
}

{/* <i class="fa-regular fa-envelope-open"></i> */}      //opened mail

    // const listAttrs = {
    //     className: 'mail-list container',
    //     title: 'Hello MailList!',
    //     onClick: () => { console.log('List Clicked!') }
    // }