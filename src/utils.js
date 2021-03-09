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
    for (let i = 1; i <= 12; i++) {
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
    if (!lastYear) lastYear = 50
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

        if (!yearBankrupcy && accumInvested == 0)
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

const runCalculations = (constant, random) => {
    const constantSimulation = evalScenario({ ...constant })
    const randomSimulation = evalScenario({ ...random })
    let lastYearCapital = []
    for (let i = 0; i < 1000; i++) {
        lastYearCapital.push(evalScenario({ ...random }).capital.lastYear)
    }
    let plotData = constantSimulation.annualRes.map((v, i) =>
        ({
            year: v.year + (new Date().getFullYear()),
            constant: v.accumInvested / 1000,
            random: randomSimulation.annualRes[i].accumInvested / 1000
        })
    )

    return {
        retirementStart: {
            year: constantSimulation.retirementStart.year,
            constant: constantSimulation.retirementStart.accumInvested,
            random: randomSimulation.retirementStart.accumInvested,
        },
        lastYear: {
            year: new Date().getFullYear() + constant.lastYear,
            deposited: constantSimulation.capital.deposited,
            withdrawn: constantSimulation.capital.withdrawn,
            constant: constantSimulation.capital.lastYear,
            random: randomSimulation.capital.lastYear,
            normalDistribution: normalDistribution(lastYearCapital)
        },
        yearBankrupcy: {
            constant: constantSimulation.yearBankrupcy && (
                new Date().getFullYear() + constantSimulation.yearBankrupcy),
            random: randomSimulation.yearBankrupcy && (
                new Date().getFullYear() + randomSimulation.yearBankrupcy),
        },
        probabilities: {
            noBankrupcy: lastYearCapital.reduce((acc, y) => y > 0 ? acc + 1 : acc, 0) / lastYearCapital.length
        },
        plotData,
    }
}

const convertToK = (value, decimals = 1) =>
    `${Math.round(value / Math.pow(10, 3 - decimals)) / Math.pow(10, decimals)} k`

const convertToPercetage = (value, decimals = 0) =>
    `${Math.round(value * Math.pow(10, 2+decimals)) / Math.pow(10, decimals)}%`

let scenario = {
    yearsToRetire: 10,
    initialInvestment: 30e3,
    monthlyDeposits: 1500,
    monthlyWithdrawals: 1500,
    roiMean: 0.07,
    roiStsdv: 0.10
}
//res = evalYear({ year: 0, yearsToRetire: 10, initialInvestment: 30e3, strategy })
/*res = evalScenario({ yearsToRetire: 10, initialInvestment: 30e3, strategy, lastYear: 50 })
console.log(res)*/
/*res = []
for (let i = 0; i < 100000; i++) {
    res.push(random(0.05, 0.08))
}
console.log(Math.max(...res))
console.log(Math.min(...res))
console.log(res.reduce((acc, val) => acc + val) / res.length)
*/

export { 
    normalDistribution, 
    evalScenario, 
    convertToK, 
    convertToPercetage, 
    runCalculations 
}