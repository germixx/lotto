import Head from 'next/head'

import NAVBAR from '../../../components/navbar/main'
import LOTTOBAR from '../../../components/navbar/lotto'

import { useEffect, useState } from 'react'

import FUNCTIONS from '../../../functions/play/pick3'

function Pick3(props) {

    useEffect(() => {

    }, [])

    return (
        <div>
            <Head>
                <title>Florida Pick3</title>
                <meta name="description" content="pick3 Home" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container">
                <NAVBAR changeGame={props.changeGame} currentGameView={props.currentGameView} />
                {/* <LOTTOBAR /> */}
            </div>
        </div>
    )
}

export default Pick3