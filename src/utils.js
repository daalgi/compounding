const NUM_SIMULATIONS = 1000

// FUNCTIONS TO SHOW NUMERIC RESULTS

/**
 * Returns a rounded number
 * @param {float} value 
 * @param {integer} decimals 
 */
const round = (value, decimals = 1) =>
    Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)

/**
 * Returns a string with the number rounded
 * @param {float} value 
 * @param {integer} decimals 
 */
const roundToString = (value, decimals = 1) => {
    // Round the number and make sure it's a float (with decimal point)
    let rounded = parseFloat(round(value, decimals))
    
    if (decimals === 0)
        return parseInt(rounded).toString()
    
    let roundedDecimals = rounded % 1 === 0 
        ? 0 
        : rounded.toString().split('.')[1].length
    
    if (roundedDecimals === 0) 
        return rounded.toString() + '.' + Array(decimals-roundedDecimals).fill('0').join('')

    if (roundedDecimals < decimals)
        return rounded.toString() + Array(decimals-roundedDecimals).fill('0').join('')
    
    return rounded.toString()
}

/**
 * Returns a string with the rounded amount of money using 
 * a suffix (k or M) if the value is in the order of thousands or millions
 * @param {float} value 
 * @param {integer} decimals 
 */
const convertToMoney = (value, decimals = 1) => {
    if (value < 1000)
        return roundToString(value, decimals)
    if (value < 1e6)
        return roundToString(value / 1e3, decimals) + 'k'
        return roundToString(value / 1e6, decimals) + 'M'
}

/**
 * Returns a string with the amount of money using a suffix (k or M) 
 * if needed the value is in the order of thousands or millions.
 * Example: convertToPercetage(0.88, 1) = "88%"
 * @param {float} value 
 * @param {integer} decimals 
 */
const convertToPercetage = (value, decimals = 0) =>
    roundToString(value * 100, decimals) + '%'


// FUNCTIONS TO HANDLE RANDOM NUMBERS

/**
 * Marsaglia polar method to generate random gaussian numbers
 * @param {float} mean 
 * @param {float} stdDev standard deviation
 */
const random = (mean, stdDev) => {
    let u, v, s
    do {
        u = Math.random() * 2 - 1
        v = Math.random() * 2 - 1
        s = u * u + v * v
    } while (s >= 1 || s === 0)
    s = Math.sqrt(-2.0 * Math.log(s) / s)

    return mean + stdDev * u * s
}

/**
 * Returns an object { mean, standardDeviation }
 * of the normal distribution of the array of numbers `arr`
 * @param {Array} arr 
 */
const normalDistribution = arr => {
    const n = arr.length
    if (n > 0) {
        const m = arr.reduce((acc, v) => acc + v) / n
        return {
            mean: m,
            standardDeviation: Math.sqrt(arr
                .map(x => Math.pow(x - m, 2))
                .reduce((acc, v) => acc + v) / n)
        }
    }
    return {}
}


// FUNCTIOS TO EVALUATE THE INVESTMENT EVOLUTION

const evalMonth = ({
    accumInvested,
    monthlyInvestment,
    roiMean,
    roiStsdv
}) => {
    const roi = roiStsdv === 0 ? roiMean : random(roiMean, roiStsdv)
    accumInvested += monthlyInvestment
    //console.log(accumInvested, monthlyInvestment, roi)
    const interest = accumInvested * roi
    return {
        roi,
        interest,
        accumInvested: accumInvested + interest
    }
}

const evalYear = ({
    year,
    yearsToRetire,
    initialInvestment,
    strategy
}) => {
    let { monthlyDeposits, monthlyWithdrawals, roiMean, roiStsdv } = strategy
    if (initialInvestment <= 0)
        return {
            year,
            accumInvested: 0
        }
    let accumInvested = initialInvestment
    let arr = []
    let monthlyInvestment = year < yearsToRetire
        ? monthlyDeposits
        : -monthlyWithdrawals
    roiMean /= 12
    roiStsdv /= Math.sqrt(12)
    for (let i = 0; i < 12; i++) {
        let month = evalMonth({ accumInvested, monthlyInvestment, roiMean, roiStsdv })
        accumInvested = month.accumInvested
        arr.push(month)
    }
    let obj = {
        year,
        capitalContributions: 12 * monthlyInvestment,
        accumInvested: accumInvested < 0 ? 0 : accumInvested
    }
    obj.interest = accumInvested - initialInvestment - obj.capitalContributions
    obj.roi = (accumInvested - 12 * monthlyInvestment) / initialInvestment - 1
    //console.log(arr)
    return obj
}

const evalScenario = scenario => {
    let {
        yearsToRetire, initialInvestment,
        monthlyDeposits, monthlyWithdrawals,
        roiMean, roiStsdv, lastYear } = scenario
    let year = 1
    let annualRes = []
    let accumInvested = initialInvestment
    let yearBankrupcy = null

    while (year <= lastYear) {

        let y = evalYear({
            year,
            yearsToRetire,
            initialInvestment: accumInvested,
            strategy: {
                monthlyDeposits, monthlyWithdrawals,
                roiMean, roiStsdv
            }
        })

        if (!yearBankrupcy && accumInvested === 0)
            yearBankrupcy = year

        annualRes.push(y)
        accumInvested = y.accumInvested

        year++
    }

    return {
        retirementStart: {
            year: new Date().getFullYear() + yearsToRetire,
            accumInvested: annualRes[Math.max(yearsToRetire - 1, 0)].accumInvested
        },
        yearBankrupcy,
        annualRes,
        capital: {
            deposited: initialInvestment + monthlyDeposits * 12 * yearsToRetire,
            withdrawn: monthlyWithdrawals * 12 * (lastYear - yearsToRetire),
            lastYear: annualRes[annualRes.length - 1].accumInvested
        },
        roi: {
            mean: annualRes.reduce((acc, o) => acc + o.roi, 0) / annualRes.length,
            minimum: Math.min(...annualRes.map(o => o.roi)),
            maximum: Math.max(...annualRes.map(o => o.roi))
        }
    }
}

const runAnalysis = (constant, random) => {
    let lastYear = constant.yearsToRetire + constant.yearsInRetirement
    constant.lastYear = lastYear
    const constantSimulation = evalScenario({ ...constant })

    random.lastYear = lastYear
    const randomSimulation = evalScenario({ ...random })

    let lastYearCapital = []
    for (let i = 0; i < NUM_SIMULATIONS; i++) {
        lastYearCapital.push(evalScenario({ ...random }).capital.lastYear)
    }
    let thisYear = new Date().getFullYear()
    let plotData = constantSimulation.annualRes.map((v, i) =>
    ({
        year: v.year + thisYear,
        constant: v.accumInvested / NUM_SIMULATIONS,
        random: randomSimulation.annualRes[i].accumInvested / NUM_SIMULATIONS
    })
    )

    return {
        scenario: {
            initialInvestment: constant.initialInvestment,
            monthlyDeposits: constant.monthlyDeposits,
            monthlyWithdrawals: constant.monthlyWithdrawals,
            yearlyWithdrawals: constant.monthlyWithdrawals * 12
        },
        retirementStart: {
            year: constantSimulation.retirementStart.year,
            constant: constantSimulation.retirementStart.accumInvested,
            random: randomSimulation.retirementStart.accumInvested,
            firstYearGains: plotData[constant.yearsToRetire].constant - plotData[constant.yearsToRetire-1].constant
        },
        lastYear: {
            year: thisYear + constant.lastYear,
            deposited: constantSimulation.capital.deposited,
            withdrawn: constantSimulation.capital.withdrawn,
            constant: constantSimulation.capital.lastYear,
            random: randomSimulation.capital.lastYear,
            normalDistribution: normalDistribution(lastYearCapital)
        },
        yearBankrupcy: {
            constant: constantSimulation.yearBankrupcy && (
                thisYear + constantSimulation.yearBankrupcy),
            random: randomSimulation.yearBankrupcy && (
                thisYear + randomSimulation.yearBankrupcy),
        },
        probabilities: {
            noBankrupcy: lastYearCapital.reduce((acc, y) =>
                y > 0
                    ? acc + 1
                    : acc, 0
            ) / lastYearCapital.length,
            lastYearGEdeposited: lastYearCapital.reduce((acc, y) =>
                y >= constantSimulation.capital.deposited
                    ? acc + 1
                    : acc, 0
            ) / lastYearCapital.length
        },
        plotData,
    }
}


export {
    round,
    roundToString,
    convertToMoney,
    convertToPercetage,

    random,
    normalDistribution,

    evalMonth,
    evalYear,
    evalScenario,
    runAnalysis
}