import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Nav from './Components/Nav';
import PageNotFound from './Components/Pagenotfound'
import { Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
function App() {
  const [login, setLogin] = useState(false)
  const [messages, setMessages] = useState([])
  const [sent, setSent] = useState(false)
  const [userName, setuserName] = useState("")
  const [register, setRegister] = useState(false)

  //send the the registered user information to the database
  async function registerUser(email, password, userName, name) {
    let body = { username: userName, password: password, email: email, name: name }
    axios.post('http://localhost:5000/api/v1/user', {
      data: body
    }).then((res) => {
      console.log(res.data.mesPosted)
      if (res.data.registered == "True") { setRegister(true) }
    })
      .catch((err) => { console.log(err.response) })
  }

  //function to check the login details
  async function verifyLogin(email, password) {
    axios.get("http://localhost:5000/api/v1/user", {
      params: {
        email: email,
        password: password
      }
    }).then(res => {
      setLogin(res.data.login)
      setuserName(res.data.userName)
    })
      .catch(err => console.log(err))
  }

  //get all the avaliable messages
  useEffect(() => {
    console.log(sent)
    axios.get("http://localhost:5000/api/v1/msg")
      .then(res => { return res.data.result })
      .then((data) => {
        setMessages(data)
      })
      .catch(err => console.log(err))
    setSent(false)
  }, [login, sent])

  //send the message to the database
  async function msgToDB(msg) {
    let body = { userName: userName, Content: msg }
    axios.post('http://localhost:5000/api/v1/msg', {
      data: body
    }).then((res) => {
      console.log(res.data.mesPosted)
      if (res.data.mesPosted == "True") { setSent(true) }
    })
      .catch((err) => { console.log(err.response) })
  }

  //function for loging out the user
  function logout() {
    setLogin(false);
    setuserName("");
  }
  return (
    <div className='container-fluid' style={{
      backgroundColor: "#ffe3ad",
      opacity: "0.8",
      position: "fixed",
      width: "100%",
      height: "100%",
      top: "0px",
      left: "0px",
      zIndex: "1000"
    }}>
      <Nav login={login} logout={logout} />
      <Switch>
        <Route
          path='/'
          exact
          component={() => <Home messages={messages} login={login} msgToDB={msgToDB} />}
        />
        <Route
          path='/login'
          component={() => <Login verifyLogin={verifyLogin} login={login} />}
        />
        <Route
          path='/signup'
          component={() => <Signup registerUser={registerUser} register={register} setRegister={setRegister} />}
        />
      </Switch>
    </div >
  );
}

export default App;
