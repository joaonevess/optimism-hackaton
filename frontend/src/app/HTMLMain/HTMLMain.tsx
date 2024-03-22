"use client"

import { ethers } from "ethers";
import LoginDemo from "./Demos/LoginDemo";
import EducationDemo from "./Demos/EducationDemo";
import Sidebar from "./Sidebar";
import { useState } from "react";
import ComplianceDemo from "./Demos/ComplianceDemo";
import JudgeDemo from "./Demos/JudgeDemo";
import SageDemo from "./Demos/SageDemo";

export enum Demo {
    login,
    education,
    compliance,
    sage,
    judge,
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
            case Demo.compliance:
                return <ComplianceDemo signer={signer}/>
            case Demo.judge:
                return <JudgeDemo signer={signer}/>
            case Demo.sage:
                return <SageDemo signer={signer}/>
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