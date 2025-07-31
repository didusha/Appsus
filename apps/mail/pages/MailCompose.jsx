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
        ev.preventDefault()
        mailService.save(mailToEdit)
            .then(mail => sentMail(mail))
            .then(navigate('/mail'))
            .catch(err => {
                console.log('Cannot save mail!:', err)
                showErrorMsg('Cannot save mail!')
            })
    }

    const { subject, to, body } = mailToEdit
    return (
        <section className="mail-edit">
            <div className="mail-edit-header">
                <span>New Message</span>
                <button type="button" onClick={()=> navigate('/mail/')}>X</button>
            </div>
            <form onSubmit={onSaveMail}>
                {/* <label htmlFor="subject">To</label> */}
                <input required value={to} placeholder="To" onChange={handleChange} type="text" name="to" />
                <input required value={subject} onChange={handleChange} type="text" name="subject" placeholder="Subject" />
                <textarea required name="body" cols='30' rows='10' value={body} onChange={handleChange} placeholder="Enter mail"></textarea>

                <div>
                    <button>Send</button>
                </div>
            </form>
        </section>
    )
}

{/* <label htmlFor="speed">Speed</label>
    <input value={speed} onChange={handleChange} type="number" name="speed" id="speed" /> */}
// <section className={"mail-edit " + loadingClass}>