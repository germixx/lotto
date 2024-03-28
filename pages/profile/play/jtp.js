import Head from 'next/head'

import NAVBAR from '../../../components/navbar/main'
import JTP from '../../../components/navbar/jtp'

import { useEffect, useState } from 'react'

import FUNCTIONS from '../../../functions/play/jtp'

function Jtp(props) {

    let filtered
    // const [filtered, setFiltered] = useState()
    const [currentDateSelected, setCurrentDateSelected] = useState(new Date)
    const [winningNumbers, setWinningNumbers] = useState('')
    const [selectedResults, setSelectedResults] = useState([])
    const [winningNumbersArr, setWinningNumbersArr] = useState([])
    const [checkNumbers, setCheckNumber] = useState('')
    const [isPlayed, setIsPlayed] = useState('')
    const [dataDisplayed, setDataDisplayed] = useState(false)
    const [gameData, setGameData] = useState(props)
    const [currentHot, setCurrentHot] = useState([])
    const [winningPairs, setWinningPairs] = useState([])
    const [currentOverdue, setCurrentOverdue] = useState([])
    const [lines, setLines] = useState([])
    const [unalteredResults, setUnalteredResults] = useState([])
    const [recentlyPlayedNumbers, setRecentlyPlayedNumbers] = useState({})
    const [played, setPlayed] = useState(false)
    const [quickPick, setQuickPick] = useState(false)
    const [guessLine1, setGuessLine1] = useState('')

    useEffect(async () => {

        if (typeof (props.gameData) == 'object') {
            console.log(props)
            setGameData(props.gameData.data.games.jtp)
            setCurrentHot(props.gameData.data.games.jtp.hot)
            setCurrentOverdue(props.gameData.data.games.jtp.overdue)
            setUnalteredResults(props.gameData.data.games.jtp.recentResults)
            setWinningNumbers(props.gameData.data.games.jtp.winningNumbers)
            setWinningPairs(props.gameData.data.games.jtp.winningPairs)
            setLines(props.gameData.data.games.jtp.predictions)
            setSelectedResults(props.gameData.data.games.jtp.recentResults)

            let f = await FUNCTIONS.filterPlayedNumbers(props.gameData.data.games.cash4life.recentResults)

            if (f.status) {
                setRecentlyPlayedNumbers(props => {
                    return f.filtered
                })
                setDataDisplayed(true)
            }

        }

    }, [props])

    const mapLines = lines.map((e) => {

        console.log(e, ' is ee')
        // check if e.sequence and winningNumbers match for 5
        // HERE check for winning numbers and push notification requests



        let temp = e.sequence.split('-')
        return <div key={e.sequence}>
            <span className={`${winningNumbersArr.includes(temp[0]) ? "selectedNum" : ""}`}>{temp[0]}</span>-<span className={`${winningNumbersArr.includes(temp[1]) ? "selectedNum" : ""}`}>{temp[1]}</span>-<span className={`${winningNumbersArr.includes(temp[2]) ? "selectedNum" : ""}`}>{temp[2]}</span>-<span className={`${winningNumbersArr.includes(temp[3]) ? "selectedNum" : ""}`}>{temp[3]}</span>-<span className={`${winningNumbersArr.includes(temp[4]) ? "selectedNum" : ""}`}>{temp[4]}</span> <span style={{ color: 'green' }}>{e.played ? '✔' : ''}</span> <span style={{ color: 'orange', fontSize: '12px', fontWeight: 'bold' }}>{e.quickPick === true || e.quickPick === 'true' ? 'QP' : ''}</span>
        </div>
    })

    const resultz = selectedResults.map(e => {

        let tmp = e.sequence.split('-')

        return <div className="lineResult" key={e.date}>
            {/* {e.sequence} */}
            <span className={`${winningNumbersArr.includes(e.firstNum) ? "selectedNum" : ""}`}>{e.firstNum}</span>-<span className={`${winningNumbersArr.includes(e.secondNum) ? "selectedNum" : ""}`}>{e.secondNum}</span>-<span className={`${winningNumbersArr.includes(e.thirdNum) ? "selectedNum" : ""}`}>{e.thirdNum}</span>-<span className={`${winningNumbersArr.includes(e.fourthNum) ? "selectedNum" : ""}`}>{e.fourthNum}</span>-<span className={`${winningNumbersArr.includes(e.fifthNum) ? "selectedNum" : ""}`}>{e.fifthNum}</span> {e.cashBall}
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

    return (
        <div>
            <Head>
                <title>Jackpot Triple Play</title>
                <meta name="description" content="jtp Home" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container" style={{ backgroundColor: '#d3e5f2' }}>
                <main style={{ textAlign: 'centerr' }}>
                    <NAVBAR changeGame={props.changeGame} currentGameView={props.currentGameView} />

                    <div style={{ textAlign: 'center' }}><br />

                        <div className='row' style={{ width: '100%' }}>
                            <h4 style={{ width: '100%', textAlign: 'center' }}>{currentDateSelected.toLocaleDateString()}</h4>
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
                                        {/* Cold: <span className={`${winningNumbersArr.includes(currentCold[0]) ? "selectedNum" : ""}`}>{currentCold[0]}</span>, <span className={`${winningNumbersArr.includes(currentCold[1]) ? "selectedNum" : ""}`}>{currentCold[1]}</span>, <span className={`${winningNumbersArr.includes(currentCold[2]) ? "selectedNum" : ""}`}>{currentCold[2]}</span>, <span className={`${winningNumbersArr.includes(currentCold[3]) ? "selectedNum" : ""}`}>{currentCold[3]}</span> <br /> */}
                                        Overdue: <span className={`${winningNumbersArr.includes(currentOverdue[0]) ? "selectedNum" : ""}`}>{currentOverdue[0]}</span>, <span className={`${winningNumbersArr.includes(currentOverdue[1]) ? "selectedNum" : ""}`}>{currentOverdue[1]}</span>, <span className={`${winningNumbersArr.includes(currentOverdue[2]) ? "selectedNum" : ""}`}>{currentOverdue[2]}</span>, <span className={`${winningNumbersArr.includes(currentOverdue[3]) ? "selectedNum" : ""}`}>{currentOverdue[3]}</span> <br />
                                        {/* Repeat: <span className={`${winningNumbersArr.includes(currentRepeat[0]) ? "selectedNum" : ""}`}>{currentRepeat[0]}</span>, <span className={`${winningNumbersArr.includes(currentRepeat[1]) ? "selectedNum" : ""}`}>{currentRepeat[1]}</span>, <span className={`${winningNumbersArr.includes(currentRepeat[2]) ? "selectedNum" : ""}`}>{currentRepeat[2]}</span>, <span className={`${winningNumbersArr.includes(currentRepeat[3]) ? "selectedNum" : ""}`}>{currentRepeat[3]}</span> */}
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

export default Jtp