import Slider from '@material-ui/core/Slider'
import { withStyles } from '@material-ui/core/styles'


const StyledSlider = withStyles({
    root: {
        // color: "white"
    },
    track: {
        height: 4,
        backgroundColor: 'hsl(220, 56%, 58%)',
    },
    rail: {
        height: 2,
        opacity: 0.5,
        backgroundColor: 'hsl(0, 0%, 70%)',
    },
    mark: {
        backgroundColor: 'hsl(0, 0%, 50%)',
        // color: 'hsl(0, 0%, 80%)',
        height: 8,
        width: 2,
        marginTop: -3,
    },
    markLabel: {
        color: 'hsl(0, 0%, 70%)',
    },
    markActive: {
        opacity: 1,
        backgroundColor: 'currentColor',
    },
    thumb: {
        backgroundColor: 'hsl(220, 56%, 78%)',
        "&:focus,&:hover,&$active": {
            boxShadow: "inherit"
          }
    },
    // valueLabel: {
    //     '& *': {
    //         backgroundColor: 'hsl(0, 0%, 80%)',
    //         color: 'hsl(0, 0%, 80%)',
    //     },
    // },
})(Slider)

const CustomSlider = ({
    label, name, value, defaultValue = 0, min = 0, max = 100, step = 1,
    marks = null, factor = 1, suffix = "", onChange = null
}) =>
    <div className="input-item">
        {/* <p className="input-label">{label}: {value * factor}{suffix}</p> */}
        <p className="input-label">{label(value)}</p>
        <StyledSlider
            id={name}
            min={min}
            max={max}
            step={step}
            // value={value}
            defaultValue={defaultValue}
            // onChange={(e, value) => onChange(e.target.parentNode.id, value)}
            onChangeCommitted={(e, value) =>
                onChange(e.target.parentNode.id, value)}
            // marks={Object.keys(marks).map(k => ({ value: k, label: marks[k] }))}
            marks={marks?.map(v =>
                ({ "label": `${v * factor}${suffix}`, "value": v }))}
            valueLabelDisplay="auto"
        />
    </div>

export default CustomSlider