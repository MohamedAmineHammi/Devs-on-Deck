import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';


const AddPosition = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState(null)

  const { id } = useParams()
  const allSkills = ['HTML', 'CSS', 'RUBY', 'PYTHON', 'SQL', 'JAVASCRIPT', 'JAVA',
    'C#', 'GO', 'Django', 'Flask', 'Rails', 'Spring']
  const navigate = useNavigate();

  const HandleClick = (e) => {
    const btn = e.target
    btn.classList.toggle('selected')
    let newArr = skills
    if (newArr.includes(btn.innerText)) {
      newArr = newArr.filter(item => item !== btn.innerText);
    } else {
      newArr.push(btn.innerText)
    }
    setSkills(newArr)
  }

  const submitHandler = () => {
    if (name === "" || skills.length === 0) {
      console.log(name)
      setError('You must fill the fields !')
    } else {

      const newPosition = {
        name,
        description,
        skills
      }
      axios.patch(`http://localhost:3001/api/addPosition/${id}`, newPosition, { withCredentials: true })
        .then(() => {
          navigate(`/orgs/dashboard/${id}`);
        })
        .catch(err => {
          console.log(err)
        })
    }


  }
  return (
    <div>
      <div className="topnav">
        <Link className="active">DevsOnDeck</Link>
        <Link to={("/orgs/login")} className="split">Log Out</Link>
      </div>
      <h1>Add A position</h1>
      <h3 className='error'>{error ? error : ""}</h3>
      <FormControl>
        <TextField label="Name" variant='outlined' sx={{ m: 2 }} onChange={(e) => { setName(e.target.value) }} /><br />
        <TextField label="Description" variant='outlined' sx={{ m: 2 }} onChange={(e) => { setDescription(e.target.value) }} /><br />
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ color: '#383838' }}>Your Skills</h2>
          <div className='select-div'>

            {
              allSkills.map((skill, idx) => (
                <button onClick={HandleClick} className='btn' key={idx}>{skill}</button>
              ))
            }
          </div>
        </div>

        <Stack justifyContent="center" direction="row" spacing={2}>
          <Link to={(`/orgs/dashboard/${id}`)}>
            <Button variant='contained' color='warning' >Cancel</Button>
          </Link>
          <Button onClick={submitHandler} variant='contained' color='success' type="submit">Add Position</Button>
        </Stack>
      </FormControl>
    </div>
  )
}

export default AddPosition