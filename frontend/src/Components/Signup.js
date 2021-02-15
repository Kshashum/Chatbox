import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

function Signup(props) {
    //the states used in the signup functional component
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setuserName] = useState("")
    const [name, setName] = useState("")
    const history = useHistory()

    //send the email, password, userName, name to the app.js, which will send it to the database via axios
    function handleSubmit(event) {
        event.preventDefault()
        props.registerUser(email, password, userName, name)
    }

    //push the user to login page, if the user is registered sucessfully
    useEffect(() => {
        if (props.register == true) {
            history.push('/login')
            props.setRegister(false)
        }
    }, [props.register])

    return (
        <div
            className="container"
            style={{
                justifyContent: "center",
                backgroundColor: "#ffffff",
                width: "50%",
                marginTop: "3%",
                marginBottom: "10%",
                padding: "5% 2% 3% 2%",
                borderRadius: "2%",
                boxShadow: "10px 8px 10px -3px black",
            }}
        >
            <form onSubmit={(event) => { handleSubmit(event) }}>
                <h3>Signup Form</h3>
                <div className="form-group">
                    <label>User Name</label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="username"
                        onChange={(event) => setuserName(event.target.value)}
                    ></input>
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Name"
                        onChange={(event) => setName(event.target.value)}
                    ></input>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        className="form-control"
                        type="email"
                        placeholder="email"
                        onChange={(event) => setEmail(event.target.value)}
                    ></input>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        className="form-control"
                        type="password"
                        placeholder="password"
                        onChange={(event) => setPassword(event.target.value)}
                    ></input>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
