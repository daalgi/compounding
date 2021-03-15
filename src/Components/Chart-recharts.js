import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
} from 'recharts'

import { convertToMoney } from '../utils'


const Chart = ({ data }) => {
    // console.log(data)
    return (
        <div className="chart">
            <ResponsiveContainer width="600px" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 20,
                        right: 50,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {/* <ReferenceLine x="Page C" stroke="red" label="Max PV PAGE" />
                <ReferenceLine y={9800} label="Max" stroke="red" /> */}
                    <Line type="monotone" dataKey="constant" stroke="#8884d8" />
                    {/* <Line type="monotone" dataKey="random" stroke="#82ca9d" /> */}
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart
