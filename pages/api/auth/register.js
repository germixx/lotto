
export default async function Register(req, res) {

    const { method } = req

    switch (method) {
        case 'GET':
            // res.send(await guessesFetch())
            break
        case 'POST':
            break
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
            res.end()
    }


}