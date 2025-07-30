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
    getFilterFromSearchParams
}

const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.from) || regExp.test(mail.subject) || regExp.test(mail.body))
            }
            // if (filterBy.minCreatedAt) {
            //     mails = mails.filter(mail => mail.createdAt >= filterBy.minCreatedAt)
            // }
            // console.log(' mails:', mails)
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(_setNextPrevMailId)
}

function remove(mailId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        mail.sentAt = new Date()
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(createdAt = Date.now()) {
    return {
        id: '',
        createdAt,
        subject: '',
        body: '',
        isRead: false,
        sentAt: '',
        removedAt: '',
        from: 'user@appsus.com',
        to: '',
    }
}

function getDefaultFilter() {
    return { txt: '' }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY) || []
    if (!mails || !mails.length) {
        mails = [
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
                createdAt: Date.now(), // היום
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
                createdAt: new Date('2023-07-24').getTime(), // מעל שנה
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
                createdAt: new Date('2022-03-01').getTime(), // מעל שנה
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
                createdAt: new Date('2025-07-01').getTime(), // לפני חודש
                subject: 'Meeting follow-up',
                body: 'Here’s what we discussed yesterday...',
                isRead: true,
                sentAt: new Date('2025-07-01').getTime(),
                removedAt: null,
                from: 'teamlead@company.com',
                to: 'user@appsus.com',
            }

        ]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    // const minCreatedAt = searchParams.get('minCreatedAt') || ''
    return {
        txt,
        // minCreatedAt
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

function getEmptyMail(subject = '', createdAt = '') {
    return { subject, createdAt }
}


// const mail = { id: 'e101', createdAt: 1551133930500, subject: 'Miss you!', body: 'Would love to catch up sometimes', isRead: false, sentAt: 1551133930594, removedAt: null, from: 'momo@momo.com', to: 'user@appsus.com' }

// function _createMail(subject, createdat = 250) {
//     const mail = getEmptyMail(subject, createdat)
//     mail.id = utilService.makeId()
//     return mail
// }

// function _createMail() {
//     const mail = getEmptyMail()
//     mail.id = utilService.makeId()
//     return mail
// }
