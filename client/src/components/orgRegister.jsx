import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';

const OrgRegister = () => {
  const [orgName, setOrgName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState({
    orgCity: "",
    orgAdress: "",
    orgState: ""
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    firstName: '', lastName: "", orgName
      : '', emailError: '', passwordError: '', confirm: ""
  })
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    const newOrganization = {
      orgName,
      firstName,
      lastName,
      email,
      org,
      password
    }
    if (password !== confirmPassword) {
      setErrors(prev => ({ ['confirm']: "Password and Confirm Password do not match" }))
    } else {
      axios.post("http://localhost:3001/api/orgRegister", newOrganization, { withCredentials: true })
        .then(res => {
          console.log(res)
          const id = res.data._id
          navigate(`/orgs/dashboard/${id}`);
        })
        .catch(err => {
          const error = err.response.data
          setErrors(prev => ({
            ...prev, ["emailError"]: error.email,
            ['passwordError']: error.password,
            ['lastName']: error.lastName,
            ['firstName']: error.firstName,
            ['orgName']: error.orgName,
            ['confirm']: ""
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
      <h1>Organization Sign Up</h1>
      <h4 className='error'>{errors.confirm}</h4>
      <h4 className='error'>{errors.firstName}</h4>
      <h4 className='error'>{errors.lastName}</h4>
      <h4 className='error'>{errors.emailError}</h4>
      <h4 className='error'>{errors.passwordError}</h4>
      <form onSubmit={submitHandler}>
        <TextField label="Org Name" variant='outlined' sx={{ m: 1, width: 500 }} onChange={(e) => { setOrgName(e.target.value) }} /><br />
        <TextField label="First Name" variant='outlined' sx={{ m: 1, width: 500 }} onChange={(e) => { setFirstName(e.target.value) }} /><br />
        <TextField label="Last Name" variant='outlined' sx={{ m: 1, width: 500 }} onChange={(e) => { setLastName(e.target.value) }} /><br />
        <TextField label="Email" variant='outlined' sx={{ m: 1, width: 500 }} onChange={(e) => { setEmail(e.target.value) }} /><br />
        <TextField label="Org Adress" variant='outlined' sx={{ m: 1, width: 500 }} onChange={(e) => { setOrg(prev => ({ ...prev, orgAdress: e.target.value })) }} /><br />
        <TextField label="Org City" variant='outlined' sx={{ m: 1, width: 500 }} onChange={(e) => { setOrg(prev => ({ ...prev, orgCity: e.target.value })) }} /><br />
        <TextField label="Org State" variant='outlined' sx={{ m: 1, width: 500 }} onChange={(e) => { setOrg(prev => ({ ...prev, orgState: e.target.value })) }} /><br />
        <TextField label="Password" variant='outlined' sx={{ m: 1, width: 500 }} onChange={(e) => { setPassword(e.target.value) }} /><br />
        <TextField label="Confirm" variant='outlined' sx={{ m: 1, width: 500 }} onChange={(e) => { setConfirmPassword(e.target.value) }} /><br />
        <Button variant='contained' color='success' sx={{ m: 1 }} type="submit">Register</Button><br /><br />
        <Link to={("/")}>Nee to Sign Up as a Developer?</Link>
      </form>
    </div>
  )
}

export default OrgRegister;