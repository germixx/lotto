import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'

import { useEffect, useState } from "react"

import { useRouter } from 'next/router'

import { grabSessionData } from '../functions/datafunc'

import { StateProvider } from '../Context/StateProvider'

import reducer, { initialState } from '../Context/Reducer'

function MyApp({ Component, pageProps }) {


  const router = useRouter()

  const [currentGameView, setCurrentGameView] = useState('')
  const [gameData, setGameData] = useState()

  const changeGame = (e) => {

    setCurrentGameView(e)

    router.push({ pathname: `/profile/play/${e}` })

  }

  useEffect(async () => {

    import("bootstrap/dist/js/bootstrap")

    let x = await grabSessionData(new Date().toLocaleDateString())

    if (x.status) {

      setGameData(x)

    } else {

      let dt = new Date()

      dt.setDate(dt.getDate() - 1)

      let x = await grabSessionData(dt.toLocaleDateString())

      setGameData(x)

    }

    // let x = await grabSessionData('11/4/2022')


  }, [])

  const getNewSessionData = async (date) => {
    return await grabSessionData(date)
  }

  const viewGameReport = (e) => {
    router.push({ pathname: `/profile/play/${e}/report` })
  }

  return <StateProvider initialState={initialState} reducer={reducer} >
    <Component {...pageProps} changeGame={changeGame} currentGameView={currentGameView} gameData={gameData} getNewSessionData={getNewSessionData} viewGameReport={viewGameReport} />
  </StateProvider >



}

export default MyApp
