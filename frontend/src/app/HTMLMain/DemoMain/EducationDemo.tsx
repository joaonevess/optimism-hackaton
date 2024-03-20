import { Demo } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Query } from "@/lib/sibyl"
import { ethers } from "ethers"
import { useState } from "react"

interface EducationDemoProps {
    signer: ethers.JsonRpcSigner
}

export default function EducationDemo({signer} : EducationDemoProps) {
    const [hasWallet, setHasWallet] = useState(false)
    const [response, setResponse] = useState("")

    const demoQuestion = "What is the capital of France?"

    const educationDemoRequest = (question : string) => {
        const queryInfo = {
            question: question,
            signer: signer
        }
        Query(queryInfo)
    }

    return (
        <Button onClick={() => educationDemoRequest(demoQuestion)} className="rounded-full w-[300px] h-[300px]">
            Ed
        </Button>
    )

}