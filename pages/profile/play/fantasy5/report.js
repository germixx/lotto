// import { useEffect } from 'react'

// import { getAllResults } from '../../../../functions/play/fantasy5/report'

// export async function getServerSideProps() {
// get report data here from file
//     // // Fetch data from external API
//     // const res = await fetch(`https://.../data`)
//     // const data = await res.json()

//     // // Pass data to the page via props
//     // return { props: { data } }
// }

// function report() {

// useEffect(() => {
//     getAllResults()

// }, [])

// return (
//     <div>report</div>
// )
// }

// export default report

/*

    * pattern
        A = 1 - 9
        B = 10 - 19
        C = 20 - 29
        D = 30 -36

    * subPattern
        A1 = 1 - 5
        A2 = 6 - 9
        B1 = 10 - 14
        B2 = 15 - 19
        C1 = 20 - 24
        C2 = 25 - 29
        D1 = 30 - 32
        D2 = 33 - 36


        Run Python script to pull all results, count all patterns, sub patterns, and put each result in a file
        A daily script will add to file, the report will pull from the file
*/

import React from 'react'

function report() {
    return (
        <div>report</div>
    )
}

export default report