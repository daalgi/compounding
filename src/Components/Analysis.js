import { Subtitle } from './Common'
import { convertToMoney, convertToPercetage } from '../utils'


const InfoCard = ({
    title,
    info = []
}) =>
    <div className="results-card">
        <Subtitle>{title}</Subtitle>
        {info.map((item, index) =>
            typeof item === "string"
                ? <p key={index}>{item}</p>
                : <p {...item} key={index}>{item.text}</p>
        )}
    </div>

const Analysis = ({ state }) => {
    // console.log(state.lastYear.normalDistribution)
    return (
        <div className="cards-container">
            <InfoCard
                title="1000 random simulations"
                info={[
                    { variant: "subtitle1", text: `Your investment in ${state.lastYear.year}:` },
                    // `- Mean: ${convertToMoney(state.lastYear.normalDistribution.mean)}`,
                    // `- Standard deviation: ${convertToMoney(state.lastYear.normalDistribution.standardDeviation)}`,
                    `- ${convertToPercetage(state.probabilities.noBankrupcy)} probability of still having money`,
                    `- ${convertToPercetage(state.probabilities.lastYearGEdeposited)} probability of having at least ${convertToMoney(state.lastYear.deposited)} (your deposits)`
                ]}
            />
            <InfoCard
                title="Scenario Analysis"
                info={[
                    `Total deposits: ${convertToMoney(state.lastYear.deposited)}`,
                    `Total withdrawals: ${convertToMoney(state.lastYear.withdrawn)}`,
                    `Withdrawals in the first year of retirement (${state.retirementStart.year}): ${convertToMoney(state.scenario.yearlyWithdrawals)}`,
                    { variant: "subtitle1", text: "Constant returns hypothesis:" },
                    `- Retirement (${state.retirementStart.year}): 
                    ${convertToMoney(state.retirementStart.constant)}`,
                    `- Gains during the first year in retirement: 
                    ${convertToMoney(1e3 * state.retirementStart.firstYearGains)}`,
                    `- Last year (${state.lastYear.year}): 
                    ${convertToMoney(state.lastYear.constant)}`,
                    state.yearBankrupcy.constant ? `- No money left in ${state.yearBankrupcy.constant}` : "",
                    { variant: "subtitle1", text: "One random simulation:" },
                    `- Retirement (${state.retirementStart.year}): 
                    ${convertToMoney(state.retirementStart.random)}`,
                    `- Last year (${state.lastYear.year}): 
                    ${convertToMoney(state.lastYear.random)}`,
                    state.yearBankrupcy.random ? `- No money left in ${state.yearBankrupcy.random}` : "",
                ]}

            />
        </div>
    )
}

export default Analysis