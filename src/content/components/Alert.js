import React, {useState} from 'react';
import { Message } from 'semantic-ui-react'


const Alert = props => {
    let [visible, setVisible] = useState(true)

    const handleDismiss = (e) => {
        //clear message state
        // props.setMessage(null)
        setVisible(false)
        return visible
        // console.log('e:', e)

    }

    if (props.message) {
        // setVisible(true)
        return (
            <Message negative visible={visible} onDismiss={(e) => handleDismiss} content={props.message}/>
        )
    }
    return null
    
}

export default Alert