import { useEffect, useState } from 'react'

import LFUNCTIONS from '../../../functions/play/fantasy5/fantasy5'

function Filtered(props) {

    let filtered
    const [recentlyPlayedNumbers, setRecentlyPlayedNumbers] = useState([])
    const [winningNumbersArr, setWinningNumbersArr] = useState([])

    useEffect(async () => {

        let f = await LFUNCTIONS.filterPlayedNumbers(props.results)

        if (f === 'undefined' || f === undefined) {

        } else {
            if (f.status) {
                setRecentlyPlayedNumbers(props => {
                    return f.filtered
                })
            }
        }
        setWinningNumbersArr(props.winningNumbersArr)
    }, [props])

    if (recentlyPlayedNumbers.length > 0) {

        filtered = recentlyPlayedNumbers.map(e => (

            <div key={e[0]}>
                <span className={`${winningNumbersArr.includes(e[0]) ? "selectedNum" : ""}`}>{e[0]}</span> : <span>{e[1]}</span>
            </div>

        ))
    }

    return (
        <div>
            <h4 className='ctr'>Filtered</h4>
            <div>{filtered}</div>
        </div>
    )
}

export default Filtered