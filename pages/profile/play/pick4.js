import Head from 'next/head'

import NAVBAR from '../../../components/navbar/main'
import LOTTOBAR from '../../../components/navbar/lotto'

import { useEffect, useState } from 'react'

import FUNCTIONS from '../../../functions/play/pick4'

function Pick4(props) {

    useEffect(() => {

    }, [])

    return (
        <div>
            <Head>
                <title>Florida pick4</title>
                <meta name="description" content="pick4 Home" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container">
                <NAVBAR changeGame={props.changeGame} currentGameView={props.currentGameView} />
                {/* <LOTTOBAR /> */}
            </div>
        </div>
    )
}

export default Pick4