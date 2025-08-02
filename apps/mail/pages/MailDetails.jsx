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
    return (
        <article className='mail-details'>
            <div className="toolbar">
                <button onClick={() => navigate('/mail')}><i className="fa-solid fa-arrow-left-long"></i></button>
                <button onClick={() => onRemoveMail(mail.id)}><i className="fa-solid fa-trash-can"></i></button>
                <button><i className="fa-regular fa-envelope"></i></button>
                <button><i className="fa-solid fa-pen-to-square"></i></button>
                <button><i className="fa-solid fa-print"></i></button>
                <button><Link to={`/mail/${mail.prevMailId}`}><i className="fa-solid fa-angle-left"></i></Link></button>
                <button><Link to={`/mail/${mail.nextMailId}`}><i className="fa-solid fa-angle-right"></i></Link></button>
            </div>

            <div className="mail-content-layout">
                <div className="sender-icon">S</div>
                <div className="mail-main">
                    <header className="mail-header">
                        <h1> {mail.subject}</h1>
                        <div className="mail-header-details">
                            <span className="mail-date">{new Date(mail.sentAt).toLocaleString()}</span>
                            <button><i className="fa-solid fa-star"></i></button>
                            <button>↩</button>
                            <button>⋮</button>
                        </div>
                    </header>

                    <div className="sender-details">
                        <p><strong>From:</strong> {mail.from}</p>
                        <p><strong>To:</strong> {mail.to}</p>
                    </div>

                    <section className="mail-body">
                        <p>{mail.body}</p>
                    </section>
                </div>
            </div>

            <div className="mail-actions">
                <button>↩ Reply</button>
                <button>↪ Forward</button>
            </div>

            {/* <div className="mail-actions">
                <button><Link to={`/mail/${mail.prevMailId}`}>⬅ Prev </Link></button>
                <button><Link to={`/mail/${mail.nextMailId}`}>Next ➡ </Link></button>
            </div> */}
        </article>
    )
}
