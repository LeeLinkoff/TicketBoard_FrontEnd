import './style.scss'
import TicketCard from '../TicketCard'

const Column = ({name, tickets, setSelectedTicket}) => {
    return (
        <div className="column">
            <h2>{name} &nbsp; &nbsp; <span>{tickets && tickets.length}</span></h2>
            {
                tickets && 
                tickets.map(t => <TicketCard 
                    key={t._id}
                    ticket={t} 
                    setSelectedTicket={setSelectedTicket}
                    />)
            }
        </div>
    )
}

export default Column