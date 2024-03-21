import { ethers } from "ethers";
import { Demo } from "../page";
import LoginDemo from "./DemoMain/LoginDemo";
import EducationDemo from "./DemoMain/EducationDemo";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

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
        <main className={`${className} w-full`}>
            <Sidebar setCurrDemo={setCurrDemo}>
                {selectDemoMain()}
            </Sidebar>
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