export default function(cookie) {
    if (typeof cookie !== 'string') throw TypeError('argument str must be a string')
    const parts = cookie !== undefined ? cookie.split(/; */) : []

    const parsedCookie = parts.reduce((acc, part) => {
        const idx = part.indexOf('=')
        if (idx > 0) {
            const name = part.substr(0, idx).trim()
            let rest = part.substr(idx + 1, part.length).trim()

            if (rest[0] === '"') rest = rest.slice(1, -1)
            if (acc[name] === undefined) acc[name] = rest
        }
        return acc
    }, {})

    return parsedCookie
}