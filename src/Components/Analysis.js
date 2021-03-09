import { Subtitle } from './Common'
import { convertToK, convertToPercetage } from '../utils'


const InfoCard = ({
    title,
    info = []
}) =>
    <div className="results-card">
        <Subtitle >{title}</Subtitle>
        {info.map((item, index) =>
            typeof item === "string"
                ? <p key={index}>{item}</p>
                : <p {...item} key={index}>{item.text}</p>
        )}
    </div>

const Analysis = ({ state }) => {
    //console.log(state)
    return (
        <div className="">
            <InfoCard
                title="1000 random simulations"
                info={[
                    //`Mean: ${convertToK(state.lastYear.normalDistribution.mean)}`,
                    //`Standard deviation: ${convertToK(state.lastYear.normalDistribution.standardDeviation)}`,
                    `${convertToPercetage(state.probabilities.noBankrupcy)} of probability of still having money in ${state.lastYear.year}`,
                ]}
            />
            <InfoCard
                title="Scenario Analysis"
                info={[
                    `Deposits: ${convertToK(state.lastYear.deposited)}`,
                    `Withdrawals: ${convertToK(state.lastYear.withdrawn)}`,
                    { variant: "subtitle1", text: "Constant returns hypothesis:" },
                    `- Retirement (${state.retirementStart.year}): 
                    ${convertToK(state.retirementStart.constant)}`,
                    `- Last year (${state.lastYear.year}): 
                    ${convertToK(state.lastYear.constant)}`,
                    state.yearBankrupcy.constant ? `- No money left in ${state.yearBankrupcy.constant}` : "",
                    { variant: "subtitle1", text: "One random simulation:" },
                    `- Retirement (${state.retirementStart.year}): 
                    ${convertToK(state.retirementStart.random)}`,
                    `- Last year (${state.lastYear.year}): 
                    ${convertToK(state.lastYear.random)}`,
                    state.yearBankrupcy.random ? `- No money left in ${state.yearBankrupcy.random}` : "",
                ]}

            />
        </div>
    )
}

export default Analysis