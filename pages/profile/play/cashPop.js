import Head from 'next/head'

import NAVBAR from '../../../components/navbar/main'
import LOTTOBAR from '../../../components/navbar/lotto'

import { useEffect, useState } from 'react'

// import FUNCTIONS from '../../../functions/play/cashPop'

function CashPop(props) {

    useEffect(async () => {

    }, [])

    return (
        <div>
            <Head>
                <title>Florida cashPop</title>
                <meta name="description" content="FL cashPop Home" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container">
                <NAVBAR changeGame={props.changeGame} currentGameView={props.currentGameView} />
                {/* <LOTTOBAR /> */}
            </div>
        </div>
    )
}

export default CashPop