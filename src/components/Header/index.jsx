import './style.scss'
import { GroupContext } from '../../App'
import { useContext } from 'react'

const Header = ({modal, toggleModal}) => {

    const group = useContext(GroupContext)

    return (
        <header>
            <div title="add a new card" className="add-button" onClick={()=>toggleModal(p => !p)}>
                <p>{modal? '-' : '+'}</p>
            </div>
            <h1>
                {group}: Ticket Board
            </h1>
        </header>
    )
}

export default Header