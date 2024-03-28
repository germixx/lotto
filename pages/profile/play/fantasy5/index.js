import Head from 'next/head'
import { useEffect, useState } from 'react'

import NAVBAR from '../../../../components/navbar/main'
import FF5NAVBAR from '../../../../components/navbar/fantasy5'
import FILTERED from '../../../../components/play/fantasy5/Filtered'
import PATTERNS from '../../../../components/play/fantasy5/Patterns'
import SUBPATTERNS from '../../../../components/play/fantasy5/SubPatterns'
import DOUBLES from '../../../../components/play/fantasy5/Doubles'
import TRIPLES from '../../../../components/play/fantasy5/Triples'

import LFUNCTIONS from '../../../../functions/play/fantasy5/fantasy5'

import { grabSessionData } from '../../../../functions/datafunc'

import { algorithm1 } from '../../../../functions/algorithms'

export async function getServerSideProps(context) {

    const rez = await fetch(`https://draweffects.com/api/us/florida/fantasy5/getAll`, {
        method: 'GET',
    }).then(res => res.json())
        .then((json) => {
            if (json.status) {
                return json
            } else {
                return false
            }

        }).catch(err => {
            throw err
        })

    return {
        props: { 'data': rez }, // will be passed to the page component as props
    }
}

export default function Ff5(props) {

    let generateds
    const [results500, setResults500] = useState([])
    const [results5000, setResults5000] = useState([])
    const [todaysDate, setTodaysDate] = useState(new Date().toLocaleDateString())
    const [currentDateSelected, setCurrentDateSelected] = useState(new Date().toLocaleDateString())
    const [dataDisplayed, setDataDisplayed] = useState(false)
    const [selectedResults, setSelectedResults] = useState([])
    const [unalteredResults, setUnalteredResults] = useState([])
    const [thelast18, setLast18] = useState([])
    const [thelast8, setLast8] = useState([])
    const [recentlyPlayedNumbers, setRecentlyPlayedNumbers] = useState({})
    const [predictionsSet, setPredictionsSet] = useState(false)
    const [currentHot, setCurrentHot] = useState([])
    const [currentCold, setCurrentCold] = useState([])
    const [currentOverdue, setCurrentOverdue] = useState([])
    const [currentRepeat, setCurrentRepeat] = useState([])
    const [winningNumbers, setWinningNumbers] = useState('')
    const [winningNumbersArr, setWinningNumbersArr] = useState([])
    const [guessLine1, setGuessLine1] = useState('')
    const [lines, setLines] = useState([])
    const [gameData, setGameData] = useState(props)
    const [quickPick, setQuickPick] = useState(false)
    const [played, setPlayed] = useState(false)
    const [checkNumbers, setCheckNumber] = useState('')
    const [isPlayed, setIsPlayed] = useState('')
    const [dataa, setDataa] = useState('')
    const [generatedRandom, setGeneratedRandom] = useState([])
    const [showPattern, setShowPattern] = useState(false)
    const [showFiltered, setShowFiltered] = useState(true)
    const [showSubPatterns, setShowSubPatterns] = useState(false)
    const [showDoubles, setShowDoubles] = useState(false)
    const [showTriples, setShowTriples] = useState(false)

    // Initial Functions
    useEffect(async () => {

        if (typeof (props.gameData) == 'object') {

            setGameData(props.gameData.data.games.fantasy5)
            setCurrentHot(props.gameData.data.games.fantasy5.hot)
            setCurrentCold(props.gameData.data.games.fantasy5.cold)
            setCurrentOverdue(props.gameData.data.games.fantasy5.overdue)
            setCurrentRepeat(props.gameData.data.games.fantasy5.repeat)
            setSelectedResults(props.gameData.data.games.fantasy5.recentResults)
            setWinningNumbers(props.gameData.data.games.fantasy5.winningNumbers)
            setWinningNumbersArr(props.gameData.data.games.fantasy5.winningNumbers.split('-'))
            setUnalteredResults(props.gameData.data.games.fantasy5.recentResults)
            setLines(props.gameData.data.games.fantasy5.predictions)
            setCurrentDateSelected(props.gameData.data.sessionDate)
            setGeneratedRandom(props.gameData.data.games.fantasy5.generatedRandom)
            setRecentlyPlayedNumbers(props.gameData.data.games.fantasy5.recentResults)
            setResults500(props.data.rows)
            setResults5000(props.data.rows)
            setDataDisplayed(true)

        }

    }, [props])

    // Toggle back one day
    const minus1Day = async () => {

        let d = new Date(currentDateSelected)

        d.setDate(d.getDate() - 1)

        setCurrentDateSelected(d.toLocaleDateString())

        let xA = await grabSessionData(d.toLocaleDateString())

        if (xA.status && xA.data !== null) {

            setCurrentCold(xA.data.games.fantasy5.cold)
            setCurrentHot(xA.data.games.fantasy5.hot)
            setCurrentOverdue(xA.data.games.fantasy5.overdue)
            setCurrentRepeat(xA.data.games.fantasy5.repeat)
            setSelectedResults(xA.data.games.fantasy5.recentResults)
            setUnalteredResults(xA.data.games.fantasy5.recentResults)
            setRecentlyPlayedNumbers(xA.data.games.fantasy5.recentResults)
            setWinningNumbers(xA.data.games.fantasy5.winningNumbers)
            setWinningNumbersArr(xA.data.games.fantasy5.winningNumbers.split('-'))
            setGeneratedRandom(xA.data.games.fantasy5.generatedRandom)
            setLines(xA.data.games.fantasy5.predictions)
            setDataDisplayed(true)

        } else {
            setDataDisplayed(false)
            setWinningNumbers('')
        }
    }

    // Toggle forward one day
    const plus1Day = async () => {

        let d = new Date(currentDateSelected)

        d.setDate(d.getDate() + 1)

        setCurrentDateSelected(d.toLocaleDateString())

        let xA = await grabSessionData(d.toLocaleDateString())

        if (xA.status && xA.data !== null) {
            setCurrentCold(xA.data.games.fantasy5.cold)
            setCurrentHot(xA.data.games.fantasy5.hot)
            setCurrentOverdue(xA.data.games.fantasy5.overdue)
            setCurrentRepeat(xA.data.games.fantasy5.repeat)
            setSelectedResults(xA.data.games.fantasy5.recentResults)
            setUnalteredResults(xA.data.games.fantasy5.recentResults)
            setRecentlyPlayedNumbers(xA.data.games.fantasy5.recentResults)
            setWinningNumbers(xA.data.games.fantasy5.winningNumbers)
            setWinningNumbersArr(xA.data.games.fantasy5.winningNumbers.split('-'))
            setLines(xA.data.games.fantasy5.predictions)
            setGeneratedRandom(xA.data.games.fantasy5.generatedRandom)
            setDataDisplayed(true)

        } else {
            setDataDisplayed(false)
            setWinningNumbers('')
        }
    }

    const toggleFiPaSuDuTri = (val) => {

        switch (val) {
            case 'filter':
                setShowFiltered(true)
                setShowDoubles(false)
                setShowPattern(false)
                setShowSubPatterns(false)
                setShowTriples(false)
                break
            case 'patterns':
                setShowFiltered(false)
                setShowDoubles(false)
                setShowPattern(true)
                setShowSubPatterns(false)
                setShowTriples(false)
                break
            case 'subPatterns':
                setShowFiltered(false)
                setShowDoubles(false)
                setShowPattern(false)
                setShowSubPatterns(true)
                setShowTriples(false)
                break;
            case 'doubles':
                setShowFiltered(false)
                setShowDoubles(true)
                setShowPattern(false)
                setShowSubPatterns(false)
                setShowTriples(false)
                break;
            case 'triples':
                setShowFiltered(false)
                setShowDoubles(false)
                setShowPattern(false)
                setShowSubPatterns(false)
                setShowTriples(true)
                break;
        }

    }

    if (generatedRandom.length > 0) {

        generateds = generatedRandom.map(e => {
            let tmp = e.split('-')

            return <div className="lineResult" key={e}>
                {/* {e.sequence} */}
                <span className={`${winningNumbersArr.includes(tmp[0]) ? "selectedNum" : ""}`}>{tmp[0]}</span>-<span className={`${winningNumbersArr.includes(tmp[1]) ? "selectedNum" : ""}`}>{tmp[1]}</span>-<span className={`${winningNumbersArr.includes(tmp[2]) ? "selectedNum" : ""}`}>{tmp[2]}</span>-<span className={`${winningNumbersArr.includes(tmp[3]) ? "selectedNum" : ""}`}>{tmp[3]}</span>-<span className={`${winningNumbersArr.includes(tmp[4]) ? "selectedNum" : ""}`}>{tmp[4]}</span>
            </div>

        })
    }

    // Map recent result
    const resultz = selectedResults.map(e => {

        let tmp = e.sequence.split('-')

        return <div className="lineResult" key={e.date}>
            {/* {e.sequence} */}
            <span className={`${winningNumbersArr.includes(e.n1) ? "selectedNum" : ""}`}>{e.n1}</span>-<span className={`${winningNumbersArr.includes(e.n2) ? "selectedNum" : ""}`}>{e.n2}</span>-<span className={`${winningNumbersArr.includes(e.n3) ? "selectedNum" : ""}`}>{e.n3}</span>-<span className={`${winningNumbersArr.includes(e.n4) ? "selectedNum" : ""}`}>{e.n4}</span>-<span className={`${winningNumbersArr.includes(e.n5) ? "selectedNum" : ""}`}>{e.n5}</span> <span>[{LFUNCTIONS.intoDelta(e.n1, e.n2, e.n3, e.n4, e.n5)}]</span>
        </div>
    })

    const inputBlur = () => {
        if (typeof (guessLine1) !== 'undefined' || typeof (guessLine1) !== undefined || guessLine1 !== ' ' || guessLine1 !== "") {
            setGuessLine1(LFUNCTIONS.funcInputBlur(guessLine1))
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

    const inputFocus1 = (num) => {

        if (guessLine1 == '' || guessLine1 === undefined || guessLine1 === 'undefined') {
            return
        } else {

            let ff = guessLine1.split('-')

            if (ff[0] === '') {
                return
            } else {
                setGuessLine1(ff[0] + ff[1] + ff[2] + ff[3] + ff[4])
            }
        }
    }

    const getAllss = () => {
        return props.data.rows
    }

    const adjustText = (text, num) => {
        setGuessLine1(state => {
            return text
        })
    }

    const toggleQuickPick = () => {
        setQuickPick(!quickPick)
    }

    const togglePlayed = () => {
        setPlayed(!played)
    }

    const addLine = () => {

        let tmp = lines

        let tmpObj = {
            "sequence": LFUNCTIONS.fixLine(guessLine1),
            played,
            quickPick
        }

        tmp.push(tmpObj)

        LFUNCTIONS.addPlayLine(tmp, currentDateSelected)

        setGuessLine1('')
        setQuickPick(false)
        setPlayed(false)
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
        await LFUNCTIONS.checkNumber(LFUNCTIONS.fixLine(checkNumbers), setResult)
    }

    const mapLines = lines.map((e) => {

        let temp = e.sequence.split('-')

        return <div key={e.sequence}>
            <span className={`${winningNumbersArr.includes(temp[0]) ? "selectedNum" : ""}`}>{temp[0]}</span>-<span className={`${winningNumbersArr.includes(temp[1]) ? "selectedNum" : ""}`}>{temp[1]}</span>-<span className={`${winningNumbersArr.includes(temp[2]) ? "selectedNum" : ""}`}>{temp[2]}</span>-<span className={`${winningNumbersArr.includes(temp[3]) ? "selectedNum" : ""}`}>{temp[3]}</span>-<span className={`${winningNumbersArr.includes(temp[4]) ? "selectedNum" : ""}`}>{temp[4]}</span> <span style={{ color: 'green' }}>{e.played ? '✔' : ''}</span> <span style={{ color: 'orange', fontSize: '12px', fontWeight: 'bold' }}>{e.quickPick === true || e.quickPick === 'true' ? 'QP' : ''}</span>
        </div>
    })

    // LFUNCTIONS.generateByGivenNumbers(['', 4, 6, 7, 11, 25, 32, 34, 23, 19, 16, 5, 13, 29])

    return (
        <div>
            <Head>
                <title>Fantasy5</title>
                <meta name="description" content="FL Fantasy Home" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container" style={{ backgroundColor: '#d3e5f2' }}>
                <main style={{ textAlign: 'centerr' }}>
                    <NAVBAR changeGame={props.changeGame} currentGameView={props.currentGameView} />
                    <div style={{ textAlign: 'center' }}><br />
                        {/* <FF5NAVBAR currentDateSelected={currentDateSelected} checkNumbers={checkNumbers} isPlayed={isPlayed} /> */}
                        <h4 style={{ width: '100%', textAlign: 'center' }}>{currentDateSelected}</h4>

                        <button style={{ marginRight: "5px" }} onClick={() => minus1Day(currentDateSelected)} name="previous"> {'<Prev'}  </button>
                        <button style={{ marginLeft: "5px" }} onClick={() => plus1Day(currentDateSelected)} name="right">{'Next>'}</button>
                    </div>
                    <br />
                    <div style={{ textAlign: 'center' }}>
                        <h5>Winning Numbers</h5>
                        {winningNumbers} <br />
                        {LFUNCTIONS.convertIntoPatternFromArray(winningNumbers.split('-'))}<br />
                        {LFUNCTIONS.convertIntoPatternSubPatternFromArray(winningNumbers.split('-'))}
                    </div>

                    {dataDisplayed ?
                        (
                            <div className='row'>
                                <div className="col-sm" style={{ backgroundColor: 'lightblue' }}>
                                    <div className="ctr">
                                        <h2>H-C-O-R</h2>
                                        {/* Hot: <span className={`${winningNumbersArr.includes(currentHot[0]) ? "selectedNum" : ""}`}>{currentHot[0]}</span>, <span className={`${winningNumbersArr.includes(currentHot[1]) ? "selectedNum" : ""}`}>{currentHot[1]}</span>, <span className={`${winningNumbersArr.includes(currentHot[2]) ? "selectedNum" : ""}`}>{currentHot[2]}</span>, <span className={`${winningNumbersArr.includes(currentHot[3]) ? "selectedNum" : ""}`}>{currentHot[3]}</span> <br /> */}
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
                                            <input style={{ float: 'left', }} value={guessLine1} onChange={(e) => adjustText(e.target.value, 1)} maxLength={10} onBlur={(e) => inputBlur(1)} onFocus={(e) => inputFocus1(1)} type="text" /> <br />

                                            <br />
                                            <div className='ctr'>
                                                {mapLines}
                                            </div>
                                            <br />
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <h3>Generated</h3>
                                            {generateds}
                                        </div>
                                    </div> <br />
                                    <div className='row' style={{ width: '100%' }}>
                                        <span style={{ textAlign: 'center' }}><button onClick={() => props.viewGameReport('fantasy5')}>Report</button></span>
                                        <div style={{ textAlign: 'center' }}>
                                            <h5>Check Number</h5>
                                            <input value={checkNumbers} maxLength={10} onChange={(e) => setCheckNumber(e.target.value)} onBlur={(e) => setCheckNumber(LFUNCTIONS.funcInputBlur(checkNumbers))} onFocus={(e) => inputFocus()} style={{ width: '150px' }} type="name" />
                                            <button onClick={() => handleCheckWinningNumber(checkNumbers)} style={{ width: '50px', marginLeft: '5px', color: 'green', backgroundColor: 'lightgreen', borderRadius: '100px' }}>✓</button>
                                            <div>
                                                {

                                                    // here show status of checked number
                                                    isPlayed === '' ? ('') : (isPlayed ? (`Was played on ${dataa}`) : (`Good to play`))

                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                </div>
                                <div className="col-sm" style={{ textAlign: 'center', backgroundColor: 'lightgreen' }}>
                                    <div style={{ textAlign: 'centerr' }}>
                                        <div className='row'>
                                            <button onClick={() => setRecentlyPlayedNumbers(results5000.slice(LFUNCTIONS.posToNeg(1000)))} className='fantasy-five-btn'>1000</button>
                                            <button onClick={() => setRecentlyPlayedNumbers(results5000.slice(LFUNCTIONS.posToNeg(1500)))} className='fantasy-five-btn'>1500</button>
                                            <button onClick={() => setRecentlyPlayedNumbers(results5000.slice(LFUNCTIONS.posToNeg(2000)))} className='fantasy-five-btn'>2000</button>
                                            <button onClick={() => setRecentlyPlayedNumbers(results5000.slice(LFUNCTIONS.posToNeg(5000)))} className='fantasy-five-btn'>5000</button>
                                            <button onClick={() => setRecentlyPlayedNumbers(getAllss())} className='fantasy-five-btn'>ALL</button>
                                        </div>
                                        <div className='row'>
                                            <button onClick={() => setRecentlyPlayedNumbers(results500.slice(LFUNCTIONS.posToNeg(10)))} className='fantasy-five-btn'>10</button>
                                            <button onClick={() => setRecentlyPlayedNumbers(results500.slice(LFUNCTIONS.posToNeg(25)))} className='fantasy-five-btn'>25</button>
                                            <button onClick={() => setRecentlyPlayedNumbers(results500.slice(LFUNCTIONS.posToNeg(50)))} className='fantasy-five-btn'>50</button>
                                            <button onClick={() => setRecentlyPlayedNumbers(results500.slice(LFUNCTIONS.posToNeg(100)))} className='fantasy-five-btn'>100</button>
                                            <button onClick={() => setRecentlyPlayedNumbers(results500.slice(LFUNCTIONS.posToNeg(500)))} className='fantasy-five-btn'>500</button>
                                        </div>
                                        <div style={{ textAlign: 'centerr' }}>
                                            <h2>Recent Results</h2>
                                            {resultz}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm" style={{ backgroundColor: 'lightyellow' }}>
                                    <div className='row'>
                                        <button onClick={() => toggleFiPaSuDuTri('filter')} className='fantasy-five-btn'>Filter</button>
                                        <button onClick={() => toggleFiPaSuDuTri('patterns')} className='fantasy-five-btn'>Patterns</button>
                                        <button onClick={() => toggleFiPaSuDuTri('subPatterns')} className='fantasy-five-btn'>SubPatterns</button>
                                        <button onClick={() => toggleFiPaSuDuTri('doubles')} className='fantasy-five-btn'>Doubles</button>
                                        <button onClick={() => toggleFiPaSuDuTri('triples')} className='fantasy-five-btn'>Triples</button>
                                    </div>
                                    <div className='row'>
                                        {
                                            showFiltered ? (<FILTERED results={recentlyPlayedNumbers} winningNumbersArr={winningNumbersArr} />) : (showPattern)
                                                ? (<PATTERNS results={recentlyPlayedNumbers} winningNumbersArr={winningNumbersArr} />) : (showSubPatterns)
                                                    ? (<SUBPATTERNS results={recentlyPlayedNumbers} winningNumbersArr={winningNumbersArr} />) : (showDoubles)
                                                        ? (<DOUBLES results={recentlyPlayedNumbers} winningNumbersArr={winningNumbersArr} />) : (showTriples)
                                                            ? (<TRIPLES results={recentlyPlayedNumbers} winningNumbersArr={winningNumbersArr} />) : ('')
                                        }
                                    </div>
                                </div>
                            </div>) : (<div>
                                <div style={{ textAlign: 'center' }}>No data to display.</div>
                            </div>)
                    }
                </main>
            </div >
        </div >

    )
}