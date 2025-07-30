
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
// import { MailDetails } from "./MailDetails.jsx"
import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"


const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM


export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        setSearchParams(utilService.getTruthyValues(filterBy))
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(mails => setMails(mails))
            .catch(err => {
                console.log("err:", err)
                showErrorMsg("Cannot get mails!")
            })
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails((prevMails) => prevMails.filter(mail => mail.id !== mailId))
                showSuccessMsg(`Mail (${mailId}) removed successfully!`)
            })
            .catch(err => {
                console.log("Problem removing mail:", err)
                showErrorMsg("Problem removing mail!")
            })
    }

    function onSetFilterBy(filterByToEdit) {
        setFilterBy({ ...filterByToEdit })
    }


    if (!mails) return <div className="loader">Loading...</div>
    return (
        <section className="mail-index">
            <section className="btn-add-mail">
                <Link to="/mail/edit">Compose</Link>
            </section>
            <MailFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
            <MailList onRemoveMail={onRemoveMail} mails={mails} />
        </section>
    )
}

