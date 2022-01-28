import './App.css'

import Header from './components/Header'
import Loading from './components/Loading'
import SubmitForm from './components/SubmitForm'
import Column from './components/Column'
import Ticket from './components/Ticket'

import { getBoard } from './utilities/api'

import { useState, useEffect, createContext } from 'react'
export const GroupContext = createContext('')

function App({group}) {

  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [tickets, setTickets] = useState({})
  const [selectedTicket, setSelectedTicket] = useState(null)

  useEffect(() => {
    document.title = `${group}: Ticket Board`
  },[group])

  // get data
  useEffect(() => {
    const setBoard = async () => {
      const tix = await getBoard(group)
      setTickets(tix)
      loading && setLoading(false)
    }
    setBoard()
  },[refresh, loading, group])

  // auto refresh
  useEffect(() => {
    const interval = setInterval(()=>{
        setRefresh(p=>!p)
      }, (1000 * 60 * 3)
    )
    return () => clearInterval(interval)
  },[])

  return (
    <div className="App">
        <GroupContext.Provider value={group}>
          <Header modal={modal} toggleModal={setModal}/>
          { loading ?
            <Loading on={true} toggle={() => setModal(p => !p)} /> :
            <SubmitForm on={modal} toggle={() => setModal(p => !p)} setRefresh={setRefresh}/>
          }
          { selectedTicket && <Ticket ticket={selectedTicket} setSelected={setSelectedTicket} setRefresh={setRefresh} />}
          <div className="main">
            <Column name="Open tickets" tickets={tickets.open} setSelectedTicket={setSelectedTicket} />
            <Column name="Resolved tickets" tickets={tickets.resolved} setSelectedTicket={setSelectedTicket} />
          </div>
          { tickets.open && tickets.resolved && !tickets.open.length && !tickets.resolved.length &&
            <div className="empty-group">
              <p>There are no tickets for <strong>{group}</strong>.</p>
              <p>Maybe you're at the wrong URL?</p>
              <p>If not, you can <button type="button" onClick={()=>setModal(p=>!p)}>Create a ticket</button> to start the board!</p>
            </div>
          }
        </GroupContext.Provider>
    </div>
  );
}

export default App;
