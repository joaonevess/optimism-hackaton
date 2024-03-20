import { ethers } from "ethers";
import { Demo } from "../page";
import LoginDemo from "./DemoMain/LoginDemo";
import EducationDemo from "./DemoMain/EducationDemo";

interface HTMLMainProps {
    className: string
    setSigner: (signer: ethers.JsonRpcSigner | undefined) => void
    signer: ethers.JsonRpcSigner | undefined
    currDemo: Demo
    setCurrDemo: (demo: Demo) => void
}

export default function HTMLMain({className,setSigner, signer, currDemo, setCurrDemo} : HTMLMainProps) {
    const selectDemoMain = () => {
        if (!signer) return <LoginDemo setSigner={setSigner} setCurrDemo={setCurrDemo}/>
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

    console.log(signer)

    return (
        <main className={`${className} `}>
            {selectDemoMain()}
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