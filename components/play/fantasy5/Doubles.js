import { useEffect, useState } from 'react'

import LFUNCTIONS from '../../../functions/play/fantasy5/fantasy5'

function Doubles(props) {

    let doubless
    const [doubleState, setDoubleState] = useState([])
    const [winningNumbersArr, setWinningNumbersArr] = useState([])

    useEffect(async () => {

        let f = await LFUNCTIONS.getDoubles(props.results)

        if (f === 'undefined' || f === undefined) {

        } else {
            if (f.status) {
                setDoubleState(props => {
                    return f.doubles
                })
            }
        }
        setWinningNumbersArr(LFUNCTIONS.getDoublesFromSingleArr(props.winningNumbersArr))
    }, [props])

    if (doubleState.length > 0) {

        doubless = doubleState.map(e => (

            <div key={e[0]}>
                <span className={`${winningNumbersArr.includes(e[0]) ? "selectedNum" : ""}`}>{e[0]}</span> : <span>{e[1]}</span>
            </div>

        ))
    }

    return (
        <div>
            <h4 className='ctr'>Doubles</h4>
            <div>{doubless}</div>
        </div>
    )

}

export default Doubles