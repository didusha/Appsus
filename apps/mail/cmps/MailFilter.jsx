import { utilService } from "../../../services/util.service.js"

const { useState, useEffect,useRef } = React

export function MailFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterByDebounce = useRef(utilService.debounce(onSetFilterBy, 500)).current

    useEffect(() => {
        onSetFilterByDebounce(filterByToEdit)
    }, [filterByToEdit])

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
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { txt } = filterByToEdit
    return (
        <section className="mail-filter">
            <form>
                {/* <label htmlFor="txt">Subject</label> */}
                <input className="serach-input" onChange={handleChange} value={txt} name="txt" type="text" placeholder="Search mail"/>

                {/* <label htmlFor="minSpeed">Min Speed</label>
                <input onChange={handleChange} value={minSpeed || ''} name="minSpeed" id="minSpeed" type="number" /> */}
            </form>
        </section>
    )
}

