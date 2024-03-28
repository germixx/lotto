function main(props) {
    return (
        <div className="row" style={{ backgroundColor: 'red' }}>
            <div style={{ width: '100%', marginBottom: '15px' }}>
                <div className="dropdown" >
                    <br />
                    <button onClick={() => props.changeGame('fantasy5')}>Fantasy5</button>
                    <button onClick={() => props.changeGame('lotto')}>Lotto</button>
                    <button onClick={() => props.changeGame('powerball')}>Powerball</button>
                    <button onClick={() => props.changeGame('megaMillions')}>MegaMillions</button>
                    <button onClick={() => props.changeGame('cash4life')}>Cash4life</button>
                    <button onClick={() => props.changeGame('jtp')}>JackpotTriplePlay</button>
                    <button onClick={() => props.changeGame('pick2')}>Pick2</button>
                    <button onClick={() => props.changeGame('pick3')}>Pick3</button>
                    <button onClick={() => props.changeGame('pick4')}>Pick4</button>
                    <button onClick={() => props.changeGame('pick5')}>Pick5</button>

                </div>
            </div>
        </div>
    )
}

export default main