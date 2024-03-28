import Head from 'next/head'

import NAVBAR from '../../../components/navbar/main'
import LOTTOBAR from '../../../components/navbar/lotto'

import { useEffect, useState } from 'react'

import FUNCTIONS from '../../../functions/play/pick2'

function Pick2(props) {

    useEffect(() => {

    }, [])

    return (
        <div>
            <Head>
                <title>Florida pick2</title>
                <meta name="description" content="pick2 Home" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container">
                <NAVBAR changeGame={props.changeGame} currentGameView={props.currentGameView} />
                {/* <LOTTOBAR /> */}
            </div>
        </div>
    )
}

export default Pick2