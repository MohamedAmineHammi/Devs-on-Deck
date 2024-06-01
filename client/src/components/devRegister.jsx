import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';

const DevRegister = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({ nameError: '', LastNameError: '', emailError: '', passwordError: '', confirm: "" })
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        const newDeveloper = {
            firstName,
            lastName,
            email,
            city,
            password
        }

        if (password !== confirmPassword) {
            setErrors(prev => ({ ...prev, ['confirm']: "Password and Confirm Password do not match" }))
        } else {
            axios.post("http://localhost:3001/api/register", newDeveloper, { withCredentials: true })
                .then(res => {
                    navigate(`/devs/skills/${res.data._id}`);
                })
                .catch(err => {
                    const error = err.response.data
                    console.log(error)
                    setErrors(prev => ({
                        ...prev, ["emailError"]: error.email,
                        ['passwordError']: error.password,
                        ['LastNameError']: error.lastName,
                        ['nameError']: error.firstName
                    }))
                })
        }
    }
    return (
        <div>
            <div className="topnav">
                <Link className="active">DevsOnDeck</Link>
                <Link to={("/devs/login")} className="split">Dev Login</Link>
                <Link to={("/orgs/login")} className="split">Orgs Login</Link>
            </div>
            <h1>Developer Sign Up</h1>

            <h4 className='error'>{errors.confirm}</h4>
            <h4 className='error'>{errors.nameError}</h4>
            <h4 className='error'>{errors.lastNameError}</h4>
            <h4 className='error'>{errors.emailError}</h4>
            <h4 className='error'>{errors.passwordError}</h4>
            <h4 className='error'>{errors.confirmError}</h4>

            <form onSubmit={submitHandler}>
                <TextField label="First Name" value={firstName} variant='outlined' sx={{ m: 1, width: 500 }} onChange={(e) => { setFirstName(e.target.value) }} /><br />
                <TextField label="Last Name" value={lastName} variant='outlined' sx={{ m: 1, width: 500 }} onChange={(e) => { setLastName(e.target.value) }} /><br />
                <TextField label="Email" value={email} variant='outlined' sx={{ m: 1, width: 500 }} onChange={(e) => { setEmail(e.target.value) }} /><br />
                <TextField label="City" value={city} variant='outlined' sx={{ m: 1, width: 500 }} onChange={(e) => { setCity(e.target.value) }} /><br />
                <TextField type='password' label="Password" value={password} variant='outlined' sx={{ m: 1, width: 500 }} onChange={(e) => { setPassword(e.target.value) }} /><br />
                <TextField type='password' label="Confirm" value={confirmPassword} variant='outlined' sx={{ m: 1, width: 500 }} onChange={(e) => { setConfirmPassword(e.target.value) }} /><br />
                <Button variant='contained' color='success' sx={{ m: 1 }} type="submit">Register</Button><br /><br />
                <Link to={("/orgs/register")}>Nee to Sign Up an Organization?</Link>
            </form>
        </div>
    )

}

export default DevRegister;