import React from 'react'
import { Toast } from 'react-bootstrap'
//Toast Component
function Ts(res) {
    return (
        <Toast>
            <Toast.Header closeButton={false}>
                <strong className="mr-auto">{res.res.userName}</strong>
                <small xs>{res.res.dt}</small>
            </Toast.Header>
            <Toast.Body>{res.res.Content}</Toast.Body>
        </Toast>
    )
}

export default Ts
