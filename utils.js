
const capitalize = (str) => {
    const firstLetter = str.charAt(0).toUpperCase()
    const rest = str.substring(1)

    return `${firstLetter}${rest}`
}

const formatDateView = (str) => {
    const transactionDate = new Date(str)
    return transactionDate.toDateString()
}

const formatDateForm = (str) => {
    const localeDate = str.toLocaleString()
    const [month, day, year] = localeDate.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

const monthsArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];


const currentMonth = () => {
    const month = new Date()

    return monthsArray[month.getMonth()]
}

export { capitalize , formatDateView, formatDateForm, currentMonth, monthsArray }