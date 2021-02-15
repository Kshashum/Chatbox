import React from 'react'
import { NavLink } from 'react-router-dom'

function Nav(props) {
    let button
    if (props.login) {
        button = <NavLink to="/">
            <button className="btn btn-primary" onClick={props.logout}>
                Logout
    </button>
        </NavLink>
    }
    else {
        button = <NavLink to="/login">
            <button className="btn btn-primary" >
                Login
    </button>
        </NavLink>
    }
    return (
        <nav style={{ marginTop: "1%" }}>
            <NavLink to="/">
                <button className="btn btn-primary">
                    Home
            </button>
            </NavLink>
            {" | "}
            {button}
        </nav>
    )
}

export default Nav
