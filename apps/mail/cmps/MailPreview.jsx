import { utilService } from "../../../services/util.service.js"

export function MailPreview({ mail }) {

    const { subject, to, createdAt, body } = mail
    return (
        <div className="mail-preview">
            {/* <input type="checkbox" ></input> */}
            <i className="fa-regular fa-star"></i>
            <span className="from">{utilService.showtSenderName(to)}</span>
            <div className="mail-content">
                <span className="subject">{subject}</span>
                <span className="body">{body}</span>
            </div>

            <span className="created-at">{utilService.formatMailDate(createdAt)}</span>
        </div>
    )
}