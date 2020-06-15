import React, {useState} from 'react';
import { Message } from 'semantic-ui-react'


const Alert = props => {
    let [visible, setVisible] = useState(true)

    const handleDismiss = (e, data) => {

        //clear message state
        // props.setMessage(null)
        // setVisible(false)
        console.log('e:', e, data)
        // setTimeout(() => {
        //     setVisible(true, 2000)
        // })
        console.log('duck')
    }

    if (props.message) {
        // setVisible(true)
        return (
            <Message negative visible={true} onDismiss={(e, data) => handleDismiss} content={props.message}/>
        )
    }
    return null
    
}

export default Alert