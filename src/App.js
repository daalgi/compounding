import React, { useState } from 'react'

import './App.css'

import Form from './Components/Form'
// import Chart from './Components/Chart'
import Analysis from './Components/Analysis'
import Help from './Components/Help'


const defaultState = {
  retirementStart: {
      year: 0,
      constant: 0,
      random: 0,
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
  probabilities: { noBankrupcy: 0 },
  plotData: [{ year: 1, constant: 0, random: 0 }]
}

function App() {
  const [state, setState] = useState(defaultState)

  console.log('render index')
  return (
      <div className="">

          <h1 className="title">Investment compounding</h1>

          <div className="">

              <Form setState={setState} />
              <Analysis state={state} />

              {/* <div className={localClasses.gridSectionPlot}>

                  <Chart
                      data={state.plotData} x="year" series={["constant", "random"]}
                      width="600" height="400"
                      classes={classes}
                  />
              </div> */}
          </div>

          {/* <Help /> */}
      </div>
  )
}

export default App;
