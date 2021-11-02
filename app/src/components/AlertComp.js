import React from 'react'
import { Alert } from 'react-bootstrap'

function AlertComp(props){
    return(
        <div>
            <Alert show={props.bool} variant={props.variant}>
                <p>
                    {props.p}
                </p>
            </Alert>
        </div>
    )
}

export default AlertComp;