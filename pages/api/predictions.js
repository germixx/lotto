const mongoDB = require('../../util/mongodb')

function save(playdate, prediction, result, time) {

    let Predictions = require('../../models/Prediction')

    return new Promise((resolve, reject) => {

        let addMsg = Predictions({ playDate: playdate, prediction: prediction, result: '', time_input: time })

        addMsg.save((error) => {
            if (error) {
                return console.log(`error has occurred: ${error}`)
            }
            console.log('Document is successfully saved.')
            resolve({ status: true })
        })


    }).catch(e => console.log(e))
}

function guessesFetch() {
    return new Promise((resolve, reject) => {



    }).catch(e => console.log(e))
}

export default async function SaveGuesses(req, res) {

    const { method } = req

    let playDate = req.body.playDate
    let prediction = req.body.prediction
    let result = ''
    let time_input = new Date().toISOString().slice(0, 19).replace('T', ' ')

    switch (method) {
        case 'GET':
            res.send(await guessesFetch())
            break
        case 'POST':
            res.send(await save(playDate, prediction, result, time_input))
            break
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
            res.end()
    }


}