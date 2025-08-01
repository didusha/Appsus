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
    }, [])

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

    function onSaveMail(ev) {
        console.log("onSaveMail")
        ev.preventDefault()
        mailService.save(mailToEdit)
            .then(mail => sentMail(mail))
            .then(navigate('/mail'))
            .catch(err => {
                console.log('Cannot save mail:', err)
                showErrorMsg('Cannot save mail')
            })
    }
    
    const { subject, to, body } = mailToEdit
    const signature = "Best Regards,\nCoding academy"
    return (
        <section className="mail-compose">
            <div className="mail-compose-header">
                <span>New Message</span>
                <button type="button" onClick={() => navigate('/mail/')}>x</button>
            </div>
            <form onSubmit={onSaveMail}>
                {/* <input value={from} placeholder="From" onChange={handleChange} type="text" name="from" className="from" /> */}
                <input required value={to} placeholder="To" onChange={handleChange} type="text" name="to" className="to" />
                <input required value={subject} onChange={handleChange} type="text" name="subject" placeholder="Subject" className="subject" />
                <textarea required name="body" cols='30' rows='10' value={body} onChange={handleChange} className="body" defaultValue={signature}></textarea>
                <div>
                    <button className="btn-send-mail">Send</button>
                </div>
            </form>
        </section>
    )
}
