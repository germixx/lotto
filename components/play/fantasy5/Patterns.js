import { useEffect, useState } from 'react'

import LFUNCTIONS from '../../../functions/play/fantasy5/fantasy5'

function Patterns(props) {

    let patterns
    const [recentPatterns, setRecentPatterns] = useState([])
    const [winningNumbersArr, setWinningNumbersArr] = useState([])

    useEffect(async () => {

        let g = await LFUNCTIONS.getPatterns(props.results)

        if (g === 'undefined' || g === undefined) {

        } else {
            if (g.status) {
                setRecentPatterns(props => {
                    return g.patterns
                })
            }
        }
        setWinningNumbersArr(LFUNCTIONS.convertIntoPatternFromArray(props.winningNumbersArr))
    }, [props])

    if (recentPatterns.length > 0) {

        patterns = recentPatterns.map(e => (

            <div key={e[0]}>
                <span className={`${winningNumbersArr.includes(e[0]) ? "selectedNum" : ""}`}>{e[0]}</span> : <span>{e[1]}</span>
            </div>

        ))
    }

    return (
        <div>
            <h4 className='ctr'>Patterns</h4>
            <div>{patterns}</div>
        </div>
    )
}

export default Patterns