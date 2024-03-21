import { ethers } from "ethers";
import LoginDemo from "./Demos/LoginDemo";
import EducationDemo from "./Demos/EducationDemo";
import Sidebar from "./Sidebar";
import { useState } from "react";

// TODO: Define which ones we should actually demo
export enum Demo {
    login,
    education,
    logistiscs,
    finances,
    privacy,
    games
  }

interface HTMLMainProps {
    className: string

}

export default function HTMLMain({className} : HTMLMainProps) {
    const [signer, setSigner] = useState<ethers.JsonRpcSigner | undefined>(undefined)
    const [currDemo, setCurrDemo] = useState<Demo>(Demo.login)

    const selectDemoMain = () => {
        if (currDemo === Demo.login || !signer) return <LoginDemo setSigner={setSigner} setCurrDemo={setCurrDemo}/>
        switch (currDemo) {
            case Demo.education:
                return <EducationDemo signer={signer}/>
            case Demo.logistiscs:
                return <div> Logistics </div>
            case Demo.finances:
                return <div> Finances </div>
            case Demo.privacy:
                return <div> Privacy </div>
            case Demo.games:
                return <div> Games </div>
        }
    }

    // TODO: add actual .svg icons
    return (
        <main className={`${className} w-full`}>
            <Sidebar setCurrDemo={setCurrDemo} signer={signer}>
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