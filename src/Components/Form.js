import { useState, useEffect } from 'react'

// import Slider, { createSliderWithTooltip } from 'rc-slider'
// import "rc-slider/assets/index.css";
import Slider from '@material-ui/core/Slider'

import { Subtitle } from './Common'
import { runCalculations } from '../utils'


const defaultValues = {
    initialInvestment: 40000,
    monthlyDeposits: 1000,
    yearsToRetire: 20,
    monthlyWithdrawals: 2000,
    yearsInRetirement: 40,
    roiMean: 7,
    roiStsdv: 19
}

// const SliderWithTooltip = createSliderWithTooltip(Slider)

// const CustomSlider = ({
//     label, name, value, defaultValue = 0, min = 0, max = 100, step = 1,
//     marks = null, onChange = null
// }) =>
//     <div className="input-item">
//         <p className="input-label">{label}</p>
//         <SliderWithTooltip
//             id={name}
//             min={min}
//             max={max}
//             step={step}
//             name={name}
//             // defaultValue={defaultValue}
//             value={value}
//             onChange={v => onChange(name, v)}
//             marks={marks}
//             onTouchStart={e => { e.preventDefault() }}
//             onTouchMove={e => { e.preventDefault() }}
//         />
//     </div>
const CustomSlider = ({
    label, name, value, defaultValue = 0, min = 0, max = 100, step = 1,
    marks = null, factor = 1, suffix = "", onChange = null
}) =>
    <div className="input-item">
        {/* <p className="input-label">{label}: {value * factor}{suffix}</p> */}
        <p className="input-label">{label(value)}</p>
        <Slider
            id={name}
            min={min}
            max={max}
            step={step}
            // value={value}
            defaultValue={defaultValue}
            // onChange={(e, value) => onChange(e.target.parentNode.id, value)}
            onChangeCommitted={(e, value) => 
                onChange(e.target.parentNode.id, value)}
            // marks={Object.keys(marks).map(k => ({ value: k, label: marks[k] }))}
            marks={marks?.map(v => 
                ({ "label": `${v*factor}${suffix}`, "value": v })) }
            valueLabelDisplay="auto"
            color="primary"
            aria-labelledby="discrete-slider-restrict"
        />
    </div>

const marks = {
    yearsToRetier: [0, 10, 20, 30, 40, 50],
    initialInvestment: [0, 100, 200e3, 500e3],
    monthlyCash: [0, 500, 1000, 2000, 3000],
    lastYear: [20, 40, 60, 80],
    mean: [0, 7, 20, 50],
    std: [0, 19, 50]
}

const sliders = [
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
        label: value => `Monthly deposits: ${value}`,
        name: "monthlyDeposits",
        min: 0, max: 3000, step: 100,
        marks: [0, 500, 1000, 2000, 3000]
    }, {
        label: value => `Monthly withdrawals: ${value}`,
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

const Form = ({ setState }) => {
    const [input, setInput] = useState(defaultValues)

    useEffect(() => {
        // Use the form initial values to do the first calculation
        handleCalculations()
    }, [])

    const handleChange = (name, value) => {
        // let name = e.target.parentNode.id
        console.log(name, value)
        setInput({ ...input, [name]: value })
    }

    const handleSubmit = e => {
        //console.log(e.target)
        e.preventDefault()
        handleCalculations()
    }

    const handleCalculations = () => {
        let random = { ...input, roiMean: input.roiMean / 100, roiStsdv: input.roiStsdv / 100 }
        let res = runCalculations(random, { ...random, roiStsdv: 0})
        //console.log(res)
        setState(res)
    }

    // console.log('render form')
    // console.log(state.yearsToRetire)
    // console.log(input)
    return (
        <form onSubmit={handleSubmit}
            className="input-form">
            <Subtitle>Scenario parameters</Subtitle>
            {sliders.map(({label, name, min, max, step, marks, factor, suffix}, i) => 
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
            {/* <CustomSlider
                label="Years to retire"
                name="yearsToRetire"
                value={input.yearsToRetire}
                defaultValue={defaultValues.yearsToRetire}
                onChange={handleChange}
                min={0} max={50} step={1}
                marks={marks.yearsToRetire}
            />
            <CustomSlider
                label="Initial investment"
                name="initialInvestment"
                value={input.initialInvestment}
                defaultValue={defaultValues.initialInvestment}
                onChange={handleChange}
                min={0} max={500} step={1}                
                marks={marks.initialInvestment}
                factor={0.001}
                suffix="k"
            />
            <CustomSlider
                label="Monthly deposit"
                name="monthlyDeposits"
                value={input.monthlyDeposits}
                defaultValue={defaultValues.monthlyDeposits}
                onChange={handleChange}
                min={0} max={3000} step={100}                
                marks={marks.monthlyCash}
            />
            <CustomSlider
                label="Monthly withdrawals"
                name="monthlyWithdrawals"
                value={input.monthlyWithdrawals}
                defaultValue={defaultValues.monthlyWithdrawals}
                onChange={handleChange}
                min={0} max={3000} step={100}                
                marks={marks.monthlyCash}
            />
            <CustomSlider
                label="Last year from now"
                name="lastYear"
                value={input.lastYear}
                defaultValue={defaultValues.lastYear}
                onChange={handleChange}
                min={10} max={70} step={1}                
                marks={marks.lastYear}
            />
            <Subtitle>Expected annual returns (normal distribution)</Subtitle>
            <CustomSlider
                label="Mean"
                name="roiMean"
                value={input.roiMean}
                defaultValue={defaultValues.roiMean}
                onChange={handleChange}
                min={0} max={50} step={1}                
                marks={marks.mean}
            />
            <CustomSlider
                label="Standard deviation"
                name="roiStsdv"
                value={input.roiStsdv}
                defaultValue={defaultValues.roiStsdv}
                onChange={handleChange}
                min={0} max={50} step={1}                
                marks={marks.std} 
            /> */}
            <br />
            <button type="submit" name="btn">
                Run experiment
            </button>

        </form>
    )
}

export default Form