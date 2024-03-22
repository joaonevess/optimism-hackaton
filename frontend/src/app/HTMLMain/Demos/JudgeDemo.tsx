import DemoButton from "@/components/demo/DemoButton";
import DemoResponse from "@/components/demo/DemoResponse";
import DemoSeparator from "@/components/demo/DemoSeparator";
import DemoTextArea from "@/components/demo/DemoTextArea";
import { LabelInputContainer } from "@/components/ui/utils";
import { rentContract } from "@/lib/rent";
import { Query, QueryResponse, ResponseType } from "@/lib/sibyl";
import { Label } from "@radix-ui/react-label";
import { ethers } from "ethers";
import { useState } from "react";

/* 
Explanation of use case:
Legal disputes can often be costly and time consuming. In some cases, it might even be biased. By using a decentralized oracle, we can guarantee a fair, transparent, and unbiased resolution of legal disputes.
In this demo, a standard Brazilian rent contract is provided to the oracle and it shall judge based on the situation provided.

Example of usecases:
- Resolving disputes quickly and cheaply.
- Resolving disputes which might be biased in a traditional court.
- Resolving disputes where the parties are in different jurisdictions.
*/
interface JudgeDemoProps {
    signer: ethers.JsonRpcSigner
}

export default function JudgeDemo({ signer }: JudgeDemoProps) {
    const [queryResponse, setQueryResponse] = useState<QueryResponse | undefined>()
    const [context, setContext] = useState<string>("")

    const demoHeader = "Explain the situation:"

    const judgeDemoRequest = () => {
        const finalQuestion = `Two Brazilians have signed this contract:\n${rentContract}\nAnd have found themselves in this situation:\n${context}\nWho is right? reply only with the address of the person who is right.`

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
                <DemoTextArea placeholder="Your answer" setValue={setContext}/>
            </LabelInputContainer>

            <DemoButton onClick={judgeDemoRequest}>
                Judge this case
            </DemoButton>

            <DemoSeparator/>
            
            <DemoResponse queryResponse={queryResponse?.toString()} introText="has judged in favor of:"/>
        </div>
    )
}