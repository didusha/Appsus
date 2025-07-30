import { utilService } from "../../../services/util.service.js"

export function MailPreview({ mail }) {

    const { subject, from, createdAt, body } = mail
    return (
        <div>
            <span className="from">{utilService.getSenderName(from)}</span>
            <div className="mail-content">
                <span className="subject">{subject}</span>
                <span className="body">{body}</span>
            </div>
            <span className="created-at">{utilService.formatMailDate(createdAt)}</span>
        </div>
    )
}