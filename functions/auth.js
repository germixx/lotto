function login(email, password) {
    return new Promise((resolve, reject) => {
        console.log(email, password, ' is pas')
        fetch(`/api/auth/login`, {
            method: 'GET',
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

function register(email, password, repassword) {
    return new Promise((resolve, reject) => {
        fetch(`/api/auth/register`, {
            method: 'GET',
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
    login,
    register
}