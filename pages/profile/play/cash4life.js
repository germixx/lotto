import Head from 'next/head'

import NAVBAR from '../../../components/navbar/main'
import CASH4LIFE from '../../../components/navbar/cash4life'

import { useEffect, useState } from 'react'

import FUNCTIONS from '../../../functions/play/cash4life'

import { grabSessionData } from '../../../functions/play/universal'

function Cash4life(props) {

    let filtered

    const [currentDateSelected, setCurrentDateSelected] = useState(new Date().toLocaleDateString())
    const [selectedResults, setSelectedResults] = useState([])
    const [cashBall, setCashBall] = useState(0)
    const [cashBallArr, setCashBallArr] = useState([])
    const [winningNumbers, setWinningNumbers] = useState('')
    const [winningNumbersArr, setWinningNumbersArr] = useState('')
    const [checkNumbers, setCheckNumber] = useState('')
    const [isPlayed, setIsPlayed] = useState('')
    const [dataDisplayed, setDataDisplayed] = useState(false)
    const [currentHot, setCurrentHot] = useState([])
    const [currentCold, setCurrentCold] = useState([])
    const [currentOverdue, setCurrentOverdue] = useState([])
    const [unalteredResults, setUnalteredResults] = useState([])
    const [currentRepeat, setCurrentRepeat] = useState([])
    const [gameData, setGameData] = useState(props)
    const [quickPick, setQuickPick] = useState(false)
    const [played, setPlayed] = useState(false)
    const [thelast18, setLast18] = useState([])
    const [winningPairs, setWinningPairs] = useState([])
    const [hotCB, setHotCB] = useState()
    const [lines, setLines] = useState([])
    const [coldCB, setColdCB] = useState()
    const [overdueCB, setOverdueCB] = useState()
    const [guessLine1, setGuessLine1] = useState('')
    const [recentlyPlayedNumbers, setRecentlyPlayedNumbers] = useState({})
    const [repeatCB, setRepeatCB] = useState()

    useEffect(async () => {

        if (typeof (props.gameData) == 'object') {

            setGameData(props.gameData.data.games.cash4life)
            setCurrentHot(props.gameData.data.games.cash4life.hot)
            setCurrentCold(props.gameData.data.games.cash4life.cold)
            setCurrentOverdue(props.gameData.data.games.cash4life.overdue)
            setCurrentRepeat(props.gameData.data.games.cash4life.repeat)
            setUnalteredResults(props.gameData.data.games.cash4life.recentResults)
            setWinningNumbers(props.gameData.data.games.cash4life.winningNumbers)
            setWinningPairs(props.gameData.data.games.cash4life.winningPairs)
            setHotCB(props.gameData.data.games.cash4life.CBhot)
            setColdCB(props.gameData.data.games.cash4life.CBcold)
            setOverdueCB(props.gameData.data.games.cash4life.CBoverdue)
            setRepeatCB(props.gameData.data.games.cash4life.CBrepeat)
            setLines(props.gameData.data.games.cash4life.predictions)
            setSelectedResults(props.gameData.data.games.cash4life.recentResults)
            setCurrentDateSelected(props.gameData.data.sessionDate)





            // here togle
            let f = await FUNCTIONS.filterPlayedNumbers(props.gameData.data.games.cash4life.recentResults)

            // If successful, set state
            if (f.status) {
                setRecentlyPlayedNumbers(props => {
                    return f.filtered
                })
                setDataDisplayed(true)
            }
        }

    }, [props])

    // const intoDelta = (one, two, three, four, five) => {
    //     return `${one}-${(two - one)}-${(three - two)}-${(four - three)}-${(five - four)}`
    // }

    const minus1Day = async () => {

        let d = new Date(currentDateSelected)

        d.setDate(d.getDate() - 1)

        setCurrentDateSelected(d.toLocaleDateString())

        let xA = await grabSessionData(d.toLocaleDateString())

        if (xA.status && xA.data !== null) {
            setCurrentCold(xA.data.games.cash4life.cold)
            setCurrentHot(xA.data.games.cash4life.hot)
            setCurrentOverdue(xA.data.games.cash4life.overdue)
            setCurrentRepeat(xA.data.games.cash4life.repeat)
            setUnalteredResults(xA.data.games.cash4life.recentResults)
            setLines(xA.data.games.cash4life.predictions)
            setSelectedResults(props.gameData.data.games.cash4life.recentResults)
            setWinningNumbers(xA.data.games.cash4life.winningNumbers)
            setWinningNumbersArr(xA.data.games.cash4life.winningNumbers.split('-'))

            let tmp = xA.data.games.cash4life.winningNumbers.split(' ')

            if (tmp.length > 1) {
                setCashBall(tmp[1])
                setCashBallArr(tmp[1].split())
            }

            // Set 18 results view
            let p18 = xA.data.games.cash4life.recentResults.slice()
            setLast18(p18)

            // Set 8 results view
            // let p8 = xA.data.games.cash4life.recentResults.slice().splice(10, 8)
            // setLast8(p8)

            // Set default view
            setSelectedResults(p18)

            // Get numbers from results
            let f = await FUNCTIONS.filterPlayedNumbers(p18) // < --- replace with variable here

            // If successful, set state
            if (f.status) {
                setRecentlyPlayedNumbers(props => {
                    return f.filtered
                })
                setDataDisplayed(true)
            }

        } else {
            setWinningNumbers('')
            setDataDisplayed(false)
        }
    }

    const plus1Day = async () => {

        let d = new Date(currentDateSelected)

        d.setDate(d.getDate() + 1)

        setCurrentDateSelected(d.toLocaleDateString())

        let xA = await grabSessionData(d.toLocaleDateString())

        if (xA.status && xA.data !== null) {
            setCurrentCold(xA.data.games.cash4life.cold)
            setCurrentHot(xA.data.games.cash4life.hot)
            setCurrentOverdue(xA.data.games.cash4life.overdue)
            setCurrentRepeat(xA.data.games.cash4life.repeat)
            setUnalteredResults(xA.data.games.cash4life.recentResults)
            setLines(xA.data.games.cash4life.predictions)
            setSelectedResults(props.gameData.data.games.cash4life.recentResults)
            setWinningNumbers(xA.data.games.cash4life.winningNumbers)
            setWinningNumbersArr(xA.data.games.cash4life.winningNumbers.split('-'))

            let tmp = xA.data.games.cash4life.winningNumbers.split(' ')

            if (tmp.length > 1) {
                setCashBall(tmp[1])
                setCashBallArr(tmp[1].split())
            }


            // Set 18 results view
            let p18 = xA.data.games.cash4life.recentResults.slice()
            setLast18(p18)

            // Set 8 results view
            // let p8 = xA.data.games.cash4life.recentResults.slice().splice(10, 8)
            // setLast8(p8)

            // Set default view
            setSelectedResults(p18)

            // Get numbers from results
            let f = await FUNCTIONS.filterPlayedNumbers(p18) // < --- replace with variable here

            // If successful, set state
            if (f.status) {
                setRecentlyPlayedNumbers(props => {
                    return f.filtered
                })
                setDataDisplayed(true)

            }

        } else {
            setDataDisplayed(false)
            setWinningNumbers('')
        }

    }

    const inputFocus = (num) => {

        // if (guessLine1 == '' || guessLine1 === undefined || guessLine1 === 'undefined') {
        //     return
        // } else {

        let ff = checkNumbers.split('-')

        if (ff[0] === '') {
            return
        } else {
            setCheckNumber(ff[0] + ff[1] + ff[2] + ff[3] + ff[4])
        }

        // }
    }

    const togglePlayed = () => {
        setPlayed(!played)
    }

    const addLine = () => {

        let tmp = lines

        let tmpObj = {
            "sequence": FUNCTIONS.fixLine(guessLine1),
            played,
            quickPick
        }

        tmp.push(tmpObj)

        FUNCTIONS.addPlayLine(tmp, currentDateSelected)

        setGuessLine1('')
        setQuickPick(false)
        setPlayed(false)
    }

    const adjustText = (text, num) => {
        setGuessLine1(state => {
            return text
        })
    }

    const inputBlur = () => {

        if (typeof (guessLine1) !== 'undefined' || typeof (guessLine1) !== undefined || guessLine1 !== ' ' || guessLine1 !== "") {
            // let tm = FUNCTIONS.funcInputBlur(guessLine1)
            setGuessLine1(FUNCTIONS.funcInputBlur(guessLine1))
        }

    }

    const inputFocus1 = (num) => {

        if (guessLine1 == '' || guessLine1 === undefined || guessLine1 === 'undefined') {
            return
        } else {

            let tmpSplit = guessLine1.split(' ')

            let ff = tmpSplit[0].split('-')

            if (ff[0] === '') {
                return
            } else {
                setGuessLine1(ff[0] + ff[1] + ff[2] + ff[3] + ff[4] + tmpSplit[1])
            }

        }
    }

    // const inputBlurs = () => {
    //     setCheckNumber(FUNCTIONS.funcInputBlur(checkNumbers))
    // }

    const handleCheckWinningNumber = async (checkNumbers) => {

        function setResult(res) {
            if (res !== '') {
                setDataa(res)
                setIsPlayed(true)
            } else {
                setIsPlayed(false)
            }
        }
        await FUNCTIONS.checkNumber(FUNCTIONS.fixLine(checkNumbers), setResult)
    }

    if (recentlyPlayedNumbers.length > 0) {
        filtered = recentlyPlayedNumbers.map(e => (
            <div key={e[0]}>
                <span className={`${winningNumbersArr.includes(e[0]) ? "selectedNum" : ""}`}>{e[0]}</span> : <span>{e[1]}</span>
            </div>

        ))
    }

    // Map recent result
    const resultz = selectedResults.map(e => {

        let tmp = e.sequence.split('-')

        return <div className="lineResult" key={e.date}>
            {/* {e.sequence} */}
            <span className={`${winningNumbersArr.includes(e.firstNum) ? "selectedNum" : ""}`}>{e.firstNum}</span>-<span className={`${winningNumbersArr.includes(e.secondNum) ? "selectedNum" : ""}`}>{e.secondNum}</span>-<span className={`${winningNumbersArr.includes(e.thirdNum) ? "selectedNum" : ""}`}>{e.thirdNum}</span>-<span className={`${winningNumbersArr.includes(e.fourthNum) ? "selectedNum" : ""}`}>{e.fourthNum}</span>-<span className={`${winningNumbersArr.includes(e.fifthNum) ? "selectedNum" : ""}`}>{e.fifthNum}</span> {e.cashBall}
            {/* <span>[{intoDelta(e.firstNum, e.secondNum, e.thirdNum, e.fourthNum, e.fifthNum)}]</span> */}
        </div>
    })

    const mapLines = lines.map((e) => {


        // check if e.sequence and winningNumbers match for 5
        // HERE check for winning numbers and push notification requests



        let temp = e.sequence.split('-')
        return <div key={e.sequence}>
            <span className={`${winningNumbersArr.includes(temp[0]) ? "selectedNum" : ""}`}>{temp[0]}</span>-<span className={`${winningNumbersArr.includes(temp[1]) ? "selectedNum" : ""}`}>{temp[1]}</span>-<span className={`${winningNumbersArr.includes(temp[2]) ? "selectedNum" : ""}`}>{temp[2]}</span>-<span className={`${winningNumbersArr.includes(temp[3]) ? "selectedNum" : ""}`}>{temp[3]}</span>-<span className={`${winningNumbersArr.includes(temp[4]) ? "selectedNum" : ""}`}>{temp[4]}</span> <span style={{ color: 'green' }}>{e.played ? '✔' : ''}</span> <span style={{ color: 'orange', fontSize: '12px', fontWeight: 'bold' }}>{e.quickPick === true || e.quickPick === 'true' ? 'QP' : ''}</span>
        </div>
    })

    return (

        <div>
            <Head>
                <title>Cash4life</title>
                <meta name="description" content="FL Cash4life" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container" style={{ backgroundColor: '#d3e5f2' }}>
                <main style={{ textAlign: 'centerr' }}>
                    <NAVBAR changeGame={props.changeGame} currentGameView={props.currentGameView} />

                    <div style={{ textAlign: 'center' }}><br />

                        <div className='row' style={{ width: '100%' }}>
                            <h4 style={{ width: '100%', textAlign: 'center' }}>{currentDateSelected}</h4>
                            <div style={{ float: 'right' }}>
                                <h5>Check Number</h5>
                                <input value={checkNumbers} maxLength={12} onChange={(e) => setCheckNumber(e.target.value)} onBlur={(e) => setCheckNumber(FUNCTIONS.funcInputBlur(checkNumbers))} onFocus={(e) => inputFocus()} style={{ width: '150px' }} type="name" />
                                <button onClick={() => handleCheckWinningNumber(checkNumbers)} style={{ width: '50px', marginLeft: '5px', color: 'green', backgroundColor: 'lightgreen', borderRadius: '100px' }}>✓</button>
                                <div>
                                    {
                                        // here show status of checked number
                                        // isPlayed === '' ? ('') : (isPlayed ? (`Was played on ${dataa}`) : (`Good to play`))
                                    }
                                </div>
                            </div>
                        </div>
                        <br />
                        <button style={{ marginRight: "5px" }} onClick={() => minus1Day(currentDateSelected)} name="previous"> {'<Prev'}  </button>
                        <button style={{ marginLeft: "5px" }} onClick={() => plus1Day(currentDateSelected)} name="right">{'Next>'}</button>
                    </div>
                    <br />
                    <div style={{ textAlign: 'center' }}>
                        <h5>Winning Numbers</h5>
                        {winningNumbers}
                    </div>
                    <br />
                    <div style={{ textAlign: 'center' }}>
                        <button onClick={() => toggleView(18)}>18</button>
                        <button onClick={() => toggleView(8)}>8</button>
                    </div>
                    <br />
                    {dataDisplayed ?
                        (
                            <div className='row'>
                                <div className="col-sm" style={{ backgroundColor: 'lightblue' }}>
                                    <br />
                                    <div className="ctr">
                                        {/* <h2>H-C-O-R</h2> */}
                                        Hot: <span className={`${winningNumbersArr.includes(currentHot[0]) ? "selectedNum" : ""}`}>{currentHot[0]}</span>, <span className={`${winningNumbersArr.includes(currentHot[1]) ? "selectedNum" : ""}`}>{currentHot[1]}</span>, <span className={`${winningNumbersArr.includes(currentHot[2]) ? "selectedNum" : ""}`}>{currentHot[2]}</span>, <span className={`${winningNumbersArr.includes(currentHot[3]) ? "selectedNum" : ""}`}>{currentHot[3]}</span> <br />
                                        Cold: <span className={`${winningNumbersArr.includes(currentCold[0]) ? "selectedNum" : ""}`}>{currentCold[0]}</span>, <span className={`${winningNumbersArr.includes(currentCold[1]) ? "selectedNum" : ""}`}>{currentCold[1]}</span>, <span className={`${winningNumbersArr.includes(currentCold[2]) ? "selectedNum" : ""}`}>{currentCold[2]}</span>, <span className={`${winningNumbersArr.includes(currentCold[3]) ? "selectedNum" : ""}`}>{currentCold[3]}</span> <br />
                                        Overdue: <span className={`${winningNumbersArr.includes(currentOverdue[0]) ? "selectedNum" : ""}`}>{currentOverdue[0]}</span>, <span className={`${winningNumbersArr.includes(currentOverdue[1]) ? "selectedNum" : ""}`}>{currentOverdue[1]}</span>, <span className={`${winningNumbersArr.includes(currentOverdue[2]) ? "selectedNum" : ""}`}>{currentOverdue[2]}</span>, <span className={`${winningNumbersArr.includes(currentOverdue[3]) ? "selectedNum" : ""}`}>{currentOverdue[3]}</span> <br />
                                        Repeat: <span className={`${winningNumbersArr.includes(currentRepeat[0]) ? "selectedNum" : ""}`}>{currentRepeat[0]}</span>, <span className={`${winningNumbersArr.includes(currentRepeat[1]) ? "selectedNum" : ""}`}>{currentRepeat[1]}</span>, <span className={`${winningNumbersArr.includes(currentRepeat[2]) ? "selectedNum" : ""}`}>{currentRepeat[2]}</span>, <span className={`${winningNumbersArr.includes(currentRepeat[3]) ? "selectedNum" : ""}`}>{currentRepeat[3]}</span>
                                    </div>
                                    <br />
                                    <div className="ctr">
                                        {/* <h2>H-C-O-R</h2> */}
                                        CBHot: <span className={`${cashBallArr.includes(hotCB[0]) ? "selectedNum" : ""}`}>{hotCB[0]}</span>, <span className={`${cashBallArr.includes(hotCB[1]) ? "selectedNum" : ""}`}>{hotCB[1]}</span> <br />
                                        CBCold: <span className={`${cashBallArr.includes(coldCB[0]) ? "selectedNum" : ""}`}>{coldCB[0]}</span>, <span className={`${cashBallArr.includes(coldCB[1]) ? "selectedNum" : ""}`}>{coldCB[1]}</span> <br />
                                        CBOverdue: <span className={`${cashBallArr.includes(overdueCB[0]) ? "selectedNum" : ""}`}>{overdueCB[0]}</span>, <span className={`${cashBallArr.includes(overdueCB[1]) ? "selectedNum" : ""}`}>{overdueCB[1]}</span><br />
                                        CBRepeat: <span className={`${cashBallArr.includes(repeatCB[0]) ? "selectedNum" : ""}`}>{repeatCB[0]}</span>, <span className={`${cashBallArr.includes(repeatCB[1]) ? "selectedNum" : ""}`}>{repeatCB[1]}</span>
                                    </div>
                                    <br />
                                    <div className='row' >
                                        <h3 style={{ textAlign: 'center' }}>Lines</h3>
                                        <div>
                                            <label>
                                                <input checked={played} onChange={() => setPlayed(!played)} style={{ marginLeft: '15px', marginTop: '8px', height: '10px' }} type="checkbox" /> <span style={{ textSize: 2, marginLeft: '-3px' }}>✔</span>
                                            </label>
                                            <label>
                                                <input checked={quickPick} onChange={() => setQuickPick(!quickPick)} style={{ marginLeft: '5px', marginTop: '8px', height: '10px' }} type="checkbox" /> <span style={{ fontSize: 14, marginLeft: '-3px', fontWeight: 'bold' }}>QP</span>
                                            </label>
                                            <label>
                                                <button onClick={() => addLine()} style={{ marginLeft: '10px' }}>+</button>
                                            </label>
                                            <input style={{ float: 'left', }} value={guessLine1} onChange={(e) => adjustText(e.target.value, 1)} maxLength={12} onBlur={(e) => inputBlur(1)} onFocus={(e) => inputFocus1(1)} type="text" /> <br />

                                            <br />
                                            <div className='ctr'>
                                                {mapLines}
                                            </div>
                                            <br />
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <h3>Generated</h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm" style={{ textAlign: 'center', backgroundColor: 'lightgreen' }}>
                                    <div style={{ textAlign: 'centerr' }}>
                                        {/* <button onClick={() => toggleView(18)}>18</button>
                                        <button onClick={() => toggleView(8)}>8</button> */}
                                        <div style={{ textAlign: 'centerr' }}>
                                            <h2>Recent Results</h2>
                                            {resultz}
                                        </div>

                                    </div>
                                </div>
                                <div className="col-sm" style={{ backgroundColor: 'lightyellow' }}>
                                    <div>
                                        <h2>Played Numbers (Last 18)</h2>
                                        {filtered}
                                    </div>
                                </div>
                            </div>) : (<div>
                                <div style={{ textAlign: 'center' }}>No data to display.</div>
                            </div>)
                    }
                </main>
            </div>
        </div>
    )
}

export default Cash4life