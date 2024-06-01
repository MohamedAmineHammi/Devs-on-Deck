import { useParams, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import axios from 'axios'
const SkillsStep = ({ skills, setSkills, bio, HandleClick }) => {

    const skillsData = ["DJANGO", 'FLASK', "RAILS", "SPRING", "NEXT JS", "EXPRESS JS", ".NET", "NEST JS", "ANGULAR"]
    const count = useRef(0)

    const { id } = useParams()
    const navigate = useNavigate()

    const HandleBtn = (e) => {


        const btn = e.target
        if (count.current === 5 && !btn.classList.contains("selected")) {
            alert('maximum number of FrameWorks is 5')
            return
        }
        btn.classList.toggle('selected')
        let newArr = skills
        if (newArr.includes(btn.innerText)) {
            newArr = newArr.filter(item => item !== btn.innerText);
            count.current -= 1
        } else {
            newArr.push(btn.innerText)
            count.current += 1
        }
        setSkills(newArr)
    }

    const HandleSubmit = async () => {
        const data = { skills, bio }
        try {
            await axios.post(`http://localhost:3001/api/addSkill/${id}`, data, { withCredentials: true })
            navigate(`/devs/dashboard/${id}`)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <div className="flex items-center justify-center gap-8">
                <div className="flex items-center gap-x-40">
                    <div>
                        <h1 className="text-2xl font-semibold mb-10">PICK YOUR TOP 5 FrameWorks : </h1>
                        <div className='select-div'>

                            {
                                skillsData.map((skill, idx) => (
                                    <button
                                        onClick={HandleBtn}
                                        className={`skill-btn ${skills.includes(skill) ? "selected" : ""}`}
                                        key={idx}>
                                        {skill}
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <h1 className="text-2xl font-semibold mb-6">Short Bio  </h1>
                        <div
                            className="border-2 border-black w-[400px] min-h-[300px] max-h-[300px] p-2"
                        >
                            <h3 className="text-xl font-semibold tracking-wide text-left">
                                {bio !== "" ? bio : "No Bio"}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-10 mt-32 items-center justify-center">
                <button onClick={() => HandleClick(false, true)}
                    className="px-4 py-2 bg-red-400 text-black font-bold  border-2 border-black">
                    GO BACK
                </button>
                <button onClick={HandleSubmit}
                    className="px-4 py-2 bg-[#0288d1] text-black font-bold  border-2 border-black">
                    COMPLETE PROFILE
                </button>
            </div>
        </div>
    )
}

export default SkillsStep