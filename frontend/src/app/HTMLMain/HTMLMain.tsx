import { ethers } from "ethers";
import { Demo } from "../page";
import LoginDemo from "./DemoMain/LoginDemo";
import EducationDemo from "./DemoMain/EducationDemo";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface HTMLMainProps {
    className: string
    setSigner: (signer: ethers.JsonRpcSigner | undefined) => void
    signer: ethers.JsonRpcSigner | undefined
    currDemo: Demo
    setCurrDemo: (demo: Demo) => void
}

export default function HTMLMain({className, setSigner, signer, currDemo, setCurrDemo} : HTMLMainProps) {
    const [isLogin, setIsLogin] = useState(true)
    const selectDemoMain = () => {
        if (isLogin) return <LoginDemo setSigner={setSigner} setCurrDemo={setCurrDemo}/>
        switch (currDemo) {
            case Demo.login:
                return <LoginDemo setSigner={setSigner} setCurrDemo={setCurrDemo}/>
            case Demo.education:
                return <EducationDemo signer={signer}/>
            case Demo.logistiscs:
                return <div> Logistics </div>
            case Demo.finances:
                return <div> Finances </div>
            case Demo.privacy:
                return <div> Privacy </div>
        }
    }
    useEffect(() => {
        setIsLogin(currDemo === Demo.login || !signer) // TODO: improve
    }, [currDemo, signer])
    
    // TODO: match actual distances. Align things up?
    // TODO: add actual .svg icons
    return (
        <main className={`${className} w-full flex flex-row justify-between`}>
            <div className="flex flex-col px-10">
                <Button disabled={isLogin} className="my-5 rounded-full w-[75px] h-[75px] text-[3rem]" onClick={() => setCurrDemo(Demo.education)}>🎓</Button>
                <Button disabled={isLogin} className="my-5 rounded-full w-[75px] h-[75px] text-[3rem]" onClick={() => setCurrDemo(Demo.logistiscs)}>⛟</Button>
            </div>
            {selectDemoMain()}
            <div className="flex flex-col px-10">
                <Button disabled={isLogin} className="my-5 rounded-full w-[75px] h-[75px] text-[3rem]" onClick={() => setCurrDemo(Demo.finances)}>🏦</Button>
                <Button disabled={isLogin} className="my-5 rounded-full w-[75px] h-[75px] text-[3rem]" onClick={() => setCurrDemo(Demo.privacy)}>🙈</Button>
            </div>
        </main>
    )
}

// TODO: If we want each demo to have a theme, it could be implemented with something like:
// export function callThisWhenDemoChanges(newDemo : Demo) {
//     switch (newDemo) {
//         case Demo.X:
//             setTheme("X")
//             ...
// }