import {
    AnimatedAxis, // any of these can be non-animated equivalents
    AnimatedGrid,
    AnimatedAreaSeries,
    AnimatedLineSeries,
    XYChart,
    Tooltip,
} from '@visx/xychart'

import { convertToMoney } from '../utils'


const accessors = {
    xAccessor: d => d.year,
    yConstantAccessor: d => d.constant,
    yRandomAccessor: d => d.random
}

const Chart = ({ data }) => {
    // console.log(data)
    return (
        <XYChart height={300} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
            <AnimatedAxis orientation="left" numTicks={4} />
            <AnimatedAxis orientation="bottom" numTicks={4} />
            <AnimatedGrid columns={true} numTicks={4} />
            <AnimatedAreaSeries
                dataKey="Constant returns" data={data}
                xAccessor={accessors.xAccessor}
                yAccessor={accessors.yConstantAccessor}
                fillOpacity={0.1}
            />
            <AnimatedLineSeries
                dataKey="Random returns" data={data}
                xAccessor={accessors.xAccessor}
                yAccessor={accessors.yRandomAccessor}
            />
            <Tooltip
                snapTooltipToDatumX
                snapTooltipToDatumY
                showVerticalCrosshair
                showSeriesGlyphs
                renderTooltip={({ tooltipData, colorScale }) => (
                    <div>
                        <p>{accessors.xAccessor(tooltipData.nearestDatum.datum)}</p>
                        <p>Constant returns: {convertToMoney(1e3 *
                            accessors.yConstantAccessor(tooltipData.nearestDatum.datum)
                        )}</p>
                        <p>Random returns: {convertToMoney(1e3 *
                            accessors.yRandomAccessor(tooltipData.nearestDatum.datum)
                        )}</p>
                    </div>
                )}
            />
        </XYChart>
    )
}

export default Chart