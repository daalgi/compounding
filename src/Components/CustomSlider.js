import Slider from '@material-ui/core/Slider'


const CustomSlider = ({
    label, name, value, defaultValue = 0, min = 0, max = 100, step = 1,
    marks = null, factor = 1, suffix = "", onChange = null
}) =>
    <div className="input-item">
        {/* <p className="input-label">{label}: {value * factor}{suffix}</p> */}
        <p className="input-label">{label(value)}</p>
        <Slider
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
            color="primary"
            aria-labelledby="discrete-slider-restrict"
        />
    </div>

export default CustomSlider