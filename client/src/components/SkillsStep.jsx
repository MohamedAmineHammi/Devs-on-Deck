import { useRef } from "react"

const SkillsStep = ({ skills, setSkills, setBio, HandleClick }) => {

    const skillsData = ["HTML", 'CSS', "RUBY", "PYTHON", "SQL", "JAVASCRIPT", "JAVA", "C#", "GO"]
    const count = useRef(0)

    const HandleBtn = (e) => {

        const btn = e.target
        if (count.current === 5 && !btn.classList.contains("selected")) {
            alert('maximum number of skills is 5')
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

    return (
        <div>

            <div className="flex items-center justify-center gap-8">
                <div className="flex items-center gap-x-40">
                    <div>
                        <h1 className="text-2xl font-semibold mb-10">PICK YOUR TOP 5 LANGUAGES : </h1>
                        <div className='select-div'>

                            {
                                skillsData.map((skill, idx) => (
                                    <button onClick={HandleBtn} className='skill-btn' key={idx}>{skill}</button>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <h1 className="text-2xl font-semibold mb-6">Short Bio  </h1>
                        <textarea
                            className="border-2 border-black w-[400px] min-h-[300px] max-h-[300px] p-2"
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>
                </div>
            </div>


            <div className="flex gap-10 mt-32 items-center justify-center">
                <button onClick={() => HandleClick(true, false)}
                    className="px-4 py-2 bg-gray-400 text-black font-bold  border-2 border-black">
                    Skip This Step
                </button>
                <button onClick={() => HandleClick(false, false)}
                    className="px-4 py-2 bg-[#0288d1] text-black font-bold  border-2 border-black">
                    NEXT STEP : Frameworks & Libraries
                </button>
            </div>
        </div>
    )
}

export default SkillsStep