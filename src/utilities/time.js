export const minutesAgo = (time) => {
    const ago = Math.floor((Date.now() - new Date(time)) / 60000)
    if (ago < 1) {
        return "just now"
    } else if (ago < 60) {
        return `${ago} minute${ago === 1 ? '' : 's'} ago`
    } else if (ago < 120) {
        return `1 hour ${ago-60} minutes ago` 
    } else if (ago < 1440) {
        return `about ${Math.floor(ago / 60)} hours ago`
    } else {
        const days = Math.floor(ago / 1440)
        return `about ${days} day${days === 1 ? '' : 's'} ago`
    }
}
