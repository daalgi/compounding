import React, { useState } from 'react'

import './App.css'

import Form from './Components/Form'
// import Chart from './Components/Chart'
import Analysis from './Components/Analysis'
import Chart from './Components/Chart'
import Help from './Components/Help'


const defaultState = {
    scenario: {
        initialInvestment: 0,
        monthlyDeposits: 0,
        monthlyWithdrawals: 0,
        yearlyWithdrawals: 0
    },
    retirementStart: {
        year: 0,
        constant: 0,
        random: 0,
        firstYearGains: 0
    },
    lastYear: {
        year: 0,
        deposited: 0,
        withdrawn: 0,
        constant: 0,
        random: 0,
        normalDistribution: { mean: 0, standardDeviation: 0 }
    },
    yearBankrupcy: {},
    probabilities: { noBankrupcy: 0, lastYearGEdeposited: 0 },
    plotData: [{ year: 1, constant: 0, random: 0 }]
}

function App() {
    const [state, setState] = useState(defaultState)

    //   console.log('render index')
    return (
        <div className="">

            <h1 className="title">Investment compounding</h1>
            {/* <Help /> */}

            <div className="">

                <Form setState={setState} />
                <Analysis state={state} />
                <Chart data={state.plotData} />

            </div>
            
        </div>
    )
}

export default App;