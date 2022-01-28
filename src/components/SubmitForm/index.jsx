import './style.scss'
import Modal from '../Modal'
import { useState, useEffect, useContext } from 'react'
import { createTicket } from '../../utilities/api'
import { GroupContext } from '../../App'

const SubmitForm = ({on, toggle, setRefresh}) => {

    const group = useContext(GroupContext)

    const [loading, setLoading] = useState(false)
    const [type, setType] = useState('Bug')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')
    const [process, setProcess] = useState('')

    const clearForm = () => {
        setName('')
        setDescription('')
        setError('')
        setProcess('')
    }

    useEffect(() => {
        clearForm()
    },[on])

    return (
        <Modal on={on} toggle={toggle} slim={true}>
            <form className="new" onSubmit={async (e)=>{
                setLoading(true)
                e.preventDefault()
                await createTicket(group, {type,name,description,error,process})
                setRefresh(p => !p)
                setLoading(false)
                toggle(false)
            }}>

                <h1>
                    <span>Create a new ticket</span>
                    <span className="x-mark" onClick={()=>toggle(p => !p)}>&#x2717;</span>
                </h1>
                <div>
                    <label htmlFor='type'>Ticket type: </label>
                    <select name="type" onChange={(e) => setType(e.target.value)} value={type}>
                        <option value="Bug">Bug</option>
                        <option value="Planning">Planning</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="name">Your name: </label>
                    <input 
                        type="text" 
                        name="name" 
                        onChange={(e) => setName(e.target.value)} 
                        value={name}
                        required
                        />
                </div>
                <div>
                    <label htmlFor="description">Description: { type === "Bug" && <i>(What is happening? What should happen?)</i>}</label>
                    <textarea 
                        name="description" 
                        onChange={(e) => setDescription(e.target.value)} 
                        value={description} 
                        required
                        />
                </div>
                {
                    type === 'Bug' &&
                    <>
                        <div>
                            <label htmlFor="error">Error message:</label>
                            <textarea 
                                name="error" 
                                onChange={(e) => setError(e.target.value)} 
                                value={error}
                                required
                                />
                        </div>
                        <div>
                            <label htmlFor="process">What have you tried so far?</label>
                            <textarea 
                                name="process" 
                                onChange={(e) => setProcess(e.target.value)} 
                                value={process} 
                                required 
                                />
                        </div>
                        </>
                }
                <div className="submit-control">
                    <button type="submit">
                        {loading? "LOADING..." : "Submit Ticket"}
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default SubmitForm