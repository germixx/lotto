const funcInputBlur = (nums) => {

    let arr = []

    if (nums.length !== 0) {

        for (let i = 0; i < nums.length; i++) {
            arr.push(nums[i])
        }
        console.log(arr)
        if (arr[0] === '-' || arr.length == 0) {
            return
        } else {
            arr.splice(2, 0, '-')
            arr.splice(5, 0, '-')
            arr.splice(8, 0, '-')
            arr.splice(11, 0, '-')
            arr.splice(14, 0, '-')
            return arr.join('')
        }
    } else {
        return ""
    }

    return
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

const addPlayLine = (liine, dayte) => {

    return new Promise((resolve, reject) => {

        fetch(`/api/lotto/addPlayLine`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                liine,
                dayte
            })
        }).then(res => res.json())
            .then((json) => {

                if (json.status) {

                    resolve(true)
                    return true
                } else {

                    resolve(false)
                    return false
                }

            }).catch(err => {
                throw err
            })

    }).catch(e => console.log(e))
}

function grabSessionData(date) {

    return new Promise((resolve, reject) => {

        fetch(`/api/lotto/sessionData`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                date
            })
        }).then(res => res.json())
            .then((json) => {

                if (json.status) {
                    resolve(json)
                } else {
                    resolve({ status: false })
                }

            }).catch(err => {
                throw err
            })

    }).catch(e => console.log(e))
}


module.exports = {
    addPlayLine,
    filterPlayedNumbers,
    funcInputBlur
}