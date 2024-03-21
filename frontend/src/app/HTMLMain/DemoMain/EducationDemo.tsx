import { Demo } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Query, QueryResponse } from "@/lib/sibyl"
import { ethers } from "ethers"
import { useState } from "react"

interface EducationDemoProps {
    signer: ethers.JsonRpcSigner
}

export default function EducationDemo({signer} : EducationDemoProps) {
    const [queryResponse, setQueryResponse] = useState<QueryResponse | undefined>()

    const demoQuestion = "What is the capital of France?"

    const educationDemoRequest = (question : string) => {
        const queryInfo = {
            question: question,
            signer: signer,
            setQueryResponse: setQueryResponse,
        }
        Query(queryInfo)
    }

    return (
        <Button onClick={() => educationDemoRequest(demoQuestion)} className="rounded-full w-[300px] h-[300px]">
            {queryResponse ? queryResponse : "🎓"}
        </Button>
    )

}