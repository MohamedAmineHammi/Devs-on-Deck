import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios'
import { useParams } from 'react-router-dom';
const OrgDashboard = () => {


  const { id } = useParams()
  const [devs, setDevs] = useState([])
  const [org, setOrg] = useState(null)
  const navigate = useNavigate()
  const getDevs = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/getAll', { withCredentials: true })
      setDevs(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getOneOrg = async () => {

    try {
      const res = await axios.get(`http://localhost:3001/api/getOrg/${id}`, { withCredentials: true })
      setOrg(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getDevs()
    getOneOrg()
  }, [])

  const HandeClick = (position) => {
    navigate(`/orgs/job/${id}`, {
      state: {
        skills: position.skills,
        position: position.name
      }
    })
  }
  return (
    <div>
      <div className="topnav">
        <Link className="active">DevsOnDeck</Link>
        <Link to={("/orgs/login")} className="split">Log Out</Link>
      </div>
      <Stack justifyContent="center" direction="row" spacing={2}>
        <div>
          <Link to={(`/orgs/jobs/new/${id}`)}>
            <Button variant='contained' color='info' >List a New Position</Button>
          </Link>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Header as="h3">Positions To Fill</Card.Header>

              {org !== null && (
                org.positions.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {org.positions.map((position, idx) => (
                      <button key={idx} onClick={() => HandeClick(position)}
                        style={{
                          fontSize: "20px", textTransform: 'upperCase',
                          backgroundColor: 'transparent', border: 'none', cursor: "pointer", color: "blue", textDecoration: 'underline'
                        }}>
                        {position.name}
                      </button>
                    ))}
                  </div>
                ) : (
                  <h2>
                    No Positions Available
                  </h2>
                )
              )}

            </Card.Body>
          </Card>
        </div>
        <div>
          <Card style={{ width: '50rem' }}>
            <Card.Body>
              <Card.Header as="h3">Available Devs : </Card.Header>
            </Card.Body>

            <ListGroup className="list-group-flush">
              {devs.length > 0 ? (
                devs.map((dev, index) => (
                  <ListGroup.Item key={index}>
                    <div className='all-skills'>
                      <h1>{dev.firstName} {dev.lastName}</h1>
                      <div className='skill'>
                        {dev.skills.length > 0 ? (
                          <>
                            <h2>Skills : </h2>
                            {dev.skills.map((skill, idx) => (
                              <h3 key={idx}>{skill}</h3>
                            ))}

                          </>
                        ) : (
                          <h2>No skills available</h2>
                        )}
                      </div>
                      {
                        dev.bio && (
                          <>
                            <h3 className="text-black">
                              {dev.bio}
                            </h3>
                          </>
                        )
                      }
                    </div>
                  </ListGroup.Item>
                ))
              ) : (
                <h1>No developers available</h1>
              )}
            </ListGroup>
           
          </Card>
        </div>
      </Stack >
    </div >
  )
}

export default OrgDashboard;