import React, { useEffect, useState } from 'react';
import axios from 'axios'
import '../App.css';

export default function Login() {

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState(false);

    axios.defaults.withCredentials = true
    const register = () => {
        axios.post('http://localhost:3005/users/register', {
            username: usernameReg,
            password: passwordReg
        })
            .then((response) => {
                console.log(response)
            })
    }

    const login = () => {
        axios.post('http://localhost:3005/users/login', {
            username: username,
            password: password
        })
            .then((response) => {

                if (!response.data.auth) {
                    // setLoginStatus(response.data.message)
                    setLoginStatus(false)
                } else {
                    // console.log(response.data)
                    // setLoginStatus(response.data[0].username)
                    localStorage.setItem('token', response.data.token)
                    setLoginStatus(true)
                }
            })
    }

    const userAuthentication = () => {
        axios.get('http://localhost:3005/auth/signin', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
            .then((response) => {
                console.log(response)
            })
    }

    useEffect(() => {
        axios.get('http://localhost:3005/users/login')
            .then((response) => {
                if (response.data.loggedIn === true) {
                    setLoginStatus(response.data.user[0].username)
                }
            })
    }, [])

    return (
        <div className='userLogin'>
            <div className='registration'>
                <h1>Registration</h1>
                <label>Username</label>
                <input type='text' onChange={(e) => {
                    setUsernameReg(e.target.value);
                }} />
                <label>Password</label>
                <input type='text' onChange={(e) => {
                    setPasswordReg(e.target.value);
                }} />
                <button onClick={register}>Register</button>
            </div>
        </div>
    )
}
