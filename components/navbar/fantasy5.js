
function ff5(props) {

    return (
        <div>
            <div className='row' style={{ width: '100%' }}>

                <h4 style={{ width: '100%', textAlign: 'center' }}>{props ? props.currentDateSelected.toLocaleDateString() : ''}</h4>
                <div style={{ float: 'right' }}>
                    <h5>Check Number</h5>
                    <input value={props.checkNumbers} onChange={(e) => setCheckNumber(e.target.value)} style={{ width: '150px' }} type="name" />
                    <button onClick={() => handleCheckWinningNumber(checkNumbers)} style={{ width: '50px', marginLeft: '5px' }}>✓</button>
                    <div>
                        {
                            // here show status of checked number
                            props.isPlayed === '' ? ('') : (props.isPlayed ? (`Was played on ${dataa}`) : (`Good to play`))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ff5