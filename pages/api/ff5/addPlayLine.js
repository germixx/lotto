const mongoDB = require('../../../util/mongodb')

const insertLineIntoDB = async (line, date) => {
    return new Promise((resolve, reject) => {
        mongoDB.collection("official").updateOne({ sessionDate: date }, { $set: { "games.fantasy5.predictions": line } }, function (err, result) {

            if (err) throw err;

            if (result !== null) {
                resolve({ status: true, data: result })
            } else {
                resolve({ status: false, data: result })
            }

        })

        return { status: true }
    })
}

export default async function AddPlayLine(req, res) {

    const { method } = req

    const lineObj = req.body.liine

    const dayte = req.body.dayte

    switch (method) {
        case 'GET':
            break
        case 'POST':
            res.send(await insertLineIntoDB(lineObj, dayte))
            break
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
            res.end()
    }


}