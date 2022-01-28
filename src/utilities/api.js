const url = window.location.hostname === "localhost" 
    || window.location.hostname === "127.0.0.1" ?
    "http://localhost:3000" :
    "https://njit-tickets-api.herokuapp.com"

export const getBoard = async (group) => {
    try {
        const board = await fetch(url + '/boards/' + group)
        return await board.json()
    } catch (err) {
        console.log(err)
        return false
    }
}

export const createTicket = async (group, ticketData) => {
    try {
        const newTicket = await fetch(url + '/tickets/' + group, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketData)
        })
        return await newTicket.json()
    } catch (err) {
        console.log(await err.json())
        return false
    }
} 

export const resolveTicket = async (ticketId, ticketResolver, note) => {
    try {
        const resolvedTicket = await fetch(url + '/tickets/' + ticketId, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                open: false,
                resolver: ticketResolver.toUpperCase(),
                content: note
            })
        })
        return await resolvedTicket.json()
    } catch (err) {
        console.log(err)
        return false
    }
}

export const commentTicket = async (ticketId, ticketResolver, note) => {
    try {
        const commentedTicket = await fetch(url + '/tickets/' + ticketId + '/comment', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                open: false,
                resolver: ticketResolver.toUpperCase(),
                content: note
            })
        })
        return await commentedTicket.json()
    } catch (err) {
        console.log(err)
        return false
    }
}

export const reopenTicket = async (ticketId) => {
    try {
        const reopenedTicket = await fetch(url + '/tickets/' + ticketId + '/reopen', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        })
        return await reopenedTicket.json()
    } catch (err) {
        console.log(err)
        return false
    }
}
