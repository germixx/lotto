
const connection = require('../../util/db')

async function get18() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM (SELECT * FROM tblFLFantasy5 ORDER BY id DESC LIMIT 18 ) sub ORDER BY id ASC', [], (err, rows) => {
            if (err) throw err

            resolve({ status: true, rows })
        })
    })
}

export default async function GetLast18(req, res) {

    const { method } = req

    switch (method) {
        case 'GET':
            res.send(await get18())
            break
        case 'POST':
            break
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
            res.end()
    }


}