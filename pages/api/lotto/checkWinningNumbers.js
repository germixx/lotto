async function check(checkNumber) {

    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM FLlotto WHERE sequence = ? ', [checkNumber], (err, rows) => {

            if (err) throw err

            if (rows.length < 1) {
                resolve({ status: false })
            } else {
                resolve({ status: true, rows })
            }

        })

    })
}

export default async function CheckWinningNumbers(req, res) {

    const { method } = req

    const checkNumber = req.body.number

    switch (method) {
        case 'GET':
            break
        case 'POST':
            res.send(await check(checkNumber))
            break
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
            res.end()
    }


}