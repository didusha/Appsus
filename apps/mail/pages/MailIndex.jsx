
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"
import { MailFolderList } from "../cmps/MailFolderList.jsx"


const { useState, useEffect } = React
const { Link, Outlet, useSearchParams } = ReactRouterDOM


export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [unReadMails, setUnReadMails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        setSearchParams(utilService.getTruthyValues(filterBy))
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(mails => {
                setUnReadMails(mails.filter(mail => !mail.isRead).length)
                setMails(mails)
            })
            .catch(err => {
                console.log("err:", err)
                showErrorMsg("Cannot get mails")
            })
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails((prevMails) => prevMails.filter(mail => mail.id !== mailId))
                showSuccessMsg(`Mail (${mailId}) removed successfully!`)
            })
            .catch(err => {
                console.log("Cannot get mail:", err)
                showErrorMsg("Cannot get mail")
            })
    }

    function onSetFilterBy(filterByToEdit) {
        setFilterBy({ ...filterByToEdit })
    }

    function sentMail(newMail) {
        setMails([...mails, newMail])
        setMails(prevMails => prevMails.filter(mail => { mail.id !== newMail.id}))
    }

    function onReadMail(mailId, isRead) {
        mailService.get(mailId)
            .then(prevMail => {
                const updatedMail = { ...prevMail, ...isRead }
                return mailService.save(updatedMail)
            })
            .then(() => loadMails())
            .catch(err => {
                console.error('Error updating mail:', err)
            })
    }

    function onStarMail(mailId, isStarred) {
        mailService.get(mailId)
            .then(prevMail => {
                const updatedMail = { ...prevMail, ...isStarred }
                return mailService.save(updatedMail)
            })
            .then(() => loadMails())
            .catch(err => {
                console.error('Error updating mail:', err)
            })
    }

    if (!mails) return <div className="loader">Loading...</div>
    return (
        <section className="mail-index">
            <MailFolderList className="side-nav" unReadMails={unReadMails} onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
            <div>
                <MailFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
                <MailList onRemoveMail={onRemoveMail} onReadMail={onReadMail} mails={mails} onStarMail={onStarMail} />
                <Outlet context={{ sentMail }} />
            </div>
        </section>
    )
}
