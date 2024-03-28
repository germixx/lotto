

const getAllResults = async () => {
    return new Promise(
        (resolve, reject) => {
            fetch(`/api/predictions`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    playDate,
                    prediction
                })
            }).then(res => res.json())
                .then((json) => {
                    if (json.status) {
                        resolve(json)
                    }
                }).catch(err => {
                    throw err
                })

        }).catch(e => console.log(e))
}





module.exports = {
    getAllResults
}