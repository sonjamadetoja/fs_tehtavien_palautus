import { forwardRef, useImperativeHandle, useState } from "react"

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenvisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return { toggleVisibility }
    })

    return (
        <div>
            <div style={hideWhenvisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

export default Togglable