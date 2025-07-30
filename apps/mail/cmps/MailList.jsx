import { MailPreview } from "../cmps/MailPreview.jsx"

const { Link } = ReactRouterDOM

export function MailList({ mails, onRemoveMail }) {

    const listAttrs = {
        className: 'mail-list container',
        title: 'Hello MailList!',
        onClick: () => { console.log('List Clicked!') }
    }

    if (!mails.length) return <div>No Mails To Show...</div>
    return (
        <section className='mail-list'>
            <ul>
                {mails.map(mail => (
                    <li key={mail.id} className="mail-item">
                        <MailPreview mail={mail} />
                        <section className="btn-mail-preview">
                            <button onClick={() => onRemoveMail(mail.id)}><i className="fa-solid fa-trash-can"></i></button>
                        </section>
                    </li>
                ))}
            </ul>
        </section>
    )
}

{/* <section>
    
    <button >
        <Link to={`/mail/${mail.id}`}>Details</Link>
    </button>
    <button >
        <Link to={`/mail/edit/${mail.id}`}>Edit</Link>
    </button>
</section>  */}