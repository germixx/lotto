import { useEffect, useState } from 'react'

import LFUNCTIONS from '../../../functions/play/fantasy5/fantasy5'

function Triples(props) {

    let tripless
    const [tripleState, setTripleState] = useState([])
    const [winningNumbersArr, setWinningNumbersArr] = useState([])

    useEffect(async () => {

        let f = await LFUNCTIONS.getTriples(props.results)

        if (f === 'undefined' || f === undefined) {

        } else {
            if (f.status) {
                setTripleState(props => {
                    return f.triples
                })
            }
        }
        setWinningNumbersArr(LFUNCTIONS.getTriplesFromSingleArr(props.winningNumbersArr))
    }, [props])

    if (tripleState.length > 0) {

        tripless = tripleState.map(e => (

            <div key={e[0]}>
                <span className={`${winningNumbersArr.includes(e[0]) ? "selectedNum" : ""}`}>{e[0]}</span> : <span>{e[1]}</span>
            </div>

        ))
    }

    return (
        <div>
            <h4 className='ctr'>Triples</h4>
            <div>{tripless}</div>
        </div>
    )

}

export default Triples