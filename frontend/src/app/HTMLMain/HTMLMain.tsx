import { ethers } from "ethers";
import { Demo } from "../page";
import LoginDemo from "./DemoMain/LoginDemo";
import EducationDemo from "./DemoMain/EducationDemo";
import { Button } from "@/components/ui/button";

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

    return (
        <main className={`${className} w-full flex flex-row justify-between`}>
            <div className="flex flex-col px-10">
                <Button className="my-10" onClick={() => setCurrDemo(Demo.education)}>Education</Button>
                <Button onClick={() => setCurrDemo(Demo.logistiscs)}>Logistics</Button>
            </div>
            {selectDemoMain()}
            <div className="flex flex-col px-10">
                <Button className="my-10" onClick={() => setCurrDemo(Demo.finances)}>Finances</Button>
                <Button onClick={() => setCurrDemo(Demo.privacy)}>Privacy</Button>
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