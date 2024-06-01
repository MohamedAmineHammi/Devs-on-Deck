import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import SkillsStep from "./SkillsStep"
import FrameworksStep from "./FrameworksStep"

const AddSkills = () => {
  const [skills, setSkills] = useState([])
  const [bio, setBio] = useState("")
  const [step, setStep] = useState('firstStep')

  const HandleClick = (skip, back) => {
    if (back) {
      setStep('firstStep')
      setSkills([])
      setBio('')
    } else {
      if (skip) {
        setSkills([])
        setBio('')
      }
      setStep('lastStep')
    }

  }
  const handleDisplay = () => {


    if (step === "firstStep") {
      return <SkillsStep
        skills={skills}
        setSkills={setSkills}
        setBio={setBio}
        HandleClick={HandleClick}
      />
    }

    return <FrameworksStep
      skills={skills}
      setSkills={setSkills}
      bio={bio}
      HandleClick={HandleClick}
    />

  }
  return (
    <div>
      <div className="topnav">
        <Link className="active">DevsOnDeck</Link>
        <Link to={("/devs/login")} className="split">Log Out</Link>
      </div>
      <div>
        {handleDisplay()}
      </div>
    </div>
  )
}

export default AddSkills