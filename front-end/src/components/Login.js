import React, { useEffect, useState } from 'react';
import axios from 'axios'
import '../App.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState(false);

    const navigate = useNavigate();

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
                    userAuthentication()
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
        navigate('/dashboard')
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
        <section className='vh-100 bg-light'>
            <div className='container py-5 h-100'>
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className='card shadow-2-strong'>
                            <div className="card-body p-5 text-center">
                                <div className='login'>
                                    <h1>Login</h1>
                                    <div className="mb-3">
                                        <label for="inputName" className="form-label">Username</label>
                                        <input type="text" className="form-control" id="inputName" aria-describedby="inputName"  onChange={(e) => {
                                        setUsername(e.target.value);}} />
                                    </div>
                                    <div class="mb-3">
                                        <label for="inputPassword" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="inputPassword" onChange={(e) => {
                                        setPassword(e.target.value);
                                    }} />
                                    </div>

                                    <div className='d-grid'>
                                        <div className='btn btn-primary' onClick={login}>Login</div>
                                    </div>
                                </div>

                                {/* {loginStatus && <button onClick={userAuthentication}>Check Authentication</button>} */}


                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )

}