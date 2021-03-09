import { useEffect } from 'react'

import Slider, { createSliderWithTooltip } from 'rc-slider'
import "rc-slider/assets/index.css";

import { Subtitle } from './Common'
import { runCalculations } from '../utils'


const defaultValues = {
    initialInvestment: 40000,
    monthlyDeposits: 1000,
    yearsToRetire: 20,
    monthlyWithdrawals: 2000,
    lastYear: 60,
    roiMean: 7,
    roiStsdv: 19
}

const SliderWithTooltip = createSliderWithTooltip(Slider)

const CustomSlider = ({
    label, name, defaultValue = 0, min = 0, max = 100, step = 1,
    marks = null
}) =>
    <div className="input-item">
        <p className="input-label">{label}</p>
        <SliderWithTooltip
            id={name}
            min={min}
            max={max}
            step={step}
            name={name}
            defaultValue={defaultValue}
            marks={marks}
        />
    </div>

const marks = {
    yearsToRetire: { 0: '0', 5: '5', 10: '10', 20: '20', 30: '30', 40: '40', 50: '50' },
    initialInvestment: { 0: '0', 100: '100k', 100: '100k', 500: '500k' },
    monthlyCash: { 0: '0', 500: '500', 1000: '1000', 2000: '2000', 3000: '3000' },
    lastYear: { 10: '10', 30: '30', 50: '50', 70: '70' },
    mean: { 0: '0', 7: '7', 20: '20', 50: '50' },
    std: { 0: '0', 19: '19', 50: '50' }
}

const Form = ({ setState }) => {

    useEffect(() => {
        // Use the form initial values to do the first calculation
        let random = {}
        for (const key in defaultValues) {
            random[key] = parseFloat(defaultValues[key])
        }
        random.roiMean /= 100
        random.roiStsdv /= 100
        let constant = { ...random, roiStsdv: 0 }
        handleCalculations(constant, random)
    }, [])

    const handleChange = e => {
        const elements = e.currentTarget.elements
        let random = {}
        for (const element of elements) {
            random[element.name] = parseFloat(element.value)
        }
        random.roiMean /= 100
        random.roiStsdv /= 100
        let constant = { ...random, roiStsdv: 0 }
        handleCalculations(constant, random)
    }

    const handleSubmit = e => {
        //console.log(e.target)
        e.preventDefault()
        handleChange(e)
    }

    const handleCalculations = (constant, random) => {
        let res = runCalculations(constant, random)
        //console.log(res)
        setState(res)
    }

    console.log('render form')
    return (
        <form onFocus={handleChange} onSubmit={handleSubmit}
            className="input-form">
            <Subtitle>Scenario parameters</Subtitle>
            <CustomSlider
                label="Years to retire"
                name="yearsToRetire"
                defaultValue={defaultValues.yearsToRetire}
                min={0}
                max={50}
                step={1}                
                marks={marks.yearsToRetire}
            />
            <CustomSlider
                label="Initial investment"
                name="initialInvestment"
                defaultValue={defaultValues.initialInvestment}
                min={0}
                max={500}
                step={1}                
                marks={marks.initialInvestment}
            />
            <CustomSlider
                label="Monthly deposit"
                name="monthlyDeposits"
                defaultValue={defaultValues.monthlyDeposits}
                min={0}
                max={3000}
                step={100}                
                marks={marks.monthlyCash}
            />
            <CustomSlider
                label="Monthly withdrawals"
                name="monthlyWithdrawals"
                defaultValue={defaultValues.monthlyWithdrawals}
                min={0}
                max={3000}
                step={100}                
                marks={marks.monthlyCash}
            />
            <CustomSlider
                label="Last year from now"
                name="lastYear"
                defaultValue={defaultValues.lastYear}
                min={10}
                max={70}
                step={1}                
                marks={marks.lastYear}
            />
            <Subtitle>Expected annual returns (normal distribution)</Subtitle>
            <CustomSlider
                label="Mean"
                name="roiMean"
                defaultValue={defaultValues.roiMean}
                min={0}
                max={50}
                step={1}                
                marks={marks.mean}
            />
            <CustomSlider
                label="Standard deviation"
                name="roiStsdv"
                defaultValue={defaultValues.roiStsdv}
                min={0}
                max={50}
                step={1}                
                marks={marks.std}
            />
            <br />
            <button type="submit" name="btn">
                Run experiment
            </button>

        </form>
    )
}

export default Form