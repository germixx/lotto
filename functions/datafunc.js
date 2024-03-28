function grabSessionData(date) {

    return new Promise((resolve, reject) => {

        fetch(`/api/officialSessionData`, {
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

    grabSessionData,

}