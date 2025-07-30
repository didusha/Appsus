const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
// import { showErrorMsg } from "../../../services/event-bus.service.js"

export function MailDetails() {

    const [mail, setMail] = useState(null)
    // const [isLoading, setIsLoading] = useState(true)
    // const [isLoadingReview, setIsLoadingReview] = useState(false)
    // const [isShowReviewModal, setIsShowReviewModal] = useState(null)


    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [params.mailId])

    function loadMail() {
        mailService.get(params.mailId)
            .then(mail => {setMail(mail)})
            .catch(err => console.log('err:', err))
    }

    function onBack() {
        navigate('/mail')
    }

    if (!mail) return <div>Loading..</div>
    const { subject, body } = mail
    return (
        <article className='mail-details'>

            <h3>{subject}</h3>
            <p>{body}</p>

            <button onClick={onBack}>Back</button>
            <section>
                <button ><Link to={`/mail/${mail.prevMailId}`}>Prev </Link></button>
                <button ><Link to={`/mail/${mail.nextMailId}`}>Next </Link></button>
            </section>
        </article>
    )
}

{/* <nav className='mail-details-nav'>
                <Link to={`/mail/${mail.prevMailId}`}>
                    <button><i className="fa-solid fa-arrow-left"></i></button>
                </Link>
                <Link to={`/mail/${mail.nextMailId}`}>
                    <button><i className="fa-solid fa-arrow-right"></i></button>
                </Link>
            </nav> */}
{/* <h2>{subject}</h2>
            <p>{body}</p> */}

//             <p className={mail.listPrice.amount > 200 ? 'high-price' : 'low-price'}>
//     <span className='bold-txt'>Price: </span>
//     {mail.listPrice.amount} {mail.listPrice.currencyCode}
// </p>
// <p>
//     <span className='bold-txt'>Language:</span>
//     {mail.language}
// </p>
// {mail.categories && <p>
//     <span className='bold-txt'>Categoric:</span> {mail.categories}
// </p>}
// {mail.authors && <p>
//     <span className='bold-txt'>Authors:</span> {mail.authors}
// </p>}