import React from 'react'

import { Group } from '@vx/group'
import { Grid } from '@vx/grid'
import { scaleLinear } from '@vx/scale'
import { AreaClosed, LinePath, Line } from '@vx/shape'
import { AxisLeft, AxisBottom } from '@vx/axis'
import { LinearGradient } from '@vx/gradient'
//import { useTooltip, Tooltip } from '@vx/tooltip'
import { ParentSize, ScaleSVG } from '@vx/responsive'
import { localPoint } from '@vx/event'
import { curveLinear } from 'd3'
import { max, min } from 'd3-array'


const labelColor = 'hsl(0, 0%, 80%)'

const SvgChart = ({ data, x, series, width, height }) => {

    const xAccessor = d => d[x]
    const yAccessor = (d, serie) => d[serie]

    const margin = {
        top: 16,
        bottom: 64,
        left: 64,
        right: 32,
    }
    const xMax = width - margin.left - margin.right
    const yMax = height - margin.top - margin.bottom
    //console.log(data[])
    const xScale = scaleLinear({
        range: [0, xMax],
        domain: [min(data, xAccessor), max(data, xAccessor)],
    })

    /*const yValues = series.reduce((acc, s) =>
        [...acc, ...data.map(item => item[s])],
        [])*/
    //console.log(width, height, series)
    const yValues = data.map(d => d[series[0]])
    const yScale = scaleLinear({
        range: [yMax, 0],
        domain: [0, Math.max(...yValues) * 1.5],
    })

    /*const {
        tooltipData,
        tooltipLeft,
        tooltipTop,
        tooltipOpen,
        showTooltip,
        hideTooltip,
    } = useTooltip()*/

    //console.log(classes)

    const handleTooltip = (event) => {
        //console.log(event)
        const coords = localPoint(event.event);
        /*const x0Interpolation = xScale.invert(coords.x);
        /*const arrX = data.map(d => d[x])
        const x0 = arrX.reduce((prev, curr) =>
            Math.abs(curr - x0Interpolation) < Math.abs(prev - x0Interpolation)
                ? curr
                : prev
        )*/
        /*const index = bisector(d => d[x]).left(data, x0Interpolation, 1)
        //const index = arrX.indexOf(x0)
        const d0 = data[index - 1];
        const d1 = data[index];*/
        /*let d = d0;
        if (d1 && d1.year) {
            d = x0 - xAccessor(d0[x]) > xAccessor(d1[x]) - x0 ? d1 : d0;
        }*/
        //console.log(coords.x, x0, index, d0, d1)
        /*showTooltip({
            tooltipData: null,//"1",//d0,
            tooltipLeft: coords.x,
            tooltipTop: yScale(height/2)
        })*/
    }
    console.log('render chart')
    return (

        <svg width={width} height={height}>
            <LinearGradient
                from='green'
                to='black'
                id='gradient'
            />
            <Group top={margin.top} left={margin.left}>

                <Grid
                    xScale={xScale}
                    yScale={yScale}
                    width={xMax}
                    height={yMax}
                    stroke="gray"
                    opacity="0.5"
                    strokeWidth="0.5"
                />
                <Line
                    from={{ x: 0, y: 0 }}
                    to={{ x: xMax, y: 0 }}
                    stroke={labelColor}
                    strokeWidth={1}
                />
                <Line
                    from={{ x: xMax, y: 0 }}
                    to={{ x: xMax, y: yMax }}
                    stroke={labelColor}
                    strokeWidth={1}
                />
                <AreaClosed
                    data={data}
                    yScale={yScale}
                    x={d => xScale(xAccessor(d))}
                    y={d => yScale(yAccessor(d, series[0]))}
                    fill={"url(#gradient)"}
                    opacity="0.3"
                />
                <LinePath
                    data={data}
                    curve={curveLinear}
                    x={d => xScale(xAccessor(d))}
                    y={d => yScale(yAccessor(d, series[1]))}
                    stroke="white"
                    strokeWidth="3"
                />
                <AxisLeft
                    scale={yScale}
                    hideZero
                    top={0}
                    left={0}
                    label="Investment"
                    labelProps={{
                        fill: labelColor,
                        textAnchor: 'middle',
                        fontSize: 16,
                        fontFamily: "sans-serif"
                    }}
                    stroke={labelColor}
                    strokeWidth={1}
                    tickTextFill={labelColor}
                    tickStroke="none"
                    tickFormat={v => `${v}k`}
                    //labelClassName={classes.axisLabel}
                    tickLabelProps={_ => ({ fill: labelColor, textAnchor: 'end' })}
                />

                <AxisBottom
                    scale={xScale}
                    top={yMax}
                    label='Year'
                    labelProps={{
                        fill: labelColor,
                        textAnchor: 'middle',
                        fontSize: 16,
                        fontFamily: "sans-serif"
                    }}
                    stroke={labelColor}
                    strokeWidth={1}
                    tickTextFill={labelColor}
                    tickStroke="none"
                    tickFormat={v => `${v}`}
                    numTicks={width / 86}
                    //labelClassName={classes.axisLabel}
                    tickLabelProps={_ => ({ fill: labelColor, textAnchor: 'middle' })}
                />
                {/*
                        <Bar
                            x={0}
                            y={0}
                            width={width}
                            height={height}
                            fill="transparent"
                            rx={14}
                            data={data}
                            onTouchStart={event =>
                                handleTooltip({
                                    event,
                                    xAccessor,
                                    xScale,
                                    yScale,
                                    data: data
                                })
                            }
                            onTouchMove={event =>
                                handleTooltip({
                                    event,
                                    xAccessor,
                                    xScale,
                                    yScale,
                                    data: data
                                })
                            }
                            onMouseMove={event =>
                                handleTooltip({
                                    event,
                                    xAccessor,
                                    xScale,
                                    yScale,
                                    data: data
                                })
                            }
                            onMouseLeave={event => hideTooltip()}
                        />
                        {tooltipData && (
                            <g>
                                <Line
                                    from={{ x: tooltipLeft, y: height - margin.bottom }}
                                    to={{ x: tooltipLeft, y: tooltipTop }}
                                    stroke="rgba(92, 119, 235, 1.000)"
                                    strokeWidth={2}
                                    style={{ pointerEvents: 'none' }}
                                    strokeDasharray="2,2"
                                />
                                <Line
                                    from={{ x: 0, y: tooltipTop }}
                                    to={{ x: tooltipLeft, y: tooltipTop }}
                                    stroke="rgba(92, 119, 235, 1.000)"
                                    strokeWidth={2}
                                    style={{ pointerEvents: 'none' }}
                                    strokeDasharray="2,2"
                                />
                                <circle
                                    cx={tooltipLeft}
                                    cy={tooltipTop + 1}
                                    r={4}
                                    fill="black"
                                    fillOpacity={0.1}
                                    stroke="black"
                                    strokeOpacity={0.1}
                                    strokeWidth={2}
                                    style={{ pointerEvents: 'none' }}
                                />
                                <circle
                                    cx={tooltipLeft}
                                    cy={tooltipTop}
                                    r={4}
                                    fill="rgba(92, 119, 235, 1.000)"
                                    stroke="white"
                                    strokeWidth={2}
                                    style={{ pointerEvents: 'none' }}
                                />

                            </g>
                        )}

                            */}
            </Group>
        </svg>
    )
}

const Chart = ({
    data, x, series,
    width,
    height,
    classes
}) =>
    <ScaleSVG width={width} height={height}
    //className={classes.flex}
    >
        <SvgChart
            data={data} x={x} series={series}
            width={width}
            height={height}
        />
    </ScaleSVG>



export default Chart
/*

    <ParentSize>
        {parent => {
            console.log(parent)
            return (
                < SvgChart
                    data={data} x={x} series={series}
                    width={width}
                    height={height}
                />
            )
        }

        }
    </ParentSize>


  <ParentSize>
      {(width, height) => <LineRadial width={width} height={height} />}
    </ParentSize>


        <ScaleSVG width={width} height={height}
        //className={classes.flex}
    >
        <SvgChart
            data={data} x={x} series={series}
            width={width > 400 ? 800: 200}
            height={width > 400 ? 500: 150}
        />
    </ScaleSVG>


<ScaleSVG width={width} height={height}
     className={classes.contentMaxWidth}
    >
        <SvgChart
            data={data} x={x} series={series}
            width={500} height={500}
        />
    </ScaleSVG>




*/