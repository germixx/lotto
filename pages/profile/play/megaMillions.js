import Head from 'next/head'

import NAVBAR from '../../../components/navbar/main'
import CASH4LIFE from '../../../components/navbar/cash4life'

import { useEffect, useState } from 'react'

import FUNCTIONS from '../../../functions/play/megaMillions'

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function MegaMillions(props) {

    let filtered
    const [currentDateSelected, setCurrentDateSelected] = useState()
    const [selectedResults, setSelectedResults] = useState([])
    const [megaBall, setMegaBall] = useState(0)
    const [megaBallArr, setMegaBallArr] = useState([])
    const [winningNumbers, setWinningNumbers] = useState('1-2-3-4-5')
    const [winningNumbersArr, setWinningNumbersArr] = useState([1, 2, 3, 4, 5])
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
    const [winningPairs, setWinningPairs] = useState([])
    const [hotMB, setHotMB] = useState()
    const [lines, setLines] = useState([])
    const [coldMB, setColdMB] = useState()
    const [overdueMB, setOverdueMB] = useState()
    const [guessLine1, setGuessLine1] = useState('')
    const [recentlyPlayedNumbers, setRecentlyPlayedNumbers] = useState({})
    const [repeatMB, setRepeatMB] = useState()

    useEffect(async () => {

        if (typeof (props.gameData) == 'object') {

            // check if game is in the list, if not, figure date, then query
            if (props.gameData.data.games.megaMillions) {

                setGameData(props.gameData.data.games.megaMillions)
                setCurrentHot(props.gameData.data.games.megaMillions.hot)
                setCurrentCold(props.gameData.data.games.megaMillions.cold)
                setCurrentOverdue(props.gameData.data.games.megaMillions.overdue)
                setCurrentRepeat(props.gameData.data.games.megaMillions.repeat)
                setUnalteredResults(props.gameData.data.games.megaMillions.recentResults)
                setWinningNumbers(props.gameData.data.games.megaMillions.winningNumbers)
                setWinningPairs(props.gameData.data.games.megaMillions.winningPairs)
                setHotMB(props.gameData.data.games.megaMillions.MBhot)
                setColdMB(props.gameData.data.games.megaMillions.MBcold)
                setOverdueMB(props.gameData.data.games.megaMillions.MBoverdue)
                setRepeatMB(props.gameData.data.games.megaMillions.MBrepeat)
                setLines(props.gameData.data.games.megaMillions.predictions)
                setSelectedResults(props.gameData.data.games.megaMillions.recentResults)
                setCurrentDateSelected(new Date().toLocaleDateString())

                // here togle
                let f = await FUNCTIONS.filterPlayedNumbers(props.gameData.data.games.megaMillions.recentResults)

                // If successful, set state
                if (f.status) {
                    setRecentlyPlayedNumbers(props => {
                        return f.filtered
                    })
                    setDataDisplayed(true)
                }

            } else {

                let diff

                const d = new Date()

                let day = weekday[d.getDay()]

                if (day == 'Sunday') {
                    diff = 2
                }

                if (day == 'Monday') {
                    diff = 1
                }

                if (day == 'Wednesday') {
                    diff = 2
                }

                if (day == 'Thursday') {
                    diff = 1
                }

                if (day == 'Saturday') {
                    diff = 3
                }

                d.setDate(d.getDate() + diff)

                let queryByDate = d.toLocaleString().split(', ')

                let x = await props.getNewSessionData(queryByDate[0])
                // console.log(queryByDate[0])
                setCurrentHot(x.data.games.megaMillions.hot)
                setCurrentCold(x.data.games.megaMillions.cold)
                setCurrentOverdue(x.data.games.megaMillions.overdue)
                setCurrentRepeat(x.data.games.megaMillions.repeat)
                setUnalteredResults(x.data.games.megaMillions.recentResults)
                setWinningNumbers(x.data.games.megaMillions.winningNumbers)
                setWinningPairs(x.data.games.megaMillions.winningPairs)
                setHotMB(x.data.games.megaMillions.MBhot)
                setColdMB(x.data.games.megaMillions.MBcold)
                setOverdueMB(x.data.games.megaMillions.MBoverdue)
                setRepeatMB(x.data.games.megaMillions.MBrepeat)
                setLines(x.data.games.megaMillions.predictions)
                setSelectedResults(x.data.games.megaMillions.recentResults)
                setCurrentDateSelected(queryByDate[0])
                let f = await FUNCTIONS.filterPlayedNumbers(x.data.games.megaMillions.recentResults)

                if (f.status) {
                    setRecentlyPlayedNumbers(props => {
                        return f.filtered
                    })
                    setDataDisplayed(true)
                }

            }

        }

    }, [props])

    // const intoDelta = (one, two, three, four, five) => {
    //     return `${one}-${(two - one)}-${(three - two)}-${(four - three)}-${(five - four)}`
    // }

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
            let tm = FUNCTIONS.funcInputBlur(guessLine1)
            setGuessLine1(tm)
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

    const inputBlurs = () => {
        let hm = FUNCTIONS.funcInputBlur(checkNumbers)
        setCheckNumber(hm)
    }

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
            <span className={`${winningNumbersArr.includes(e.firstNum) ? "selectedNum" : ""}`}>{e.firstNum}</span>-<span className={`${winningNumbersArr.includes(e.secondNum) ? "selectedNum" : ""}`}>{e.secondNum}</span>-<span className={`${winningNumbersArr.includes(e.thirdNum) ? "selectedNum" : ""}`}>{e.thirdNum}</span>-<span className={`${winningNumbersArr.includes(e.fourthNum) ? "selectedNum" : ""}`}>{e.fourthNum}</span>-<span className={`${winningNumbersArr.includes(e.fifthNum) ? "selectedNum" : ""}`}>{e.fifthNum}</span> {e.megaBall}
            {/* <span>[{intoDelta(e.firstNum, e.secondNum, e.thirdNum, e.fourthNum, e.fifthNum)}]</span> */}
        </div>
    })

    const mapLines = lines.map((e) => {

        let temp = e.sequence.split('-')

        return <div key={e.sequence}>
            <span className={`${winningNumbersArr.includes(temp[0]) ? "selectedNum" : ""}`}>{temp[0]}</span>-<span className={`${winningNumbersArr.includes(temp[1]) ? "selectedNum" : ""}`}>{temp[1]}</span>-<span className={`${winningNumbersArr.includes(temp[2]) ? "selectedNum" : ""}`}>{temp[2]}</span>-<span className={`${winningNumbersArr.includes(temp[3]) ? "selectedNum" : ""}`}>{temp[3]}</span>-<span className={`${winningNumbersArr.includes(temp[4]) ? "selectedNum" : ""}`}>{temp[4]}</span> <span style={{ color: 'green' }}>{e.played ? '✔' : ''}</span> <span style={{ color: 'orange', fontSize: '12px', fontWeight: 'bold' }}>{e.quickPick === true || e.quickPick === 'true' ? 'QP' : ''}</span>
        </div>
    })

    return (

        <div>
            <Head>
                <title>Mega Millions</title>
                <meta name="description" content="Mega Millions" />
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
                                    <div className="ctr">
                                        {/* <h2>H-C-O-R</h2> */}
                                        MBHot: <span className={`${megaBallArr.includes(hotMB[0]) ? "selectedNum" : ""}`}>{hotMB[0]}</span> <span className={`${megaBallArr.includes(hotMB[1]) ? "selectedNum" : ""}`}>{hotMB[1]}</span> <br />
                                        MBCold: <span className={`${megaBallArr.includes(coldMB[0]) ? "selectedNum" : ""}`}>{coldMB[0]}</span> <span className={`${megaBallArr.includes(coldMB[1]) ? "selectedNum" : ""}`}>{coldMB[1]}</span> <br />
                                        MBOverdue: <span className={`${megaBallArr.includes(overdueMB[0]) ? "selectedNum" : ""}`}>{overdueMB[0]}</span> <span className={`${megaBallArr.includes(overdueMB[1]) ? "selectedNum" : ""}`}>{overdueMB[1]}</span><br />
                                        MBRepeat: <span className={`${megaBallArr.includes(repeatMB[0]) ? "selectedNum" : ""}`}>{repeatMB[0]}</span> <span className={`${megaBallArr.includes(repeatMB[1]) ? "selectedNum" : ""}`}>{repeatMB[1]}</span>
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

export default MegaMillions