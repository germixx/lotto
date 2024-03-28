const mongoDB = require('../../util/mongodb')

function getSessionData(date) {

    return new Promise((resolve, reject) => {

        mongoDB.collection("official").findOne({ sessionDate: date }, function (err, result) {

            if (err) throw err

            if (result !== null) {
                resolve({ status: true, data: result })
            } else {
                resolve({ status: false, data: result })
            }

        })

    }).catch(e => console.log(e))
}

export default async function Official(req, res) {

    const { method } = req

    let date = req.body.date

    switch (method) {
        case 'GET':

            break
        case 'POST':
            res.send(await getSessionData(date))
            break
        case 'UPDATE':
            res.send(await upd())
            break
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
            res.end()
    }

}