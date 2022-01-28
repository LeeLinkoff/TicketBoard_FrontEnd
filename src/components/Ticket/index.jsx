import './style.scss'
import { minutesAgo } from '../../utilities/time'
import { resolveTicket, commentTicket, reopenTicket } from '../../utilities/api'

import { useState } from 'react'

import Modal from '../Modal'

const Ticket = ({ticket, setSelected, setRefresh}) => {

    const [resolver, setResolver] = useState(ticket.resolver || "")
    const [commentOnly, setCommentOnly] = useState(false)
    const [note, setNote] = useState('') 

    const submitForm = async (e, resolver) => {
        e.preventDefault()
        if (commentOnly) {
            const commentedTicket = await commentTicket(ticket._id, resolver, note)
            console.log(commentedTicket)
            setCommentOnly(false)
            setNote("")
            await setSelected(commentedTicket)
        } else {
            const resolvedTicket = await resolveTicket(ticket._id, resolver, note)
            console.log(resolvedTicket)
            await setSelected(null)
        }
        await setRefresh(p=>!p)
    }

    const reopen = async () => {
        const reopenedTicket = await reopenTicket(ticket._id)
        await setRefresh(p=>!p)
        setResolver('')
        await setSelected(reopenedTicket)
    }

    return (
        <Modal on={true} toggle={()=>setSelected(null)}>
            <div className="ticket">
                <div className={`ticket-header ${ticket.type && ticket.type.toLowerCase()}`}>
                    <div className="ticket-header-content">
                        <h2>{ticket.name}</h2>
                        <div className="ticket-header-meta">                    
                            <h4>{ticket.type.toUpperCase()}</h4>
                            <h4>{ticket.open ? 
                                    minutesAgo(ticket.createdAt) : 
                                    `resolved ${minutesAgo(ticket.updatedAt)} ${ticket.resolver ? `by ${ticket.resolver}` : ''}`}</h4>
                        </div>
                    </div>
                    <div className="x-mark" onClick={()=>setSelected(null)}>&#x2717;</div>
                </div>
                <div className="ticket-content">
                    <h3>:: Description</h3>
                    { 
                        ticket.description
                            .split('\n')
                            .map((p,i) => {
                                return p.startsWith('http') ?
                                <a href={p} target="_blank" rel="noreferrer" key={i}>{p}</a> :
                                <p key={i}>{p}</p>
                            })
                    }
                    {
                        ticket.type === "Bug" &&
                        <>
                        <h3>:: Error Message</h3>
                        <pre>{ticket.error}</pre>
                        <h3>:: Process</h3>
                        { ticket.process
                        .split('\n')
                        .map((p,i) => <p key={i}>{p}</p>)}
                        </>
                    }
                </div>
                {
                    ticket.notes && ticket.notes.length > 0 &&
                        <div className="ticket-correspondence">
                            <h3>:: Notes</h3>
                            { ticket.notes.map(note => (
                                <div key={note.createdAt}>
                                    <h5>{note.author} <span>{minutesAgo(note.createdAt)}</span></h5>
                                    <p>{note.content}</p>
                                </div>
                                ))}
                        </div>
                }
                <div className={commentOnly || (resolver && resolver !== ticket.resolver) ? "ticket-control comment" : "ticket-control"}>
                    <p className="ticket-meta">ID: {ticket._id}</p>
                    {
                        ticket.open ?
                            <form onSubmit={(e)=>submitForm(e, resolver)}>
                                <div className="resolver-control">
                                    <button type="button" onClick={()=>setCommentOnly(p=>!p)} className={`comment-button${commentOnly ? " active" : ""}`}>Comment</button>
                                    <button type="submit">{commentOnly ? "Send" : "Resolve"}</button>
                                    <div className="initials">
                                        <label htmlFor='resolver'>Initials</label>
                                        <input type="text" name="resolver" value={resolver} onChange={(e)=>setResolver(e.target.value)} required minLength={2} maxLength={3} />
                                    </div>
                                </div>
                                { (resolver || commentOnly) && <textarea name="note" placeholder={commentOnly ? "Add your comment." : "Add a note?"} required={commentOnly} onChange={(e)=>setNote(e.target.value)} value={note} /> }
                            </form> :
                            <button type="button" onClick={reopen}>Re-open</button>
                    }
                </div>
            </div>
        </Modal>
    )

}

export default Ticket