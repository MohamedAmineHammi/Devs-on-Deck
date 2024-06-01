import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from 'axios'
const DevDashboard = () => {
  const { id } = useParams()
  const [dev, setDev] = useState(null)
  const [error, setError] = useState(null)


  const getDev = async () => {
    try {
      const dev = await axios.get(`http://localhost:3001/api/getOneDev/${id}`, { withCredentials: true })
      setDev(dev.data)
    } catch (err) {
      setError(true)
    }
  }
  useEffect(() => {
    getDev()
  }, [])

  if (!dev && !error) {
    return <>
      <div className="topnav">
        <Link className="active">DevsOnDeck</Link>
        <Link to={("/devs/login")} className="split">Log Out</Link>
      </div>
      <h1 className='mt-40'>Fetching user Data ...</h1>
    </>
  }

  if (error) {
    return <>
      <div className="topnav">
        <Link className="active">DevsOnDeck</Link>
        <Link to={("/devs/login")} className="split">Log Out</Link>
      </div>
      <h1 className='mt-40'>User Does Not Exist !</h1>

    </>
  }
  return (
    <>
      <div className="topnav">
        <Link className="active">DevsOnDeck</Link>
        <Link to={("/devs/login")} className="split">Log Out</Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-20 mt-40">
        <h1 className="text-4xl font-bold">Hello, {dev.firstName + " " + dev.lastName} !</h1>
        <div className="flex items-center justify-center gap-x-4">
          <h3 className="text-2xl">
            Click here to update or add new skills
          </h3>

          <Link to={`/devs/skills/${id}`} className="text-lg font-semibold border-2
         border-black px-2 py-1 hover:bg-black hover:text-white
         transition-all duration-300
         ">
            Update Skills
          </Link>
        </div>
      </div>
    </>
  )
}

export default DevDashboard