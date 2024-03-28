function getLast20() {

}

function filterPlayedNumbers(numbers) {
    return new Promise((resolve, reject) => {

        let temp, sorted
        let returnArray = []
        let playedNumbers = {}
        let mostRecent = numbers[numbers.length - 1]

        for (let i = 0; i < numbers.length; i++) {

            if ((numbers[i].firstNum in playedNumbers)) {
                playedNumbers[numbers[i].firstNum]++
            } else {
                playedNumbers[numbers[i].firstNum.toString()] = 1
            }

            if ((numbers[i].secondNum in playedNumbers)) {
                playedNumbers[numbers[i].secondNum]++
            } else {
                playedNumbers[numbers[i].secondNum.toString()] = 1
            }

            if ((numbers[i].thirdNum in playedNumbers)) {
                playedNumbers[numbers[i].thirdNum]++
            } else {
                playedNumbers[numbers[i].thirdNum.toString()] = 1
            }

            if ((numbers[i].fourthNum in playedNumbers)) {
                playedNumbers[numbers[i].fourthNum]++
            } else {
                playedNumbers[numbers[i].fourthNum.toString()] = 1
            }

            if ((numbers[i].fifthNum in playedNumbers)) {
                playedNumbers[numbers[i].fifthNum]++
            } else {
                playedNumbers[numbers[i].fifthNum.toString()] = 1
            }

        }

        // Sort value by descending 
        sorted = Object.entries(playedNumbers).sort((a, b) => b[1] - a[1])

        // Cycle through sorted entries
        for (const [key, value] of Object.entries(sorted)) {

            // Transform each line from array into object 
            temp = Object.assign({}, value)

            returnArray.push(temp)
        }

        resolve({ status: true, filtered: returnArray })

    }).catch(e => console.log(e))
}


module.exports = {
    getLast20,
    filterPlayedNumbers
}