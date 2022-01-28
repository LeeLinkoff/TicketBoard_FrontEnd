import './style.scss'
import { useEffect } from "react"

const NoGroup = (props) => {

    useEffect(()=> {
        document.title = "Ticket Board"
    },[])

    return (
        <section className="no-group">
            <h1>Ticket Board</h1>
            <h3>No group has been selected.</h3>
            <div>Please contact your group administrator for your group URL.</div>
        </section>
    )
}

export default NoGroup