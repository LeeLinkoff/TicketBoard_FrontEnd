import './style.scss'
import { minutesAgo } from '../../utilities/time'

const Ticket = ({ticket, setSelectedTicket}) => {

    return (
        <div className="ticket-card" onClick={()=>setSelectedTicket(ticket)}>
            <div className={`ticket-card-header ${ticket.type && ticket.type.toLowerCase()}`}>
                <h2>{ticket.name}</h2>
                <div className="ticket-card-header-meta">                    
                    <h4>{ticket.type.toUpperCase()}</h4>
                    <h4>{ticket.open ? 
                            minutesAgo(ticket.createdAt) : 
                            `resolved ${minutesAgo(ticket.updatedAt)} ${ticket.resolver ? `by ${ticket.resolver}` : ''}`}</h4>
                </div>
            </div>
            <p>{ticket.description.substr(0,140)}{ticket.description.length > 140 && '...'}</p>
            <p className="ticket-card-meta">ID: {ticket._id}</p>
        </div>
    )

}

export default Ticket