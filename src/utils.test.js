import {
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
} from './utils'

describe('round', () => {
    it('round(10.33, 1) returns 10.3', () => {
        expect(round(10.33, 1)).toBe(10.3)
    })
    it('round(10.33, 0) returns 10.0', () => {
        expect(round(10.33, 0)).toBe(10.0)
    })
    it('round(10.33, 3) returns 10.33', () => {
        expect(round(10.33, 3)).toBe(10.33)
    })
    it('round(10, 3) returns 10.000', () => {
        expect(round(10, 3)).toBe(10.0)
    })
})

describe('roundToString', () => {
    it('roundToString(10.33, 1) returns the string "10.3"', () => {
        expect(roundToString(10.33, 1)).toBe("10.3")
    })
    it('roundToString(10.33, 0) returns the string "10"', () => {
        expect(roundToString(10.33, 0)).toBe("10")
    })
    it('roundToString(10.33, 3) returns the string "10.330"', () => {
        expect(roundToString(10.33, 3)).toBe("10.330")
    })
    it('roundToString(10, 3) returns the string "10.000"', () => {
        expect(roundToString(10, 3)).toBe("10.000")
    })
    it('roundToString(10, 0) returns the string "10.000"', () => {
        expect(roundToString(10, 0)).toBe("10")
    })
})

describe('convertToMoney', () => {
    it('convertToMoney(100, 1) = "100.1"', () => {
        expect(convertToMoney(100, 1)).toBe("100.0")
    })
    it('convertToMoney(1000, 1) = "1.0k"', () => {
        expect(convertToMoney(1000, 1)).toBe("1.0k")
    })
    it('convertToMoney(1e5, 0) = "100k"', () => {
        expect(convertToMoney(1e5, 0)).toBe("100k")
    })
    it('convertToMoney(1e6, 0) = "1M"', () => {
        expect(convertToMoney(1e6, 0)).toBe("1M")
    })
    it('convertToMoney(8.68e6, 0) = "1M"', () => {
        expect(convertToMoney(8.68e6, 1)).toBe("8.7M")
    })
})

describe('convertToPercetage', () => {
    it('convertToPercetage(1, 1) = "100.0%"', () => {
        expect(convertToPercetage(1, 1)).toBe("100.0%")
    })
    it('convertToPercetage(0.0834, 1) = "8.3%"', () => {
        expect(convertToPercetage(0.0834, 1)).toBe("8.3%")
    })
})

describe('random', () => {
    it('returns a random float', () => {
        let arr = []
        let r = random(8, 1)
        expect(typeof r).toBe('number')
    })

    it('1e4 random numbers mean is close to the distribution mean', () => {
        let arr = []
        for (let i = 0; i < 10000; i++) {
            arr.push(random(80, 10))
        }
        let mean = arr.reduce((acc, v) => acc + v, 0) / arr.length
        expect(mean).not.toEqual(80)
        expect(mean).toBeCloseTo(80, 0)
    })
})

describe('normalDistribution', () => {
    it('returns the mean and std of a constant array', () => {
        let arr = [1, 1, 1, 1]
        let dist = normalDistribution(arr)
        expect(dist.mean).toEqual(1)
        expect(dist.standardDeviation).toEqual(0)
    })

    it('returns the mean and std of an array', () => {
        let arr = [2, 20, 8, 2]
        let dist = normalDistribution(arr)
        expect(dist.mean).toEqual(8)
        expect(dist.standardDeviation).not.toEqual(0)
    })
})

describe('evalMonth', () => {
    it('returns the expected accumulated invested capital when std equals 0', () => {
        let res = evalMonth({
            accumInvested: 900,
            monthlyInvestment: 100,
            roiMean: 0.01,
            roiStsdv: 0
        })
        expect(res.interest).toEqual(10)
        expect(res.accumInvested).toEqual(1010)
    })
})

describe('evalYear', () => {

    describe('returns the expected accumulated invested capital', () => {
        it('before retirement when std equals 0', () => {
            let initialInvestment = 100
            let monthlyDeposits = 10
            let res = evalYear({
                year: 1,
                yearsToRetire: 10,
                initialInvestment: initialInvestment,
                strategy: {
                    monthlyDeposits: monthlyDeposits,
                    monthlyWithdrawals: 20,
                    roiMean: 0.1,
                    roiStsdv: 0
                }
            })

            expect(res.capitalContributions).toEqual(120)

            let accum = 100
            let monthlyInterest = 0.1 / 12
            for (let i = 0; i < 12; i++) {
                accum = (accum + monthlyDeposits) * (1 + monthlyInterest)
            }
            expect(res.accumInvested).toBeCloseTo(accum, 8)

            let interest = accum - (initialInvestment + monthlyDeposits * 12)
            expect(res.interest).toBeCloseTo(interest, 8)

            let roi = interest / initialInvestment
            expect(res.roi).toBeCloseTo(roi, 8)
        })

        it('after retirement when std equals 0', () => {
            let initialInvestment = 2000
            let monthlyWithdrawals = 20
            let res = evalYear({
                year: 31,
                yearsToRetire: 10,
                initialInvestment: initialInvestment,
                strategy: {
                    monthlyDeposits: 10,
                    monthlyWithdrawals: monthlyWithdrawals,
                    roiMean: 0.1,
                    roiStsdv: 0
                }
            })

            expect(res.capitalContributions).toEqual(-monthlyWithdrawals * 12)

            let accum = 2000
            let monthlyInterest = 0.1 / 12
            for (let i = 0; i < 12; i++) {
                accum = (accum - monthlyWithdrawals) * (1 + monthlyInterest)
            }
            expect(res.accumInvested).toBeCloseTo(accum, 8)

            let interest = accum - (initialInvestment - monthlyWithdrawals * 12)
            expect(res.interest).toBeCloseTo(interest, 8)

            let roi = interest / initialInvestment
            expect(res.roi).toBeCloseTo(roi, 8)
        })

        it('the retirement year when std equals 0', () => {
            let initialInvestment = 2000
            let monthlyWithdrawals = 20
            let res = evalYear({
                year: 10,
                yearsToRetire: 10,
                initialInvestment: initialInvestment,
                strategy: {
                    monthlyDeposits: 10,
                    monthlyWithdrawals: monthlyWithdrawals,
                    roiMean: 0.1,
                    roiStsdv: 0
                }
            })

            expect(res.capitalContributions).toEqual(-monthlyWithdrawals * 12)

            let accum = 2000
            let monthlyInterest = 0.1 / 12
            for (let i = 0; i < 12; i++) {
                accum = (accum - monthlyWithdrawals) * (1 + monthlyInterest)
            }
            expect(res.accumInvested).toBeCloseTo(accum, 8)

            let interest = accum - (initialInvestment - monthlyWithdrawals * 12)
            expect(res.interest).toBeCloseTo(interest, 8)

            let roi = interest / initialInvestment
            expect(res.roi).toBeCloseTo(roi, 8)
        })
    })
})

describe('evalScenario', () => {

    describe('returns the expected accumulated invested capital', () => {
        it('when std equals 0', () => {
            let res = evalScenario({
                yearsToRetire: 10,
                initialInvestment: 10000,
                monthlyDeposits: 100,
                monthlyWithdrawals: 150,
                roiMean: 0.1,
                roiStsdv: 0,
                lastYear: 25
            })

            expect(res.retirementStart.year)
                .toEqual(new Date().getFullYear() + 10)
            expect(res.capital.deposited).toEqual(10000 + 100 * 12 * 10)
            expect(res.capital.withdrawn).toEqual(150 * 12 * 15)

            expect(res.annualRes.length).toEqual(25)

        })

        it('when std equals 0 and lastYear is 100', () => {
            let res = evalScenario({
                yearsToRetire: 10,
                initialInvestment: 10000,
                monthlyDeposits: 100,
                monthlyWithdrawals: 150,
                roiMean: 0.1,
                roiStsdv: 0,
                lastYear: 100
            })

            expect(res.retirementStart.year)
                .toEqual(new Date().getFullYear() + 10)
            expect(res.capital.deposited).toEqual(10000 + 100 * 12 * 10)
            expect(res.capital.withdrawn).toEqual(150 * 12 * 90)

            expect(res.annualRes.length).toEqual(100)

        })
    })
})