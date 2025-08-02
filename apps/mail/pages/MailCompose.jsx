import { mailService } from "../services/mail.service.js"
import { showErrorMsg } from "../../../services/event-bus.service.js"
const { useEffect } = React
const { useNavigate, useParams, useOutletContext } = ReactRouterDOM

const { useState } = React

export function MailCompose() {

    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())
    const { sentMail } = useOutletContext()
    const navigate = useNavigate()
    const { mailId } = useParams()

    useEffect(() => {
        if (mailId) loadMail()
    }, [mailId])

    function loadMail() {
        mailService.get(mailId)
            .then(mail => setMailToEdit(mail))
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setMailToEdit(prevMail => ({ ...prevMail, [field]: value }))
    }

    function onSentMail(ev) {
        ev.preventDefault()
        mailToEdit.sentAt = Date.now()
        mailToEdit.isDraft = false
        mailService.save(mailToEdit)
            .then(mail => {
                sentMail()
                navigate('/mail')
            })
            .catch(err => {
                console.log('Cannot save mail:', err)
                showErrorMsg('Cannot save mail')
            })
    }

    function onDraftMail(ev) {
        ev.preventDefault()
        if (!mailToEdit.to.length && !mailToEdit.subject.length)
            return navigate('/mail')
        mailToEdit.isDraft = true
        mailService.save(mailToEdit)
            .then(mail => {
                sentMail()
                navigate('/mail')
            })
            .catch(err => {
                console.log('Cannot save mail:', err)
                showErrorMsg('Cannot save mail')
            })
    }
    
    const { subject, to, body } = mailToEdit
    return (
        <section className="mail-compose">
            <div className="mail-compose-header">
                <span>New Message</span>
                <button type="button" onClick={onDraftMail}>x</button>
            </div>
            <form onSubmit={onSentMail}>
                <input required value={to} placeholder="To" onChange={handleChange} type="text" name="to" className="to" />
                <input required value={subject} onChange={handleChange} type="text" name="subject" placeholder="Subject" className="subject" />
                <textarea required name="body" cols='30' rows='10' value={body} onChange={handleChange} className="body"></textarea>
                <div>
                    <button className="btn-send-mail">Send</button>
                </div>
            </form>
        </section>
    )
}
