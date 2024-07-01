
const capitalize = (str) => {
    const firstLetter = str.charAt(0).toUpperCase()
    const rest = str.substring(1)

    return `${firstLetter}${rest}`
}

export { capitalize }