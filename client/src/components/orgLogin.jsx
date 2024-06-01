import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';

const OrgLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "", fields: "" });
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        const organization = {
            email,
            password
        }
        axios.post("http://localhost:3001/api/orgLogin", organization, { withCredentials: true })
            .then(res => {
                navigate(`/orgs/dashboard/${res.data._id}`);
            })
            .catch(err => {
                const error = err.response.data
                setErrors(prev => ({
                    ...prev, email: error.email,
                    password: error.password,
                    fields: error.fields
                }))
            })
    }
    return (
        <div>
            <div className="topnav">
                <Link className="active">DevsOnDeck</Link>
                <Link to={("/")} className="split">Dev Registration</Link>
                <Link to={("/orgs/register")} className="split">Orgs Registration</Link>
               
            </div>
            <h1>Welcome Back!</h1>
            <h3>Let's find you Some Candidates!</h3>
            <h3 className='error'>{errors.email}</h3>
            <h3 className='error'>{errors.password}</h3>
            <h3 className='error'>{errors.fields}</h3>
            <form onSubmit={submitHandler}>

                <TextField label="Email" variant='outlined' sx={{ m: 1, width: 500 }} onChange={(e) => { setEmail(e.target.value) }} /><br />
                <TextField label="Password" variant='outlined' sx={{ m: 1, width: 500 }} onChange={(e) => { setPassword(e.target.value) }} /><br />
                <Button variant='contained' color='success' sx={{ m: 1 }} type="submit">Log In</Button><br /><br />
                <Link className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" to={("/devs/login")}>Login as a Developer</Link>
            </form>
        </div>
    )
}

export default OrgLogin;