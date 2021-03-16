import { ResponsiveLine } from '@nivo/line'

import { convertToMoney } from '../utils'


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
                margin={{ top: 50, right: 110, bottom: 50, left: 80 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                yFormat=" >-.2f"
                tooltip={({ point }) => <Tooltip index={point.index} data={data} />}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickValues: [years.this, years.retirement, years.last],
                    legend: 'year',
                    legendOffset: 32,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    orient: 'left',
                    legend: 'Money [k]',
                    legendOffset: -52,
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
                        anchor: 'top-center',
                        direction: 'column',
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
