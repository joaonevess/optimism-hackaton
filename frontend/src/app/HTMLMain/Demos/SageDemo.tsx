import DemoButton from "@/components/demo/DemoButton";
import DemoResponse from "@/components/demo/DemoResponse";
import DemoSeparator from "@/components/demo/DemoSeparator";
import DemoTextArea from "@/components/demo/DemoTextArea";
import { LabelInputContainer } from "@/components/ui/utils";
import { Query, ResponseType } from "@/lib/sibyl";
import { Label } from "@radix-ui/react-label";
import { ethers } from "ethers";
import { useState } from "react";

/*
Explanation of use case: 
Traditionally, we can only evaluate contracts with information that is already integrated into the blockchain. By using a decentralized AI oracle, we can have a contract be resolved through the AI's output. This could include both objective (but not integrated into the blockchain) information and subjective information. This is even more powerful for contracts that require information only available in the future.

Example of usecases:
- Judging clauses related to events that have no oracle yet (e.g. "Will the rains in Greece be above average next year?")
- Judging clauses related to subjective information (e.g. "Will the next movie by X director be good?")
*/

interface SageDemoProps {
    signer: ethers.JsonRpcSigner
}

export default function SageDemo({ signer }: SageDemoProps) {
    const [queryResponse, setQueryResponse] = useState<string | undefined>()
    const [clause, setClause] = useState<string>("")

    const demoHeader = "Terms to evaluate:"
    
    const SageDemoRequest = () => {
        const finalQuestion = "Which address should get the money? \n" + clause

        const queryInfo = {
            signer: signer,
            question: finalQuestion,
            responseType: ResponseType.STR,
            setQueryResponse: setQueryResponse,
        }
        Query(queryInfo)

    }
    return (
        <div className="my-8">
            <DemoSeparator/>

            <LabelInputContainer className="mb-4">
                <Label htmlFor="answer">{demoHeader}</Label>
                <DemoTextArea placeholder="Your answer" setValue={setClause}/>
            </LabelInputContainer>

            <DemoButton onClick={SageDemoRequest}>
                Evaluate this clause
            </DemoButton>

            <DemoSeparator/>
            
            <DemoResponse queryResponse={queryResponse?.toString()} introText="would give the money to:"/>
        </div>
        )
    }

