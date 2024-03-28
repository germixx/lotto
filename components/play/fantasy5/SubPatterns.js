import { useEffect, useState } from 'react'
import LFUNCTIONS from '../../../functions/play/fantasy5/fantasy5'
function SubPatterns(props) {

    let subpatterns
    const [recentSubpatterns, setRecentSubpatterns] = useState([])
    const [winningNumbersArr, setWinningNumbersArr] = useState([])

    useEffect(async () => {

        let g = await LFUNCTIONS.getSubPatterns(props.results)

        if (g === 'undefined' || g === undefined) {

        } else {
            if (g.status) {
                setRecentSubpatterns(props => {
                    return g.subpatterns
                })
            }
        }
        setWinningNumbersArr(LFUNCTIONS.convertIntoPatternSubPatternFromArray(props.winningNumbersArr))
    }, [props])

    if (recentSubpatterns.length > 0) {

        subpatterns = recentSubpatterns.map(e => (

            <div key={e[0]}>
                <span className={`${winningNumbersArr.includes(e[0]) ? "selectedNum" : ""}`}>{e[0]}</span> : <span>{e[1]}</span>
            </div>

        ))
    }

    return (
        <div>
            <h4 className='ctr'>SubPatterns</h4>
            <div>{subpatterns}</div>
        </div>
    )
}

export default SubPatterns