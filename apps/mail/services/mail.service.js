import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getFilterFromSearchParams,
    checkSender
}

const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.from) || regExp.test(mail.subject) || regExp.test(mail.body))
            }
            if (filterBy.folder === "inbox") {
                mails = mails.filter(mail => mail.to === loggedinUser.email &&
                    mail.removedAt === null && !mail.isDraft &&
                    mail.from !== loggedinUser.email)
            }
            else if (filterBy.folder === "sent") {
                mails = mails.filter(mail => mail.to !== loggedinUser.email && mail.sentAt && mail.removedAt === null && !mail.isDraft)
            }
            else if (filterBy.folder === "trash") {
                mails = mails.filter(mail => mail.removedAt !== null)
            }
            else if (filterBy.folder === "draft") {
                mails = mails.filter(mail => mail.sentAt === null && mail.removedAt === null && mail.isDraft)
            }
            else if (filterBy.folder === "starred") {
                mails = mails.filter(mail => mail.isStarred && mail.removedAt === null)
            }

            if (filterBy.sortRead === "read") {
                mails = mails.filter(mail => mail.isRead)
            }
            else if (filterBy.sortRead === "unRead") {
                mails = mails.filter(mail => !mail.isRead)
            }
            
            if (filterBy.sortField) {
                if (filterBy.sortField === 'createdAt') {
                    mails.sort((mail1, mail2) => (mail1[filterBy.sortField] - mail2[filterBy.sortField]) * filterBy.sortDir)
                } else if (filterBy.sortField === 'subject') {
                    mails.sort((mail1, mail2) => mail1.subject.localeCompare(mail2.subject) * filterBy.sortDir)
                }
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(_setNextPrevMailId)
}

function remove(mailId) {
    return get(mailId).then(mail => {
        if (mail.removedAt) {
            return storageService.remove('mailDB', mailId).then(() => console.log('mail'))
        } else {
            mail.removedAt = Date.now()
            return storageService.put('mailDB', mail)
        }
    })
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(createdAt = Date.now()) {
    const mail = {
        createdAt,
        subject: '',
        body: '\n\nBest Regards,\nCoding academy',
        isRead: false,
        sentAt: null,
        removedAt: null,
        from: 'user@appsus.com',
        to: '',
        isStarred: false,
        isDraft: null,
    }
    return mail
}

function getDefaultFilter() {
    return { txt: '' }
}

function checkSender(mail) {
    return mail.from === loggedinUser.email ? mail.to : mail.from
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY) || []
    if (!mails || !mails.length) {
        mails = [
            {
                id: utilService.makeId(),
                from: 'user@appsus.com',
                to: 'bob@example.net',
                subject: 'Project Update',
                body: 'The project is progressing well. We’ve completed the initial phase and are moving into the review stage. Feedback is appreciated before we finalize everything.',
                sentAt: null,
                draftAt: 1722450000000,
                removedAt: null,
                createdAt: 1722448800000,
                isStarred: false,
                folder: 'draft'
            },
            {
                id: utilService.makeId(),
                from: 'user@appsus.com',
                to: 'david@example.com',
                subject: 'Invoice for July',
                body: 'Please find the attached invoice for the services rendered in July. Let me know if anything looks off or if you require a revised version.',
                sentAt: 1722430000000,
                draftAt: null,
                removedAt: null,
                createdAt: 1722426000000,
                isStarred: true,
                folder: 'sent'
            },
            {
                id: utilService.makeId(),
                from: 'user@appsus.com',
                to: 'emma@example.net',
                subject: 'Reminder: Team Meeting Tomorrow',
                body: 'Just a reminder about our team meeting scheduled for tomorrow at 10 AM. We’ll be discussing the quarterly goals and new team assignments.',
                sentAt: 1722400000000,
                draftAt: null,
                removedAt: null,
                createdAt: 1722398000000,
                isStarred: false,
                folder: 'inbox'
            },
            {
                id: utilService.makeId(),
                from: 'user@appsus.com',
                to: 'frank@example.org',
                subject: 'Draft: Feature Proposal',
                body: 'I started writing up a proposal for the new feature we discussed. It still needs polish, but the basic flow and user benefit cases are outlined.',
                sentAt: null,
                draftAt: 1722380000000,
                removedAt: null,
                createdAt: 1722378000000,
                isStarred: false,
                folder: 'draft'
            },
            {
                id: utilService.makeId(),
                from: 'user@appsus.com',
                to: 'grace@example.com',
                subject: 'Deleted: Vacation Plans',
                body: 'Hey Grace, just wanted to share some vacation plans and get your input. Thinking about Iceland or New Zealand this year, what do you think?',
                sentAt: 1722340000000,
                draftAt: null,
                removedAt: 1722346000000,
                createdAt: 1722339000000,
                isStarred: false,
                folder: 'trash'
            },
            {
                id: utilService.makeId(),
                from: 'user@appsus.com',
                to: 'isabelle@example.org',
                subject: 'Job Offer Update',
                body: 'Following our recent discussions, we’re happy to extend an updated job offer with revised terms. Please review and let us know your decision.',
                sentAt: 1722300000000,
                draftAt: null,
                removedAt: null,
                createdAt: 1722298000000,
                isStarred: false,
                folder: 'inbox'
            },
            {
                id: utilService.makeId(),
                from: 'user@appsus.com',
                to: 'kate@example.net',
                subject: 'Thanks for attending the workshop',
                body: 'We appreciate your time and contribution to the design workshop. Your insights sparked some great discussions and follow-up ideas.',
                sentAt: 1722260000000,
                draftAt: null,
                removedAt: null,
                createdAt: 1722258000000,
                isStarred: true,
                folder: 'sent'
            },
            {
                id: utilService.makeId(),
                from: 'user@appsus.com',
                to: 'leo@example.org',
                subject: 'Draft: Quarterly Report',
                body: 'Started assembling our quarterly report. Let me know if the data charts are clear enough and if you’d like to add a summary or note.',
                sentAt: null,
                draftAt: 1722250000000,
                removedAt: null,
                createdAt: 1722248000000,
                isStarred: false,
                folder: 'draft'
            },
            {
                id: utilService.makeId(),
                from: 'user@appsus.com',
                to: 'mia@example.com',
                subject: 'Product Launch Recap',
                body: 'The launch went smoothly thanks to everyone’s hard work. Customer feedback has been positive so far, and we’re seeing increased traffic.',
                sentAt: 1722230000000,
                draftAt: null,
                removedAt: null,
                createdAt: 1722228000000,
                isStarred: false,
                folder: 'sent'
            },
            {
                id: utilService.makeId(),
                from: 'user@appsus.com',
                to: 'olivia@example.org',
                subject: 'Meeting Agenda - Next Week',
                body: 'Attached is the proposed agenda for next week’s meeting. Feel free to suggest edits or bring new topics to include on the discussion list.',
                sentAt: 1722190000000,
                draftAt: null,
                removedAt: null,
                createdAt: 1722188000000,
                isStarred: false,
                folder: 'inbox'
            },
            {
                id: utilService.makeId(),
                from: 'user@appsus.com',
                to: 'rachel@example.org',
                subject: 'Team Building Activity Ideas',
                body: 'Looking for input on fun team building activities. Let’s come up with something outdoors, engaging, and inclusive for all teams involved.',
                sentAt: null,
                draftAt: 1722140000000,
                removedAt: null,
                createdAt: 1722138000000,
                isStarred: false,
                folder: 'draft'
            },
            {
                id: utilService.makeId(),
                createdAt: 1551133930500,
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                createdAt: Date.now(),
                subject: 'Hey there!',
                body: 'Just checking in to see how you are.',
                isRead: false,
                sentAt: Date.now(),
                removedAt: null,
                from: 'alice@example.com',
                to: 'user@appsus.com',
            },
            {
                id: utilService.makeId(),
                createdAt: new Date('2024-11-15').getTime(), // פחות משנה
                subject: 'Project update',
                body: 'The project is progressing well.',
                isRead: true,
                sentAt: new Date('2024-11-15').getTime(),
                removedAt: null,
                from: 'bob@example.com',
                to: 'user@appsus.com',
            },
            {
                id: utilService.makeId(),
                createdAt: new Date('2023-07-24').getTime(),
                subject: 'Happy Birthday!',
                body: 'Wishing you all the best on your special day.',
                isRead: false,
                sentAt: new Date('2023-07-24').getTime(),
                removedAt: null,
                from: 'mom@example.com',
                to: 'user@appsus.com',
            },
            {
                id: utilService.makeId(),
                createdAt: new Date('2022-03-01').getTime(),
                subject: 'Old Reminder',
                body: 'Don’t forget to file your taxes.',
                isRead: true,
                sentAt: new Date('2022-03-01').getTime(),
                removedAt: null,
                from: 'noreply@irs.gov',
                to: 'user@appsus.com',
            },
            {
                id: utilService.makeId(),
                createdAt: new Date('2025-07-01').getTime(),
                subject: 'Meeting follow-up',
                body: 'Here’s what we discussed yesterday...',
                isRead: true,
                sentAt: new Date('2025-07-01').getTime(),
                removedAt: null,
                from: 'teamlead@company.com',
                to: 'user@appsus.com',
            },
            {
                id: utilService.makeId(),
                createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
                subject: 'Meeting Recap',
                body: 'Hey team, just recapping our discussion from today. We agreed to finalize the design specs by Friday, and then move to testing. Please update your progress before Thursday noon. Let me know if anything is unclear.',
                isRead: false,
                sentAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
                removedAt: null,
                from: 'dana@company.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
                subject: 'Flight Details',
                body: 'Your flight is confirmed for next week. Departure from JFK at 9:30 AM. Arrival at LAX is expected at 12:15 PM local time. Please check in online and bring your ID and boarding pass.',
                isRead: true,
                sentAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
                removedAt: null,
                from: 'noreply@airline.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
                subject: 'Invoice Attached',
                body: 'Hello, please find attached the invoice for your latest purchase. If you have any questions or believe there’s an error in the billing, contact us within 7 business days. Thank you for choosing our service.',
                isRead: false,
                sentAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
                removedAt: null,
                from: 'billing@store.com',
                to: 'user@appsus.com'
            },
        ]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const folder = searchParams.get('folder') || 'inbox'
    const sortField = searchParams.get('sortField') || 'createdAt'
    const sortDir = searchParams.get('sortDir') || -1
    const sortRead = searchParams.get('') 
    
    return {
        txt,
        folder,
        sortField,
        sortDir,
        sortRead,
    }
}

function _setNextPrevMailId(mail) {
    return query().then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}