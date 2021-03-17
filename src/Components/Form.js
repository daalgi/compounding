import { useState, useEffect } from 'react'

import CustomSlider from './CustomSlider'
import { Subtitle } from './Common'
import { runAnalysis } from '../utils'


const SCENARIO_INPUTS = [
    {
        label: value => `Years to retire: ${value}`,
        name: "yearsToRetire",
        min: 0, max: 50, step: 1,
        marks: [0, 10, 20, 30, 40, 50]
    }, {
        label: value => `Initial investment: ${value/1000}k`,
        name: "initialInvestment",
        min: 0, max: 500e3, step: 1000,
        marks: [0, 100e3, 200e3, 300e3, 400e3, 500e3],
        factor: 0.001,
        suffix: "k"
    }, {
        label: value => `Monthly deposit: ${value}`,
        name: "monthlyDeposits",
        min: 0, max: 3000, step: 100,
        marks: [0, 500, 1000, 2000, 3000]
    }, {
        label: value => `Monthly withdrawal: ${value}`,
        name: "monthlyWithdrawals",
        min: 0, max: 3000, step: 100,
        marks: [0, 500, 1000, 2000, 3000]
    }, {
        label: value => `Years in retirement: ${value}`,
        name: "yearsInRetirement",
        min: 20, max: 60, step: 5,
        marks: [20, 30, 40, 50, 60]
    },
]

const RETURNS_INPUTS = [
    {
        label: value => `Mean: ${value}%`,
        name: "roiMean",
        min: 0, max: 50, step: 1,
        marks: [0, 10, 20, 30, 40, 50]
    }, {
        label: value => `Standard deviation: ${value}%`,
        name: "roiStsdv",
        min: 0, max: 50, step: 1,
        marks: [0, 10, 20, 30, 40, 50]
    }
]

const defaultValues = {
    initialInvestment: 5000,
    monthlyDeposits: 500,
    yearsToRetire: 20,
    monthlyWithdrawals: 1200,
    yearsInRetirement: 40,
    roiMean: 7,
    roiStsdv: 19
}

const Form = ({ setState }) => {
    const [input, setInput] = useState(defaultValues)

    useEffect(() => {
        // Use the form initial values to do the first calculation
        handleCalculations()
    }, [])

    const handleChange = (name, value) => {
        // let name = e.target.parentNode.id
        // console.log(name, value)
        setInput({ ...input, [name]: value })
    }

    const handleSubmit = e => {
        //console.log(e.target)
        e.preventDefault()
        handleCalculations()
    }

    const handleCalculations = () => {
        let random = { ...input, roiMean: input.roiMean / 100, roiStsdv: input.roiStsdv / 100 }
        let res = runAnalysis({ ...random, roiStsdv: 0}, random)
        // console.log(res)
        setState(res)
    }
    // console.log('render FORM')
    return (
        <form onSubmit={handleSubmit}
            className="input-form">
            <Subtitle>Scenario parameters</Subtitle>
            {SCENARIO_INPUTS.map(
                ({label, name, min, max, step, marks, factor, suffix}, i) => 
                <CustomSlider
                    key={i}
                    label={label}
                    name={name}
                    value={input[name]}
                    defaultValue={defaultValues[name]}
                    onChange={handleChange}
                    min={min} max={max} step={step}
                    marks={marks}
                    factor={factor}
                    suffix={suffix}
                />
            )}
            <Subtitle>Expected annual returns (normal distribution)</Subtitle>
            {RETURNS_INPUTS.map(
                ({label, name, min, max, step, marks, factor, suffix}, i) => 
                <CustomSlider
                    key={i}
                    label={label}
                    name={name}
                    value={input[name]}
                    defaultValue={defaultValues[name]}
                    onChange={handleChange}
                    min={min} max={max} step={step}
                    marks={marks}
                    factor={factor}
                    suffix={suffix}
                />
            )}
            <button type="submit" name="btn" className="btn">
                Run simulation
            </button>

        </form>
    )
}

export default Form