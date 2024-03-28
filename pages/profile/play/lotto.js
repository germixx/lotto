import Head from 'next/head'

import NAVBAR from '../../../components/navbar/main'
import LOTTOBAR from '../../../components/navbar/lotto'

import { useEffect, useState } from 'react'

import LFUNCTIONS from '../../../functions/play/lotto'

import { grabSessionData } from '../../../functions/datafunc'

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function Lotto(props) {
    console.log('cats2')
    let filtered
    // const [filtered, setFiltered] = useState()
    const [todaysDate, setTodaysDate] = useState(new Date().toLocaleDateString())
    const [currentDateSelected, setCurrentDateSelected] = useState(new Date().toLocaleDateString())
    const [winningNumbers, setWinningNumbers] = useState('')
    const [selectedResults, setSelectedResults] = useState([])
    const [winningNumbersArr, setWinningNumbersArr] = useState([])
    const [checkNumbers, setCheckNumber] = useState('')
    const [isPlayed, setIsPlayed] = useState('')
    const [dataDisplayed, setDataDisplayed] = useState(false)
    const [gameData, setGameData] = useState(props)
    const [currentHot, setCurrentHot] = useState([])
    const [currentCold, setCurrentCold] = useState([])
    const [currentRepeat, setCurrentRepeat] = useState([])
    const [winningPairs, setWinningPairs] = useState([])
    const [currentOverdue, setCurrentOverdue] = useState([])
    const [lines, setLines] = useState([])
    const [unalteredResults, setUnalteredResults] = useState([])
    const [recentlyPlayedNumbers, setRecentlyPlayedNumbers] = useState({})
    const [played, setPlayed] = useState(false)
    const [quickPick, setQuickPick] = useState(false)
    const [guessLine1, setGuessLine1] = useState('')

    useEffect(async () => {

        let today = new Date()

        let day = weekday[today.getDay()]

        if (day == 'Sunday') {
            console.log('Sunday')
            today.setDate(today.getDate() - 1)
            console.log(today)

            let xA = await grabSessionData(today.toLocaleDateString())
            // start here to fix the date offday bug

            // if (xA.status && xA.data !== null) {
            //     console.log(xA, ' xzasdsadsasd')
            //     setGameData(xA.data.games.lotto)
            //     setCurrentHot(xA.data.games.lotto.hot)
            //     setCurrentCold(xA.data.games.lotto.cold)
            //     setCurrentOverdue(xA.data.games.lotto.overdue)
            //     setCurrentRepeat(xA.data.games.lotto.repeat)
            //     setUnalteredResults(xA.data.games.lotto.recentResults)
            //     setWinningNumbers(xA.data.games.lotto.winningNumbers)
            //     setWinningNumbersArr(xA.data.games.lotto.winningNumbers.split('-'))
            //     setWinningPairs(xA.data.games.lotto.winningPairs)
            //     setLines(xA.data.games.lotto.predictions)
            //     setSelectedResults(xA.data.games.lotto.recentResults)
            //     setCurrentDateSelected(xA.data.sessionDate)
            // }

        }

        if (day == 'Monday') {
            today.setDate(today.getDate() - 2)
            console.log(today)
        }

        if (day == 'Tuesday') {
            today.setDate(today.getDate() - 3)
            console.log(today)
        }


        if (day == 'Thursday') {
            today.setDate(today.getDate() - 1)
            console.log(today)
        }

        if (day == 'Friday') {
            today.setDate(today.getDate() - 2)
            console.log(today)
        }


        setCurrentDateSelected(new Date().toLocaleDateString())
    }, [])


    useEffect(async () => {

        if (typeof (props.gameData) == 'object') {

            setGameData(props.gameData.data.games.lotto)
            setCurrentHot(props.gameData.data.games.lotto.hot)
            setCurrentCold(props.gameData.data.games.lotto.cold)
            setCurrentOverdue(props.gameData.data.games.lotto.overdue)
            setCurrentRepeat(props.gameData.data.games.lotto.repeat)
            setUnalteredResults(props.gameData.data.games.lotto.recentResults)
            setWinningNumbers(props.gameData.data.games.lotto.winningNumbers)
            setWinningPairs(props.gameData.data.games.lotto.winningPairs)
            setLines(props.gameData.data.games.lotto.predictions)
            setSelectedResults(props.gameData.data.games.lotto.recentResults)
            setCurrentDateSelected(props.gameData.data.sessionDate)

            let f = await LFUNCTIONS.filterPlayedNumbers(props.gameData.data.games.lotto.recentResults)

            if (f.status) {
                setRecentlyPlayedNumbers(props => {
                    return f.filtered
                })
                setDataDisplayed(true)
            }

        }

    }, [props])

    const adjustText = (text, num) => {
        setGuessLine1(state => {
            return text
        })
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

    const inputFocus1 = (num) => {

        if (guessLine1 == '' || guessLine1 === undefined || guessLine1 === 'undefined') {
            return
        } else {

            let ff = guessLine1.split('-')

            if (ff[0] === '') {
                return
            } else {
                setGuessLine1(ff[0] + ff[1] + ff[2] + ff[3] + ff[4] + ff[5])
            }

        }
    }

    const toggleQuickPick = () => {
        setQuickPick(!quickPick)
    }

    const addLine = () => {

        let tmp = lines

        let tmpObj = {
            "sequence": fixLine(guessLine1),
            played,
            quickPick
        }

        tmp.push(tmpObj)

        LFUNCTIONS.addPlayLine(tmp, currentDateSelected)

        setGuessLine1('')
        setQuickPick(false)
        setPlayed(false)
    }

    const togglePlayed = () => {
        setPlayed(!played)
    }

    const inputBlurs = () => {
        setCheckNumber(LFUNCTIONS.funcInputBlur(checkNumbers))
    }

    function fixLine(line) {
        let newSeq = []

        let tmp = line.split('-')

        tmp.map(e => {

            let tm = e.split('')

            tm[0] === '0' ? newSeq.push(tm[1]) : newSeq.push(tm.join(''))

        })

        return newSeq.join('-')
    }

    const inputBlur = () => {

        if (typeof (guessLine1) !== 'undefined' || typeof (guessLine1) !== undefined || guessLine1 !== ' ' || guessLine1 !== "") {
            setGuessLine1(LFUNCTIONS.funcInputBlur(guessLine1))
        }

    }

    const mapLines = lines.map((e) => {


        // check if e.sequence and winningNumbers match for 5
        // HERE check for winning numbers and push notification requests



        let temp = e.sequence.split('-')
        return <div key={e.sequence}>
            <span className={`${winningNumbersArr.includes(temp[0]) ? "selectedNum" : ""}`}>{temp[0]}</span>-<span className={`${winningNumbersArr.includes(temp[1]) ? "selectedNum" : ""}`}>{temp[1]}</span>-<span className={`${winningNumbersArr.includes(temp[2]) ? "selectedNum" : ""}`}>{temp[2]}</span>-<span className={`${winningNumbersArr.includes(temp[3]) ? "selectedNum" : ""}`}>{temp[3]}</span>-<span className={`${winningNumbersArr.includes(temp[4]) ? "selectedNum" : ""}`}>{temp[4]}</span>-<span className={`${winningNumbersArr.includes(temp[5]) ? "selectedNum" : ""}`}>{temp[5]}</span> <span style={{ color: 'green' }}>{e.played ? '✔' : ''}</span> <span style={{ color: 'orange', fontSize: '12px', fontWeight: 'bold' }}>{e.quickPick === true || e.quickPick === 'true' ? 'QP' : ''}</span>
        </div>
    })

    const resultz = selectedResults.map(e => {

        let tmp = e.sequence.split('-')

        return <div className="lineResult" key={e.date}>
            {/* {e.sequence} */}
            <span className={`${winningNumbersArr.includes(e.firstNum) ? "selectedNum" : ""}`}>{e.firstNum}</span>-<span className={`${winningNumbersArr.includes(e.secondNum) ? "selectedNum" : ""}`}>{e.secondNum}</span>-<span className={`${winningNumbersArr.includes(e.thirdNum) ? "selectedNum" : ""}`}>{e.thirdNum}</span>-<span className={`${winningNumbersArr.includes(e.fourthNum) ? "selectedNum" : ""}`}>{e.fourthNum}</span>-<span className={`${winningNumbersArr.includes(e.fifthNum) ? "selectedNum" : ""}`}>{e.fifthNum}</span>-<span className={`${winningNumbersArr.includes(e.sixthNum) ? "selectedNum" : ""}`}>{e.sixthNum}</span>
            {/* <span>[{intoDelta(e.firstNum, e.secondNum, e.thirdNum, e.fourthNum, e.fifthNum)}]</span> */}
        </div>
    })

    if (recentlyPlayedNumbers.length > 0) {
        filtered = recentlyPlayedNumbers.map(e => (
            <div key={e[0]}>
                <span className={`${winningNumbersArr.includes(e[0]) ? "selectedNum" : ""}`}>{e[0]}</span> : <span>{e[1]}</span>
            </div>

        ))
    }

    const minus1Day = async () => {

        // const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        let d = new Date(currentDateSelected)

        let day = weekday[d.getDay()]

        if (day === 'Wednesday') {

            d.setDate(d.getDate() - 4)

            let xA = await grabSessionData(d.toLocaleDateString())

            if (xA.status && xA.data !== null) {
                setGameData(xA.data.games.lotto)
                setCurrentHot(xA.data.games.lotto.hot)
                setCurrentCold(xA.data.games.lotto.cold)
                setCurrentOverdue(xA.data.games.lotto.overdue)
                setCurrentRepeat(xA.data.games.lotto.repeat)
                setUnalteredResults(xA.data.games.lotto.recentResults)
                setWinningNumbers(xA.data.games.lotto.winningNumbers)
                setWinningNumbersArr(xA.data.games.lotto.winningNumbers.split('-'))
                setWinningPairs(xA.data.games.lotto.winningPairs)
                setLines(xA.data.games.lotto.predictions)
                setSelectedResults(xA.data.games.lotto.recentResults)
                setCurrentDateSelected(xA.data.sessionDate)
            }

        }

        if (day === 'Saturday') {

            d.setDate(d.getDate() - 3)

            let xA = await grabSessionData(d.toLocaleDateString())

            if (xA.status && xA.data !== null) {
                setGameData(xA.data.games.lotto)
                setCurrentHot(xA.data.games.lotto.hot)
                setCurrentCold(xA.data.games.lotto.cold)
                setCurrentOverdue(xA.data.games.lotto.overdue)
                setCurrentRepeat(xA.data.games.lotto.repeat)
                setUnalteredResults(xA.data.games.lotto.recentResults)
                setWinningNumbers(xA.data.games.lotto.winningNumbers)
                setWinningNumbersArr(xA.data.games.lotto.winningNumbers.split('-'))
                setWinningPairs(xA.data.games.lotto.winningPairs)
                setLines(xA.data.games.lotto.predictions)
                setSelectedResults(xA.data.games.lotto.recentResults)
                setCurrentDateSelected(xA.data.sessionDate)
            }
        }

    }

    const plus1Day = async () => {

        // const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        let d = new Date(currentDateSelected)

        let day = weekday[d.getDay()]

        if (day === 'Wednesday') {

            d.setDate(d.getDate() + 3)

            let xA = await grabSessionData(d.toLocaleDateString())

            if (xA.status && xA.data !== null) {
                setGameData(xA.data.games.lotto)
                setCurrentHot(xA.data.games.lotto.hot)
                setCurrentCold(xA.data.games.lotto.cold)
                setCurrentOverdue(xA.data.games.lotto.overdue)
                setCurrentRepeat(xA.data.games.lotto.repeat)
                setUnalteredResults(xA.data.games.lotto.recentResults)
                setWinningNumbers(xA.data.games.lotto.winningNumbers)
                setWinningNumbersArr(xA.data.games.lotto.winningNumbers.split('-'))
                setWinningPairs(xA.data.games.lotto.winningPairs)
                setLines(xA.data.games.lotto.predictions)
                setSelectedResults(xA.data.games.lotto.recentResults)
                setCurrentDateSelected(xA.data.sessionDate)
            }
        }

        if (day === 'Saturday') {

            d.setDate(d.getDate() + 4)

            let xA = await grabSessionData(d.toLocaleDateString())

            if (xA.status && xA.data !== null) {
                setGameData(xA.data.games.lotto)
                setCurrentHot(xA.data.games.lotto.hot)
                setCurrentCold(xA.data.games.lotto.cold)
                setCurrentOverdue(xA.data.games.lotto.overdue)
                setCurrentRepeat(xA.data.games.lotto.repeat)
                setUnalteredResults(xA.data.games.lotto.recentResults)
                setWinningNumbers(xA.data.games.lotto.winningNumbers)
                setWinningNumbersArr(xA.data.games.lotto.winningNumbers.split('-'))
                setWinningPairs(xA.data.games.lotto.winningPairs)
                setLines(xA.data.games.lotto.predictions)
                setSelectedResults(xA.data.games.lotto.recentResults)
                setCurrentDateSelected(xA.data.sessionDate)
            }
        }
    }

    return (
        <div>
            <Head>
                <title>Lotto</title>
                <meta name="description" content="Lotto" />
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
                                <input value={checkNumbers} maxLength={12} onChange={(e) => setCheckNumber(e.target.value)} onBlur={(e) => inputBlurs()} onFocus={(e) => inputFocus()} style={{ width: '150px' }} type="name" />
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

                                    <div className='row' >
                                        <h3 style={{ textAlign: 'center' }}>Lines</h3>
                                        <div>
                                            <label>
                                                <input checked={played} onChange={() => togglePlayed()} style={{ marginLeft: '15px', marginTop: '8px', height: '10px' }} type="checkbox" /> <span style={{ textSize: 2, marginLeft: '-3px' }}>✔</span>
                                            </label>
                                            <label>
                                                <input checked={quickPick} onChange={() => toggleQuickPick()} style={{ marginLeft: '5px', marginTop: '8px', height: '10px' }} type="checkbox" /> <span style={{ fontSize: 14, marginLeft: '-3px', fontWeight: 'bold' }}>QP</span>
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

export default Lotto