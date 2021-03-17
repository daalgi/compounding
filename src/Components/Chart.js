import { ResponsiveLine } from '@nivo/line'

import { convertToMoney } from '../utils'


/*
TODO check when @nivo and react-spring fix the issue with the tooltip

https://github.com/plouc/nivo/issues/1290
"We switched to react-spring v9 and it is an issue there. 
We won't be able to fix it until they release a new version. 
There are some workarounds you can try in your project. pmndrs/react-spring#1078"
*/

const Tooltip = ({ index, data }) => {
    index %= data.length
    return(
        <div className="tooltip">
            <p>Year {data[index].year}</p>
            <p>Constant returns: {convertToMoney(1e3 * data[index].constant)}</p>
            <p>Random returns: {convertToMoney(1e3 * data[index].random)}</p>
        </div>
    )
}


const Chart = ({ data, years }) => {
    // console.log(data)
    return (
        <div className="chart">
            <ResponsiveLine
                data={[
                    {
                        id: "constant", color: "hsl(18, 13%, 20%)",
                        data: data.map(item => ({ x: item.year, y: item.constant }))
                    }, {
                        id: "random", color: "hsl(8, 13%, 20%)",
                        data: data.map(item => ({ x: item.year, y: item.random }))
                    },
                ]}
                margin={{ top: 32, right: 32, bottom: 64, left: 40 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                yFormat=" >-.2f"
                tooltip={({ point }) => <Tooltip index={point.index} data={data} />}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickValues: [years.this, years.retirement, years.last],
                    legend: 'year',
                    legendOffset: 30,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    orient: 'left',
                    // legend: 'Money [k]',
                    // legendOffset: -48,
                    legendPosition: 'middle',
                    color: "white"
                }}
                theme={{
                    //['grid', 'markers', 'axes', 'areas', 'crosshair', 'lines', 'points', 'slices', 'mesh', 'legends'
                    background: "hsl(220, 13%, 18%)",
                    textColor: "white",
                    fontSize: 11,
                    axis: {
                        domain: {
                            line: {
                                stroke: "hsl(220, 13%, 80%)",
                                strokeWidth: 1
                            }
                        },
                        ticks: {
                            line: {
                                stroke: "hsl(220, 13%, 30%)",
                                strokeWidth: 1
                            }
                        }
                    },
                    grid: {
                        line: {
                            stroke: "hsl(220, 13%, 23%)",
                            strokeWidth: 1
                        }
                    },
                    crosshair: {
                        line: {
                            stroke: "hsl(220, 13%, 80%)"
                        }
                    },
                    tooltip: {
                        container: {
                            background: "hsl(220, 13%, 23%)",
                            color: "white"
                        }
                    }
                }}
                pointSize={0}
                useMesh={true}
                legends={[
                    {
                        anchor: 'top-left',
                        direction: 'row',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    )
}

export default Chart
