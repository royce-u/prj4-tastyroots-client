import React, {useState} from 'react';
import { Message } from 'semantic-ui-react'


const Alert = props => {
    let [visible, setVisible] = useState(true)

    const handleDismiss = (e) => {
        //clear message state
        // props.setMessage(null)
        setVisible(false)
        // console.log('e:', e)
        setTimeout(() => {
            setVisible(true, 2000)
        })
    }

    if (props.message) {
        // setVisible(true)
        return (
            <Message negative visible={true} onDismiss={(e) => handleDismiss} content={props.message}/>
        )
    }
    return null
    
}

export default Alert