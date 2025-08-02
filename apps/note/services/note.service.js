import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createTxtNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    createTxtNote,
    createImgNote,
    createTodosNote,
    createVideoNote,
    getDefaultFilter,
    getFilterFromSearchParams,
    onMailToNote
}

function query(filterBy = {}) {

    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.info.txt))
            }
            if (filterBy.type) {
                notes = notes.filter(note => note.type === filterBy.type)
            }

            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId).then(_setNextPrevNoteId)
}

function remove(noteId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function createTxtNote(txt = '', type = 'NoteTxt') {
    return {
        createdAt: Date.now(),
        type,
        isPinned: false,
        style: {
            backgroundColor: '#fffcaa'
        },
        info: {
            txt
        }
    }
}

function createImgNote(url) {
    return {
        createdAt: Date.now(),
        type: 'NoteImg',
        isPinned: false,
        info: {
            url,
            title: 'My picture'
        },
        style: {
            backgroundColor: '#c4ffb9'
        }
    }
}

function createTodosNote(title = '') {
    return {
        createdAt: Date.now(),
        type: 'NoteTodos',
        isPinned: false,
        style: {
            backgroundColor: '#e3b7ff'
        },
        info: {
            title,
            todos: []
        }
    }
}

function createVideoNote(url) {
    return {
        createdAt: Date.now(),
        type: 'NoteVideo',
        isPinned: false,
        info: {
            url,
            title: 'My video'
        },
        style: {
            backgroundColor: '#c4ffb9'
        }
    }
}


function getDefaultFilter() {
    return { txt: '', type }
}

function _createTxtNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: utilService.makeId(),
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#ffbbdf'
                },
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            },
            {
                id: utilService.makeId(),
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#fffcaa'
                },
                info: {
                    txt: 'Fullstack Me Baby!2'
                }
            },
            {
                id: utilService.makeId(),
                createdAt: 1112223,
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://i0.wp.com/observer.ug/wp-content/uploads/2020/09/Bobi-Wine-and-Barbie-Share-First-Joint-Magazine-Cover.jpg?fit=760%2C546&ssl=1',
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: '#c4ffb9'
                }
            },
            {
                id: utilService.makeId(),
                createdAt: 1112224,
                type: 'NoteTodos',
                isPinned: false,
                style: {
                    backgroundColor: '#e3b7ff'
                },
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                }
            },
            {
                id: utilService.makeId(),
                createdAt: 1112223,
                type: 'NoteVideo',
                isPinned: false,
                info: {
                    url: "https://www.youtube.com/embed/8R21_KLHvQM",
                    title: 'Bali surfing'
                },
                style: {
                    backgroundColor: '#bcedff'
                }
            },
        ]

        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

// function _createTxtNote(vendor, speed = 250) {
//     const note = getEmptyNote(vendor, speed)
//     note.id = makeId()
//     return note
// }


function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const minSpeed = searchParams.get('minSpeed') || ''
    return {
        txt,
        minSpeed
    }
}

function _setNextPrevNoteId(note) {
    return query().then((notes) => {
        const noteIdx = notes.findIndex((currNote) => currNote.id === note.id)
        const nextNote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0]
        const prevNote = notes[noteIdx - 1] ? notes[noteIdx - 1] : notes[notes.length - 1]
        note.nextNoteId = nextNote.id
        note.prevNoteId = prevNote.id
        return note
    })
}

function onMailToNote(mail){
    console.log(mail);
}
