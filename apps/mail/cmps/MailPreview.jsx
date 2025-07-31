import { utilService } from "../../../services/util.service.js"

export function MailPreview({ mail, onStarMail }) {

    function onToggleStar() {
        const isStarred = { ...mail, isStarred: !mail.isStarred }
        onStarMail(mail.id, isStarred)
    }

    const { subject, from, createdAt, body } = mail
    return (
        <div className="mail-preview">
            {/* <input type="checkbox" ></input> */}
            <span onClick={(ev) => {
                ev.stopPropagation()
                onToggleStar(mail)
            }}>{mail.isStarred ? <i className="fa-solid fa-star"></i>: <i className="fa-regular fa-star"></i>}</span>
            <span className="from">{utilService.showtSenderName(from)}</span>
            <div className="mail-content">
                <span className="subject">{subject}</span>
                <span className="body">{body}</span>
            </div>
            <span className="created-at">{utilService.formatMailDate(createdAt)}</span>
        </div>
    )
}