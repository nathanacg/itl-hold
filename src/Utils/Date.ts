export const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
export const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
export const monthsName = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

export const yearsArray = () => {
    var yearsList: number[] = []
    const year = new Date().getFullYear()
    for (let index = year - 14; index >= 1940; index--) {
        yearsList.push(index)
    }
    return yearsList
}