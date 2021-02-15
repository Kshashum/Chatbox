import React, { useState } from 'react'
import Ts from './toast'
import { Container, Col, Row, InputGroup, FormControl, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
function Home(props) {
    //state
    const [msg, setMsg] = useState("")
    //handle function
    const handleMsg = (event) => {
        event.preventDefault()
        props.msgToDB(msg)
    }
    //only loged in  users can post messages
    let btn
    if (props.login) {
        btn = <Button className="btn btn-primary" type="submit">Send</Button>
    }
    else {
        btn = <NavLink to='/login'> <Button className="btn btn-primary">Login to Send</Button></NavLink>
    }

    return (
        <Container style={{ margin: "4% 3% 3% " }} fluid={true}>
            <Row>
                <Col>
                    <div style={{ overflowY: 'auto', maxWidth: "80%", height: "500px" }}>
                        {props.messages.map((res, index) => {
                            return <Ts res={res} key={index} />
                        })}
                    </div>
                </Col>
                <Col>
                    <form onSubmit={(event) => handleMsg(event)}>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Hi Amigos DB Design is Fun!"
                                aria-describedby="basic-addon2"
                                value={msg}
                                onChange={(event) => setMsg(event.target.value)}
                            />
                            <InputGroup.Append>
                                {btn}
                            </InputGroup.Append>
                        </InputGroup>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default Home
