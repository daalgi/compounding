import { ResponsiveLine } from '@nivo/line'

import { convertToMoney } from '../utils'


const Chart = ({ data }) => {
    console.log(data)
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
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    // orient: 'bottom',
                    // tickSize: 5,
                    // tickPadding: 5,
                    // tickRotation: 0,
                    // ticks: 5,
                    // tickValues={[2021, 2030, 2050, 2080]}
                    legend: 'transportation',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                // axisLeft={{
                //     orient: 'left',
                //     // tickSize: 5,
                //     // tickPadding: 5,
                //     // tickRotation: 0,
                //     // tickValues={[]}
                //     // legend: 'count',
                //     legendOffset: -40,
                //     legendPosition: 'middle',
                //     color: "white"
                // }}
                // colors={{ scheme: 'nivo' }}
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
                            stroke: "hsl(220, 13%, 20%)",
                            strokeWidth: 1
                        }
                    },
                    crosshair: {
                        line: {
                            stroke: "hsl(220, 13%, 80%)"
                        }
                    }
                }}
                pointSize={0}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
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
