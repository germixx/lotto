
const connection = require('../../../util/db')

const getAlls = async () => {
    // return new Promise((resolve, reject) => {
    //     connection.query('SELECT * FROM FLFantasy5', [], (err, rows) => {
    //         if (err) throw err
    //         console.log(rows, ' is rowssssss')
    //         resolve({ status: true, rows })
    //     })
    // })

}

export default async function GetAll(req, res) {

    const { method } = req

    switch (method) {
        case 'GET':
            res.send(await getAlls())
            break
        case 'POST':

            break
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
            res.end()
    }


}