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
                    </li>
                ))}
            </ul>
        </section>
    )
}

{/* <section>
    <button onClick={() => onRemoveMail(mail.id)}>
        Remove
    </button>
    <button >
        <Link to={`/mail/${mail.id}`}>Details</Link>
    </button>
    <button >
        <Link to={`/mail/edit/${mail.id}`}>Edit</Link>
    </button>
</section>  */}