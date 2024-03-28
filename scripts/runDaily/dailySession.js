let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'lottery',
    password: 'UVnsX4$juuWu99W3P',
    database: 'lottery',
})


let last18Results
let hotNumbers
let coldNumbers
let RepeatNumbers
let overdueNumbers

connection.connect(function (err) {

    if (err) {
        return console.error('error: ' + err.message)
    }

    console.log('Connected to the MySQL server.')
})


/*

Script Page: 
 Run Script daily at 10AM that will querylast N results from DB, and run
 numbers through algorithm to send back 5 potential plays

 Insert into MongoDB as daily session:
    last18Draws -
    WinningNumber
    ShownNumbers(Last18) 
    Hot numbers
    Cold Numbers
    Overdue Numbers
    Repeat Numbers
    GuessPlays(5) - Predictions
    SmartPlays(5) 

Should highlight the winning numbers when viewing past days

Rules:

5 Different Algorithms each using different rules to output one(1) 

Algorithm 1:

Algorithm 2: 

Algorithm 3:

Algorithm 4:

Algorithm 5: 


**/

function algorithm1() {
    return new Promise(
        (resolve, reject) => {



        }).catch(e => console.log(e))
}

function algorithm2() {
    return new Promise(
        (resolve, reject) => {



        }).catch(e => console.log(e))
}

function algorithm3() {
    return new Promise(
        (resolve, reject) => {



        }).catch(e => console.log(e))
}

function algorithm4() {
    return new Promise(
        (resolve, reject) => {



        }).catch(e => console.log(e))
}

function algorithm5() {
    return new Promise(
        (resolve, reject) => {

        }).catch(e => console.log(e))
}

const fetchLast18 = function () {
    return new Promise(
        (resolve, reject) => {
            connection.query('SELECT * FROM (SELECT * FROM tblFLFantasy5 ORDER BY id DESC LIMIT 18 ) sub ORDER BY id ASC', [], (err, rows) => {
                if (err) throw err
                resolve({ status: true, rows })
            })
        }).catch(e => console.log(e))
}

async function main() {

    last18Results = await fetchLast18()
    if (last18Results.status) {
        console.log('cassss')
    }

}

main()








