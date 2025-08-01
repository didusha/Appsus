import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

export function MailDetails() {

    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [params.mailId])

    function loadMail() {
        mailService.get(params.mailId)
            .then(mail => { setMail(mail) })
            .catch(err => console.log('err:', err))
    }

    function onBack() {
        navigate('/mail')
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => navigate('/mail'))
    }

    if (!mail) return <div>Loading..</div>
    // const { subject, body } = mail
    return (
        <article className='mail-details'>

            <div className="mail-actions">
                <button><Link to={`/mail/${mail.prevMailId}`}>⬅ Prev </Link></button>
                <button><Link to={`/mail/${mail.nextMailId}`}>Next ➡ </Link></button>
            </div>
            <header className="mail-header">
                <div className="mail-header-details">
                    <h2 className="mail-subject">{mail.subject}</h2>
                    <p className="mail-from"><strong>From:</strong> {mail.from}</p>
                    <p className="mail-to"><strong>To:</strong> {mail.to}</p>
                    <p className="mail-date">{new Date(mail.sentAt).toLocaleString()}</p>
                </div>
                <button onClick={() => onRemoveMail(mail.id)}><i className="fa-solid fa-trash-can"></i></button>
            </header>
            <section className="mail-body">
                <p>{mail.body}</p>
            </section>
        </article>
    )
}
