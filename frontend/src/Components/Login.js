import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Login(props) {
    //states in the login component
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory();

    //function for handling submit
    const handleSubmit = (event) => {
        event.preventDefault()
        props.verifyLogin(email, password)
    }

    //push the user to login 
    useEffect(() => {
        if (props.login) {
            history.push('/')
        }

    }, [props.login])
    return (
        <div className="container"
            style={{
                justifyContent: "center",
                backgroundColor: "#ffffff",
                width: "50%",
                marginTop: "10%",
                marginBottom: "10%",
                padding: "5% 2% 5% 2%",
                borderRadius: "2%",
                boxShadow: "0 8px 10px -3px black",
            }}>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div class="form-group">
                    <label for="formGroupExampleInput">Email</label>
                    <input type="text" class="form-control" id="email" placeholder="someone@gmail.com" onChange={(event) => { setEmail(event.target.value) }} />
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Password</label>
                    <input type="password" class="form-control" id="password" onChange={(event) => { setPassword(event.target.value) }} />
                </div>
                <button className="btn btn-primary sm">Submit</button>
                {"  |  "}
                <Link to="/signup" className="btn btn-primary sm">
                    Signup
            </Link>
            </form>
        </div>
    )
}

export default Login
